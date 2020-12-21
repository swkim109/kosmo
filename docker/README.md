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
16진수 노드 키는 nodekey.txt 파일에 저장되고 이 키는 enode ID를 생성하는데도 사용되므로 다음과 같이 enode ID를 조회
```
bootnode -nodekey nodekey.txt -writeaddress 
```
부트 노드 실행은 다음 스크립트를 실행<br>
위에서 생성한 노드 키를 -nodekeyhex 옵션에 전달

```
.\geth-boot
```
