# kosmo

Educational resources for KOSMO Blockchain(Ethereum) course

# SimpleStorage

SimpleStorage 예제를 통해 애플리케이션과 스마트 컨트랙트가 어떻게 인터페이스하는지 알아봅니다. 

* 범용 이더리움 웹 지갑(메타마스크)와 애플리케이션을 결합하는 방법
* React.js와 web3.js를 사용하여 컨트랙트 인스턴스를 생성하는 방법
* 컨트랙트 메소드 호출(트랜잭션) 방법
* 컨트랙트에서 정의한 이벤트를 애플리케이션에서 활용하는 방법


## dapp-sample 예제

dapp-sample은 Truffle react 박스로 만들어진 샘플 프로젝트 입니다. 컨트랙트의 상태변수에 값을 저장하고 이벤트를 받아서 그 값을 화면에 표시합니다. 

우선 dapp-sample 디렉토리에서 SimpleStorage.sol 컨트랙트를 컴파일 합니다.

```shell script
truffle compile
```

migrations 디렉토리에 배포 스크립트가 작성되어 있는지 확인합니다.
```javascript
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage, 150);
};
```
truffle-config.js 에 배포 타겟 설정이 되어 있어야 합니다. 여기서는 Ganache의 디폴트 설정을 그대로 사용합니다.
```
networks: {
     development: {host: "127.0.0.1", port: 7545, network_id: "5777"}
}
```
배포를 수행합니다.

```shell script
truffle migrate
```

dapp-sample\client 디렉토리에서 다음을 실행하여 모듈 패키지를 설치합니다. 

```shell script
npm install
```

정상적으로 설치되면 화면을 실행합니다.

```shell script
npm run start
```

## Truffle 설치 및 이더리움 Dapp 개발 모듈 패키지 설치 참고사항

🍭 [Truffle](https://www.trufflesuite.com/docs/truffle/overview) 은 이더리움 Dapp 개발(특히 자바스크립트)에 가장 자주 사용되는 도구입니다. 자바스크립트 기반의 개발 도구로 컨트랙트 컴파일, 테스트, 배포, 디버깅에 
활용할 수 있는 유용한 도구입니다. 현재 5.1.14 버전까지 정식 [배포](https://github.com/trufflesuite)되었습니다.

트러플은 기본적으로 npm 으로 설치됩니다. Node.js를 설치하면 npm도 함께 설치되므로 우선 Node.js LTS 버전을 설치합니다. 각각 개별적으로 버전이 관리되고 배포되므로 
설치시 여러 가지 버전 오류, 의존성 변경 등으로 문제가 발생할 수 있으므로 배포 이슈나 버그 리포팅을 수시로 점검할 필요가 있습니다. 여기서는 Node.js 12.16.1(npm 6.14.1) 기준으로 합니다.

우선 [Node.js LTS](https://nodejs.org/ko/) 를 설치합니다. 이전 버전은 [여기서](https://nodejs.org/ko/download/releases/) 찾아봅니다.

```
node -v
v12.16.1

npm -v
v6.14.1
```
<b>일반 모드</b> 파워쉘에서 다음과 같이 Truffle 을 설치합니다.

```
npm install -g truffle
```

설치 후 다음을 확인합니다.
```shell script
truffle version

Truffle v5.1.14 (core: 5.1.14)
Solidity v0.5.16 (solc-js)
Node v12.16.1
Web3.js v1.2.1
```

여기서 Web3.js 버전이 1.2 이상임을 주의하기 바랍니다. 만약 이전 버전의 Truffle에서는 `web3@1.0.0-beta.35` 처럼 1.0 버전을 사용하는 경우가 있으므로 
의존성이 있는 모듈이 Node.js 12 버전과 호환되지 않을 수 있습니다. 그런 경우 10으로 다운그레이드 해야 합니다.

자바스크립트 기반의 이더리움 Dapp 개발에 필요한 모듈들은, <b>윈도우즈</b>에서는 빌드 도구 <b>windows-build-tools</b>를 미리 설치해 주는 것이 좋습니다.
Node.js 자바스크립트 모듈들은 운영체제에 맞게 재컴파일되어 설치되기 때문에 이런 도구가 없으면 `npm install`에서 다양한 오류가 발생합니다. 

✅주의할 점은 windows-build-tools를 설치할 때는 반드시 <b>관리자 파워쉘</b>에서 실행해야 합니다.
```shell script
npm install -g --production windows-build-tools --vs2015
```

`--vs2015` 플래그는 모듈 빌드에 사용되는 비주얼 스튜디오 버전을 2015로 지정하는 것으로, 
이 플래그가 생략되면 다른 최근 버전을 설치하게 되는데 이렇게 되면  `npm install` 에서 빌드 오류 가능성이 많습니다. 
windows-build-tools는 python 2.7을 함께 설치합니다.

npm 환경을 다음과 같이 확인하여 해당 설정 부분이 생성되었는지 확인합니다.
 
```shell script
npm config list
msvs_version = "2015"
python = "C:\Users\foo\.windows-build-tools\python27\python.exe"
```
위와 같은 준비가 끝났으면 Truffle 박스 중에 react 박스를 설치하여 Dapp 개발에 필요한 모듈이 큰 문제 없이 설치되는지 확인할 수 있습니다.

```shell script
mkdir react-dapp
cd react-dapp
truffle unbox react

Starting unbox...
=================

√ Preparing to download box
√ Downloading
√ cleaning up temporary files
√ Setting up box

Unbox successful, sweet!

Commands:

  Compile:              truffle compile
  Migrate:              truffle migrate
  Test contracts:       truffle test
  Test dapp:            cd client && npm test
  Run dev server:       cd client && npm run start
  Build for production: cd client && npm run build

```  
해당 프로젝트가 사용하는 패키지를 살펴볼 수 있습니다.

```shell script
npm list --depth 0
client@0.1.0 C:\Users\foo\react-dapp\client
+-- react@16.11.0
+-- react-dom@16.11.0
+-- react-scripts@3.2.0
`-- web3@1.2.2

``` 
