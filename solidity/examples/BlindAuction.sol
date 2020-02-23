pragma solidity ^0.5.8;

/*
* Blind 경매
* 최고가를 적어낸 사람에게 낙찰된다.
*
*/

contract BlindAuction {

    //경매 입찰자들이 적어내는 입찰가 정보와 금액
    //
    struct Bid {
        bytes32 blindedBid;
        uint deposit;
    }

    address payable public beneficiary; // 경매물의 주인으로 이더를 받고 물건을 판다.
    uint public biddingEnd; // 경매완료시간 유닉스 시간
    uint public revealEnd;  // 유닉스 시간
    bool public ended;  // 경매 종료여부

    // 경매 장부
    // 한 사람이 여러 다수의 입찰을 할 수 있다.
    mapping(address => Bid[]) public bids;

    address public highestBidder; // 낙찰자
    uint public highestBid; // 낙찰가

    // Allowed withdrawals of previous bids
    mapping(address => uint) pendingReturns;

    event AuctionEnded(address winner, uint highestBid); //경매 종료 이벤트

    /// Modifiers are a convenient way to validate inputs to
    /// functions. `onlyBefore` is applied to `bid` below:
    /// The new function body is the modifier's body where
    /// `_` is replaced by the old function body.
    modifier onlyBefore(uint _time) { require(now < _time); _; }
    modifier onlyAfter(uint _time) { require(now > _time); _; }

    constructor(
        uint _biddingTime,
        uint _revealTime,
        address payable _beneficiary
    ) public {
        beneficiary = _beneficiary;
        biddingEnd = now + _biddingTime; // 경매 종료 유닉스 시간 현재 부터 몇 시간 동안 1h=60*60=3600s
        revealEnd = biddingEnd + _revealTime; // 경매 공개 유닉스 시간
    }

    /// Place a blinded bid with `_blindedBid` =
    /// keccak256(abi.encodePacked(value, fake, secret)).
    /// The sent ether is only refunded if the bid is correctly
    /// revealed in the revealing phase. The bid is valid if the
    /// ether sent together with the bid is at least "value" and
    /// "fake" is not true. Setting "fake" to true and sending
    /// not the exact amount are ways to hide the real bid but
    /// still make the required deposit. The same address can
    /// place multiple bids.

    // _blindedBid = keccak256(abi.encodePacked(value, fake, secret))
    // _blindedBid 는 입찰가, 실입찰여부, 암호를 해쉬한 값이다. 해쉬를 하는 것은 상대방이 금액을 알지 못하게 하기 위함이다.
    //
    function bid(bytes32 _blindedBid)
    public
    payable
    onlyBefore(biddingEnd)  //경매 종료전까지 가능
    {
        bids[msg.sender].push(Bid({
            blindedBid: _blindedBid,
            deposit: msg.value
            }));
    }

    /// Reveal your blinded bids. You will get a refund for all
    /// correctly blinded invalid bids and for all bids except for
    /// the totally highest.

    function reveal(
        uint[] memory _values,
        bool[] memory _fake,
        bytes32[] memory _secret
    )
    public
    onlyAfter(biddingEnd)  // 경매 종료후에 가능
    onlyBefore(revealEnd)  // 경매 결과 공개 종료 전까지 가능
    {
        // 해당 계정의 입찰 회수가 맞는지 확인 루프에서 인덱스 맞지 않으면 오류가 발생하므로 미리 검사하는 것 같다.
        uint length = bids[msg.sender].length;
        require(_values.length == length);
        require(_fake.length == length);
        require(_secret.length == length);

        uint refund;
        for (uint i = 0; i < length; i++) { // 입찰자가 여러 금액으로 입찰을 할 수도 있다.
            Bid storage bidToCheck = bids[msg.sender][i];
            (uint value, bool fake, bytes32 secret) =
            (_values[i], _fake[i], _secret[i]);

            // 해쉬한 값이 맞는지 확인한다.
            // 해쉬한 값이 맞으려면 secret 을 알아야 한다.
            if (bidToCheck.blindedBid != keccak256(abi.encodePacked(value, fake, secret))) {
                // Bid was not actually revealed.
                // Do not refund deposit.
                continue; // 다음 루프 시행
            }

            // 해쉬가 맞으면 계속 진행한다.
            refund += bidToCheck.deposit; // 이 컨트랙트에 적립한 이더는 입찰금액만큼 빼고 돌려준다.
            // 실입찰이라면 경매를 시행한다.
            if (!fake && bidToCheck.deposit >= value) {
                if (placeBid(msg.sender, value)) // 입찰자가 변경되면 입찰금액을 빼고 나머지를 돌려준다.
                    refund -= value;
            }
            // Make it impossible for the sender to re-claim
            // the same deposit.
            bidToCheck.blindedBid = bytes32(0); // 상태를 미리 리셋한다.
        }
        msg.sender.transfer(refund); // 입찰자에게 남은 금액을 돌려준다.
    }


    // This is an "internal" function which means that it
    // can only be called from the contract itself (or from
    // derived contracts).
    function placeBid(address bidder, uint value) internal
    returns (bool success)
    {
        if (value <= highestBid) { // 현재 입찰가보다 낮으면 그냥 리턴
            return false;
        }
        if (highestBidder != address(0)) {
            // Refund the previously highest bidder.
            pendingReturns[highestBidder] += highestBid; // 이전 최고가 입찰자에게는 금액을 돌려주어야 한다.
        }
        highestBid = value;
        highestBidder = bidder;
        return true;
    }

    /// Withdraw a bid that was overbid.
    // 입찰자들은 직접 본인의 금액을 인출한다.
    function withdraw() public {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `transfer` returns (see the remark above about
            // conditions -> effects -> interaction).
            pendingReturns[msg.sender] = 0;

            msg.sender.transfer(amount);
        }
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.

    // 이 메소드는 누구나 실행할 수 있도록 되어 있다.
    // 경매가 모두 종료된 이후에 실행가능하다. 그런데 한번 실행되면 다시 실행될 수 없다.
    function auctionEnd()
    public
    onlyAfter(revealEnd)
    {
        require(!ended);
        emit AuctionEnded(highestBidder, highestBid);
        ended = true;
        beneficiary.transfer(highestBid);
    }

}