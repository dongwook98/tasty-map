# 맛집 지도 프로젝트

## 프로젝트 개요

맛집 지도는 사용자들이 훌륭한 식당을 발견하고 정보를 공유할 수 있도록 돕는 프로젝트입니다. 아늑한 카페부터 고급 레스토랑까지, 맛집 지도는 여러분의 미식 탐험을 안내할 인사이트와 리뷰를 제공합니다.

## 아키텍처

graph TD;
A[Next.js Application] --> B[Next-auth Authentication]
A --> C[React Query for Data Fetching]
A --> D[Zustand for State Management]
A --> E[TypeScript for Type Safety]
A --> F[Vercel Deployment]
F --> A
G[Supabase Database] --> C
G --> B

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
