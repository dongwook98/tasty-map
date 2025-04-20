# 맛집 지도 프로젝트

## 프로젝트 개요

맛집 지도는 사용자들이 훌륭한 식당을 발견하고 정보를 공유할 수 있도록 돕는 프로젝트입니다. 아늑한 카페부터 고급 레스토랑까지, 맛집 지도는 여러분의 미식 탐험을 안내할 인사이트와 리뷰를 제공합니다.

## 아키텍처

```mermaid
graph TD
    A[사용자] --> B[프론트엔드 (Next.js)]
    B --> C[React Query]
    B --> D[Axios]
    D --> E[백엔드 (Next.js Route Handlers)]
    E --> F[Supabase DB]
    B --> G[NextAuth]
    G --> H[인증 서비스]
    H --> F

    A --> |요청| B
    B --> |API 요청| C
    C --> |서버에서 응답| D
    D --> |데이터 처리| E
    E --> |데이터 저장/조회| F
```

## 기능

- 위치, 요리 종류, 평점으로 식당 검색
- 메뉴, 사진, 사용자 리뷰 등 각 식당에 대한 상세 정보 보기
- 자신의 식사 경험 공유 및 식당 평가
- 즐겨찾는 장소 저장 기능

## 설치

로컬 환경에 프로젝트를 설정하려면 다음 단계를 따르세요:

1. 저장소 클론:

   ```bash
   git clone https://github.com/yourusername/tasty-map.git
   ```

2. 프로젝트 디렉토리로 이동:

   ```bash
   cd /Users/kangdongwook/Desktop/projects/tasty-map
   ```

3. 의존성 설치:
   ```bash
   npm install
   ```

## 사용법

설치 후, 개발 서버를 시작할 수 있습니다:

```bash
npm start
```
