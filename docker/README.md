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
 
