# 📚 Taja 문서 가이드

이 폴더는 Taja 프로젝트의 상세 문서들을 포함합니다.

## 📖 문서 목록

### 🏗️ [아키텍처 가이드](/docs/architecture.md)

- 전체 시스템 아키텍처
- 모듈별 상세 구조
- 데이터베이스 설계
- 보안 아키텍처
- 성능 최적화 전략
- 모니터링 및 로깅

### 🛠️ [기술 스택 상세](/docs/tech-stack.md)

- Frontend 기술 스택 (Next.js, Expo)
- Backend 기술 스택 (Spring Boot)
- 공통 패키지 구조
- 개발 도구 설정
- 환경 변수 설정
- 성능 최적화

### 🚴‍♂️ [주요 기능 상세](/docs/features.md)

- 지도 기능
- 대여소 상세 정보
- 이용 통계 및 시각화
- 사용자 인증 및 프로필
- 실시간 채팅 시스템
- 고급 기능
- 사용자 경험 최적화

## 🚀 빠른 시작

### 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 특정 앱만 실행
pnpm dev --filter=web
pnpm dev --filter=mobile
pnpm dev --filter=backend
```

### 환경 변수 설정

각 앱별로 필요한 환경 변수를 설정하세요:

- **웹앱**: `.env.local`
- **모바일앱**: `app.config.js`

## 📋 개발 가이드라인

### 코드 스타일

- **TypeScript** 우선 사용
- **ESLint + Prettier** 설정 준수
- **커밋 메시지**: Conventional Commits 규칙
- **브랜치 네이밍**: `feat/`, `fix/`, `chore/` + 이슈 번호

### 아키텍처 원칙

- **코드 재사용성**: Headless Component + Thin Wrapper 패턴
- **플랫폼 분리**: 공통 로직은 packages에, UI는 앱별로 분리
- **타입 안정성**: Zod 스키마로 런타임 검증
- **성능 최적화**: React Query 캐싱, 코드 스플리팅

## 🔧 개발 도구

### 필수 도구

- **Node.js**: 18.x 이상
- **pnpm**: 패키지 매니저
- **Docker**: PostgreSQL, Redis
- **IDE**: VS Code (권장)
