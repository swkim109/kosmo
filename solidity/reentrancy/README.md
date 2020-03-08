## Reentrancy

Reentrancy 공격은 솔리디티 스마트 컨트랙트에서 잘 알려진 보안 취약점입니다. 스마트 컨트랙트 사이의 트랜잭션은 내부 트랜잭션으로, 
아직 잔액이 업데이트 되지 않은 상태에서 인출을 연속적으로 호출하여 대상 컨트랙트의 이더를 모두 가져오게 됩니다.  

* Donation.sol  
공격 대상이 되는 기부 컨트랙트로, 다음과 같이 동작합니다.  
`donate(address _to)` 기부자 A는 B를 수혜자로 지정하여 이더를 컨트랙트에 보내면 `balances` 라는 mapping 타입의 "장부"에 기록합니다.  
`withdraw(uint _amount)` 수혜자 B는 자신에게 기부된 이더를 인출합니다. `balances`에 자신의 계정으로 기록된 금액 한도 내에서 인출할 수 있습니다.
 
* Attacker.sol  
해커가 만든 컨트랙트입니다. 
먼저 해커는 공격 대상 컨트랙트 Donation.sol의 주소를 알아냅니다. `donate`라는 메소드를 실행시켜서 Attacker.sol 컨트랙트 자신을 
수혜자로 지정하여 소량의 이더를 기부합니다.  
`donation.donate.value(0.5 ether)(address(this))`  
그 다음에 fallback 함수를 실행시켜서 자신에게 기부된 이더를 인출합니다. 이 때 Donation.sol은 정상적으로 수혜자에게 기부된 
금액 한도 내에서 이더를 전송하게 되는데, Attacker.sol의 fallback payable 함수를 호출하게 됩니다. 그런데 fallback payable 함수를 보면 
아래와 같이 다시 인출 메소드를 실행하도록 되어 있습니다. 즉 내부 트랜잭션 내에서는 아직 잔액이 남은 "상태"이므로 Donation.sol은 
다시 동일한 요청한 금액을 Attacker.sol에게 전송합니다. 이렇게 계속 인출이 반복됩니다. 

```
function() external payable {

    if (address(donation).balance > 0 ) {
        donation.withdraw(0.5 ether);
    }
}
``` 

* 해결방법  
`send/transfer`를 사용하여 이더를 전송(이스탄불 하드포크 이전)  
<b>Checks-Effects-Interaction</b> 패턴을 사용 
