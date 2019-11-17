# kosmo

Educational resources for KOSMO Blockchain(Ethereum) course

* [Blockchain Basic](http://bit.ly/2Vv390B)  
* [Solidity](http://bit.ly/30JcjF2)  
* [Truffle](http://bit.ly/2lGDO2E)  
* [Dapp example](http://bit.ly/2kwIo3e)  


# Docker Image 생성하기

이더리움 클라이언트는 직접 로컬에 설치할 수 있지만 도커를 사용하여 리눅스 컨테이너 안에서 실행할 수도 있습니다.

* `Dokcerfile`이 있는 `docker` 디렉토리로 이동합니다.

* 다음 명령어를 입력합니다. `eth-img`는 이미지 이름으로 다른 이름으로 변경해도 됩니다. 

```
docker build -t eth-img .
``` 

* 다음 명령어로 생성된 이미지를 확인합니다.

```
docker images
```


# Docker container 생성하기

* 사용자 디렉토리로 이동하여 shared 디렉토리를 생성합니다(컨테이너와 호스트 컴퓨터(여기서는 Windows 10)와 공유폴더를 
설정하기 위함입니다).

* 사용자 디렉토리에서 다음 명령어로 컨테이너를 실행합니다. `--name` 옵션의 이름은 컨테이너 이름입니다.

```
docker run -it --name eth-kosmo -v ~/shared:/root/shared -p 30303:30303 -p 8545:8545 -p 8546:8546 eth-img geth --networkid 44  --datadir /root/edu --nousb --rpc --rpcaddr 0.0.0.0 --rpccorsdomain "*" --ws --wsaddr 0.0.0.0 --wsorigins "*" --allow-insecure-unlock
```

* 다음 명령어는 컨테이너를 중지합니다.

```
docker stop eth-kosmo
``` 

* 다음 명령어는 컨테이너를 시작합니다.

```
docker start eth-kosmo
``` 

# Geth 내부에서 콘솔 연결하기

Geth는 JSON-RPC 서버의 기능을 제공하기 때문에 이더리움 블록체인의 다양한 정보를 외부로 제공할 수 있습니다. [Postman](https://www.getpostman.com/)과 같은 범용 API 호출 프로그램을 통해서 
Geth와 인터페이스 할 수 있습니다.

Geth가 설치된 로컬에서도 `attach` 명령어를 사용하여 내부 자바스크립트 콘솔에 연결할 수 있습니다. 실습 목적으로 설치된 Geth는 데이터 경로가 `/root/edu`이므로 다음과 같이 콘솔에 
접속할 수 있습니다. 이 콘솔에서 사용할 수 있는 명령어는 다음 [문서](https://github.com/ethereum/wiki/wiki/JavaScript-API)를 참조하십시오(콘솔에서 제공하는 web3 버전은 `web3.version`으로 확인).

```
geth attach ipc:/root/edu/geth.ipc
``` 

