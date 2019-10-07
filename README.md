# kosmo

Educational resources for KOSMO Blockchain(Ethereum) course

* [Blockchain Basic](http://bit.ly/2Vv390B)  
* [Solidity](http://bit.ly/30JcjF2)  
* [Truffle](http://bit.ly/2lGDO2E)  
* [Dapp example](http://bit.ly/2kwIo3e)  


# Docker Image 생성하기

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

