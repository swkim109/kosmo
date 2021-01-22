
## Docker Image 생성하기

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


## Docker container 생성하기

* 사용자 디렉토리로 이동하여 shared 디렉토리를 생성합니다(컨테이너와 호스트 컴퓨터(여기서는 Windows 10)와 공유폴더를
  설정하기 위함입니다).

* 사용자 디렉토리에서 다음 명령어로 컨테이너를 생성합니다. `--name` 옵션의 이름은 컨테이너 이름입니다.

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

* 다음 명령어로 컨테이너에서 실행되 Geth의 로그를 볼 수 있습니다.

```
docker logs -f eth-kosmo
``` 

* 다음과 같이 리눅스 쉘을 실행하여 컨테이너에 접속할 수 있습니다.

```
docker exec -it eth-kosmo /bin/bash
``` 

## Geth 자바스크립트 콘솔 연결하기

Geth는 JSON-RPC 서버의 기능을 제공하기 때문에 이더리움 블록체인의 다양한 정보를 외부로 제공할 수 있습니다. [Postman](https://www.getpostman.com/)과 같은 범용 API 호출 프로그램을 통해서
Geth와 인터페이스 할 수 있습니다.

Geth가 설치된 로컬에서도 `attach` 명령어를 사용하여 내부 자바스크립트 콘솔에 연결할 수 있습니다. 실습 목적으로 설치된 Geth는 데이터 경로가 `/root/edu`이므로 다음과 같이 콘솔에
접속할 수 있습니다. 이 콘솔에서 사용할 수 있는 명령어는 다음 [문서](https://github.com/ethereum/wiki/wiki/JavaScript-API)를 참조하십시오(콘솔에서 제공하는 web3 버전은 `web3.version`으로 확인).

```
geth attach ipc:/root/edu/geth.ipc

Welcome to the Geth JavaScript console!

instance: Geth/v1.9.7-stable-a718daa6/linux-amd64/go1.13.4
coinbase: 0x70f13b4a489bf8d039fb59e0ca47215aa1b153a7
at block: 1000 (Sat, 23 Nov 2019 12:19:51 KST)
 datadir: /root/edu
 modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> web3.version
{
  api: "0.20.1",
  ethereum: "0x40",
  network: "44",
  node: "Geth/v1.9.7-stable-a718daa6/linux-amd64/go1.13.4",
  whisper: undefined,
  getEthereum: function(callback),
  getNetwork: function(callback),
  getNode: function(callback),
  getWhisper: function(callback)
}
>
``` 


## Dockerfile

- Geth PPA  
[Geth Release build](https://launchpad.net/~ethereum/+archive/ubuntu/ethereum/+packages)  
Geth 안정 버전의 빌드가 각 Ubuntu 버전에서 성공했는지 확인할 것

- Dockerfile.eoan  
Ubuntu 19.10 이미지로부터 생성  
`docker build -t eth-img:eoan -f 'Dockerfile.eoan' .`  
excludes 파일 복사는 vim 설치시 `update-alternatives: warning: skip creation of...` 경고를 제거

- Dockerfile  
Ubuntu 16.04 이미지로부터 생성

- config.toml  
설정 값의 키는 `geth dumpconfig > config.txt` 로 알 수 있음
 

## Windows

- 윈도우즈에서 Geth(geth-windows-amd64-1.9.25-e7872729)를 직접 설치하는 경우  
/win 디렉토리에 있는 파워쉘 스크립트를 다음 순서대로 실행
```
  .\geth-init  
  .\geth-run
```  
- 윈도우즈에서 IPC로 콘솔 연결하기  
환경 변수에 `ETHEREUM_SOCKET`이 자동으로 등록되므로 Geth의 `datadir`로 이동하여 다음을 실행
```
geth attach ipc:$env:ETHEREUM_SOCKET
```

## Bootnode

- 부토노드의 노드 키는 다음과 같은 명령어로 생성
```
bootnode -genkey nodekey.txt
```
16진수 노드 키는 nodekey.txt 파일에 저장되고 이 키는 enode ID를 생성시 사용되므로 다음과 같이 enode ID를 조회
```
bootnode -nodekey nodekey.txt -writeaddress 
```
부트노드 실행은 다음 스크립트를 실행<br>
위에서 생성한 노드 키를 -nodekeyhex 옵션에 전달

```
.\geth-boot
```

## 노드 싱크 주의사항

- 제네시스 genesis 해쉬가 일치하는지 확인할 것
```
> admin.nodeInfo
{
  enode: "enode://1c6593015442bc1a8c0c6e9385076a20903f523c0e732a66a88895dec3b9ac25699c27da17eed41200bfdf5bb56d7003cbdf37ddd87f4ed59615e995870749ae@192.168.0.11:30303",
  enr: "enr:-Je4QAGpDNhBBum7yHXn7O0T7bwmafGC1HkzzFO0HMBwY5MaaQa0S8Pe9kh6hyVscuUto4UkMVdeRecHTBM6tOOkn5QEg2V0aMfGhGnFPSMygmlkgnY0gmlwhMCoAAuJc2VjcDI1NmsxoQIcZZMBVEK8GowMbpOFB2ogkD9SPA5zKmaoiJXew7msJYN0Y3CCdl-DdWRwgnZf",
  id: "600acd1b7243f3052e4e3ddb1d4d2f32a7f47fd1fc84e5460c3056c53698499b",
  ip: "192.168.0.11",
  listenAddr: "[::]:30303",
  name: "Geth/v1.9.25-stable-e7872729/windows-amd64/go1.15.6",
  ports: {
    discovery: 30303,
    listener: 30303
  },
  protocols: {
    eth: {
      config: {
        byzantiumBlock: 5,
        chainId: 44,
        constantinopleBlock: 10,
        eip150Block: 0,
        eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        eip155Block: 0,
        eip158Block: 0,
        ethash: {},
        homesteadBlock: 0,
        istanbulBlock: 50,
        petersburgBlock: 20
      },
      difficulty: 17613168,
      genesis: "0x74ae779fe17ead2c7020c766edc0032c2fe1995b9131929fbe48f22952e0213b",
      head: "0xb7d984629862c59049c2b533f66e72853b37a9cb211391fb45df3097593bf571",
      network: 44
    }
  }
}

```
제네시스 파일의 내용이 같은 것만으로 충분하지 않고(사람이 보기에는 동일해도) 같은 파일을 제네시스 파일로 사용할 것!

## 파워쉘 실행시 실행권한 문제

- 쉘 스크립트 실행시 권한 문제가 나오는 경우 다음을 확인 

```
Get-ExecutionPolicy -List

        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine       Undefined
```
`CurrentUser`가 `Undefined`인 경우 다음을 실행

```
Set-ExecutionPolicy -ExecutionPolicy unrestricted -Scope CurrentUser
```
