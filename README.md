<h1 style="text-align: center;">Triplet</h1>

### 개발 일정
- 2024.08.19 ~ 2024.10.11 (8주)
- 8/19 ~ 8/23(특화 프로젝트 부트캠프)
- 8/26 ~ 9/6(설계)
- 9/6 ~ 10/10(개발)
---

## 팀 소개
<table>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/jinseobYun" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/103829767?v=4" alt="윤진섭" height="150" width="150" style="border-radius: 50%;"/>
      <h4>윤진섭</h4>
      <p><strong>역할:</strong> 팀장, 인프라, 백엔드 개발 </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/lshyunee" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/147044110?v=4" alt="이수현" height="150" width="150" style="border-radius: 50%;"/>
      <h4>이수현</h4>
      <p><strong>역할:</strong> 백엔드 개발 </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/homoonshi" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/131606854?v=4" alt="김문희" height="150" width="150" style="border-radius: 50%;"/>
      <h4>김문희</h4>
      <p><strong>역할:</strong> 프론트엔드 개발 </p>
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/jung18" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/81799517?v=4" alt="김문희" height="150" width="150" style="border-radius: 50%;"/>
      <h4>정두홍</h4>
      <p><strong>역할:</strong> 백엔드 개발 </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <h4>김고은</h4>
      <p><strong>역할:</strong> 프론트엔드 개발 </p>
    </td>
  </tr>
</table>

## 프로젝트 소개
#### Triplet은 여행 예산 계획과 여행 결제 내역을 카테고리 별로 분류해 예산 관리를 돕고, 다른 사람의 여행 예산 사용 내역을 참고할 수 있어 예산 계획에 도움을 주는 여행 예산 관리 애플리케이션 입니다. 

### 기획 배경 

여행을 처음 준비하는 사람들은 예상 비용을 파악하는 데 많은 시간을 소비합니다. 인터넷에서 예산 정보를 찾아보지만 최신 정보가 부족하고, 오래된 정보는 신뢰성이 떨어지는 경우가 많습니다. 또한 여행 중 설계한 예산에 맞춰 지출을 관리하는 것이 어려워 예산을 초과하는 일이 빈번하게 발생합니다. 여행이 끝난 후에는 어디에 돈을 썼는지 기억하지 못해 가계부를 작성하거나 여행 기록을 정리하는 데 어려움을 겪기도 합니다.

이러한 문제를 해결하기 위해 사용자의 나이, 여행한 나라, 성별 등 비슷한 조건을 가진 사람들의 여행 데이터를 기반으로 다른 사람들의 공유된 여행을 추천받거나, 여행 국가와 카테고리별로 예산 등을 입력해 여행을 생성해 해당 여행의 결제 내역을 자동으로 분류하고, 실시간으로 예산 사용 현황을 확인하며 여행 지출 내역을 기록하고 확인 할 수 있는 서비스를 기획하게 되었습니다. 


### 프로젝트 회고

이번 프로젝트를 진행하면서 처음으로 Docker를 학습하고, 이를 활용해 CI/CD 파이프라인을 구축하여 내가 만든 프로젝트를 클라우드 환경에 배포하는 경험을 했습니다. 모든 것이 처음이었고, 프로젝트 완성까지 남은 시간이 많지 않아 충분히 공부하고 고민할 시간이 부족했던 점이 가장 어려웠습니다. 그럼에도 불구하고 9시부터 18시 이후에도 책임감을 가지고 맡은 역할을 완수하기 위해 최선을 다했습니다. 여러 사람들의 글과 자료를 참고하며 끊임없이 노력한 끝에 CI/CD 배포를 성공적으로 마칠 수 있었습니다.

또한, 외부 API를 통해 환율 데이터를 받아와 Redis에 저장하는 과정에서, Redis가 단일 스레드 기반으로 작동하여 개별 명령어의 원자성은 보장되지만, 복수의 명령어를 순차적으로 실행할 때 완전한 원자성이 보장되지 않을 수 있다는 점을 인식했습니다. 우리가 만드는 프로젝트가 핀테크 서비스를 다루고 있어 결제, 송금, 충전 등 실제 돈이 오가는 시스템이기 때문에, 정확한 환율 데이터를 제공하는 것이 매우 중요하다고 생각했습니다. 이런 특성상, 조금의 오류 가능성도 배제할 수 없다고 생각했습니다.

이를 해결하기 위해 Lua Script를 사용해 환율 삭제와 삽입 명령어를 하나의 트랜잭션으로 묶어 데이터 일관성과 원자성을 확보했습니다. 이 과정에서 데이터 무결성을 지키는 방법을 깊이 고민하며 구현할 수 있었습니다.

이번 프로젝트를 통해 팀장으로서뿐만 아니라 인프라 구축을 담당한 개발자로서, 내가 맡은 역할을 책임지고 완수하는 데 큰 의미를 느꼈고, 팀이 작성한 코드를 실제 서비스할 수 있는 환경으로 만들어낸 경험은 뿌듯함과 동시에 큰 책임감을 다시 한 번 길러주었습니다. 어려움 속에서도 포기하지 않고 해결해낸 과정이 제게 많은 성장을 가져다주었습니다.


### 주요 기능

---

- **다중 통화 계좌 관리**: 원화 계좌 및 USD, JPY 등 7개의 외화 계좌 개설 및 관리
- **여행 계좌 개설 및 관리**: 여행 전용 계좌를 개설해 예산 관리 최적화
- **QR 간편 결제**: QR 코드로 빠르고 쉽게 결제
- **원화 송금 및 환전**: 간편한 원화 송금 및 외화 환전 기능 제공
- **모임 통장**: 공동 예산 관리가 가능한 모임 통장 기능
- **외화 계좌 관리**: 외화 계좌의 잔액 및 환전 내역 관리
- **카테고리별 예산 설정**: 지출 카테고리별로 예산을 설정하고 관리
- **실시간 예산 사용 내역 저장**: 여행 중 발생한 지출 내역을 자동으로 저장
- **여행지 및 예산 추천**: 비슷한 조건을 가진 사람들이 공유한 여행지와 예산 추천
- **자동 분류 및 실시간 지출 확인**: 결제 시 지출 내역을 자동 분류하고, 실시간으로 지출 현황 확인
- **여행 예산 내역 공유**: 여행이 끝난 후 예산 사용 내역을 쉽게 공유
- **모임 통장 및 여행 관리**: 모임 통장과 여행 계좌를 통합 관리하며, QR 결제 및 카테고리 예산 설정 기능 지원

---

### 서비스 화면

---

#### 시연 영상

https://github.com/user-attachments/assets/bc487b78-b772-42bd-beda-46f0f724b076


| 로그인 화면 | 메인 화면 | 내 여행 목록 |
|----------|-----------| ---------- |
| <img src="https://github.com/user-attachments/assets/acd1eb6c-11ad-410e-8050-5c17e5526d1f" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/2de0769e-848f-41b3-b331-bd104ef34ba0" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/13f66f50-4b07-4232-8aa8-16bd28bd7edc" width="250" height="500" /> |

| 여행 계좌 | 여행 상세 | 여행 상세 지출 내역 그래프 |
|----------|-----------| ------------- |
| <img src="https://github.com/user-attachments/assets/5f98c715-6cbc-4010-b3d7-f0fe511c4990" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/892c725a-9898-4e68-a79f-6a853f18d98b" width="250" height="500" /> |  <img src="https://github.com/user-attachments/assets/d31814d5-33ca-4e4f-a474-0fb56c12ec4d" width="250" height="500" /> |

| 여행 피드 | 마이페이지 |
|---------------|---------------|
| <img src="https://github.com/user-attachments/assets/ecd3e245-9d21-4ca2-b6ce-407025912b83" width="250" height="500" /> | <img src="https://github.com/user-attachments/assets/807a1238-48c7-4f2a-9747-87f6289eaa76" width="250" height="500" /> |

---
### 서비스 아키텍처
---
![image](https://github.com/user-attachments/assets/5c77918b-4bd4-4bb2-8de1-93977df34be4)

![image](https://github.com/user-attachments/assets/ee2c28a9-72ab-4f21-bdc6-160873b4b2bf)

---

## 산출물

---

| API 설계 | 화면 설계 | ERD |
|---|---|---|
![image](https://github.com/user-attachments/assets/82d6fa20-b914-425c-8de4-fc9e91072c4d) | ![image](https://github.com/user-attachments/assets/4ecbb124-85e4-4432-bbf1-2205f4e17dfd) |![image](https://github.com/user-attachments/assets/6b3ab396-12ca-41a8-a32c-442500f12037)

---


## 프로젝트 구조
### EC2
```
📁home/ubuntu
├── 📁 certbot
│   ├── 📁conf
│   └── 📁www
├── 📄 docker-compose.yml
├── 📁 elasticsearch
├── 📁 elk
│   ├── 📁 elasticsearch
│   ├── 📁 kibana
│   ├── 📁 logstash
│   └── 📁 setup
├── 📄 init-letsencrypt.sh
├── 📁 jenkins-data
├── 📁 nginx
│   └── default.conf
└── 📁 redis-data
    ├── data
    └── redis.conf
:folder
```
### BackEnd
```
.
├── 📄 Dockerfile
├── 📁 build
├── 📄 build.gradle
├── 📄 build_image.sh
├── 📁 gradle
├── 📄 gradlew
├── 📄 gradlew.bat
├── 📄settings.gradle
└── 📁 src
    ├──📁 main
    │   ├── 📁 java
    │   │   └── 📁 com
    │   │       └── 📁 ssafy
    │   │           └── 📁 triplet
    │   │               ├── 📄 TripletApplication.java
    │   │               ├──📁 account
    │   │               │   ├── 📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   └──📁 service
    │   │               ├── 📁 auth
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 jwt
    │   │               │   └──📁 service
    │   │               ├── 📁 config
    │   │               │   ├──📄 ElasticsearchConfig.java
    │   │               │   ├──📄 MultipartJackson2HttpMessageConverter.java
    │   │               │   ├──📄 RedisConfig.java
    │   │               │   ├──📄 ScriptConfig.java
    │   │               │   ├──📄 SecurityConfig.java
    │   │               │   └──📄 WebConfig.java
    │   │               ├── 📁 exception
    │   │               │   ├──📄 CustomErrorCode.java
    │   │               │   ├──📄 CustomException.java
    │   │               │   └──📁 controller
    │   │               ├──📁 exchange
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   ├──📁 service
    │   │               │   └──📁 util
    │   │               ├──📁 member
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   └──📁 service
    │   │               ├──📁 notification
    │   │               │   ├──📄 FcmTokenController.java
    │   │               │   ├──📁 config
    │   │               │   ├──📁 dto
    │   │               │   └──📁 service
    │   │               ├──📁 payment
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   └──📁 service
    │   │               ├──📁 response
    │   │               │   └──📄 ApiResponse.java
    │   │               ├──📁 scheduler
    │   │               │   └──📄 ScheduledTasks.java
    │   │               ├──📁 sms
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 repository
    │   │               │   ├──📁 service
    │   │               │   └──📁 util
    │   │               ├──📁 travel
    │   │               │   ├──📁 controller
    │   │               │   ├──📁 dto
    │   │               │   ├──📁 entity
    │   │               │   ├──📁 repository
    │   │               │   ├──📁 service
    │   │               │   ├──📁 specification
    │   │               │   └──📁 util
    │   │               └──📁 validation
    │   │                   └──📄 CustomValidator.java
    │   └──📁 resources
    │       ├──📄 application-secret.properties
    │       ├──📄 application.properties
    │       ├──📄 certification.json
    │       ├──📄 defaultImages.json
    │       ├──📄 elastic-member-mapping.json
    │       ├──📄 elastic-travel-mapping.json
    │       └──📁 scripts
    │           └──📄 refreshExchangeRates.lua
    └──📁 test
        └──📁 java
            └──📁 com
                └──📁 ssafy
                    └──📁 triplet
                        └──📁 TripletApplicationTests.java

```
### FrontEnd
```
.
├──📄 Dockerfile
├──📄 README.md
├──📄 build_image.sh
├──📁 conf
│   └── conf.d
├──📄 package-lock.json
├──📄 package.json
├──📁 public
│   ├──📁 assets
│   ├──📄 favicon.ico
│   ├──📄 firebase-messaging-sw.js
│   ├──📁 fonts
│   ├──📄 index.html
│   ├──📄 logo192.png
│   ├──📄 logo512.png
│   ├──📄 manifest.json
│   ├──📄 robots.txt
│   └──📄 service-worker.js
├──📁 src
│   ├──📄 App.css
│   ├──📄 App.test.tsx
│   ├──📄 App.tsx
│   ├──📁 assets
│   ├──📁 components
│   ├──📁 features
│   ├──📁 firebaseNotification
│   ├──📁 hooks
│   ├──📄 index.css
│   ├──📄 index.tsx
│   ├──📄 logo.svg
│   ├──📁 pages
│   ├──📄 react-app-env.d.ts
│   ├──📄 reportWebVitals.ts
│   ├──📁 routes
│   ├──📄 serviceWorkerRegistration.ts
│   ├──📁 services
│   ├──📄 setupTests.ts
│   ├──📄 store.ts
│   └──📁 types
└──📄 tsconfig.json
```
