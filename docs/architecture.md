# 🏗️ Taja 아키텍처 가이드

## 전체 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)     │     Mobile App (Expo)                │
│  ├─ React Components   │     ├─ React Native Components        │
│  ├─ TailwindCSS        │     ├─ NativeWind                     │
│  ├─ Recharts           │     ├─ Victory Native                 │
│  └─ Mapbox             │     └─ React Native Maps             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Packages Layer                       │
├─────────────────────────────────────────────────────────────────┤
│  ├─ @taja/ui           # Headless Components                   │
│  ├─ @taja/models       # Zod Schemas + Types                   │
│  ├─ @taja/api          # HTTP Client                           │
│  ├─ @taja/features     # Domain Hooks (map, chat, auth, stats) │
│  ├─ @taja/map-adapter  # Map Port/Adapter                      │
│  ├─ @taja/chart-adapter# Chart Port/Adapter                   │
│  └─ @taja/notif-adapter# Notification Port/Adapter           │
└─────────────────────────────────────────────────────────────────┘

```

## 모듈별 상세 아키텍처

### 1. Frontend 아키텍처

#### 코드 재사용 전략

```
packages/ui/
├─ components/
│  ├─ StationCardHeadless.tsx    # 비즈니스 로직만
│  ├─ ChatMessageHeadless.tsx    # UI 로직 없음
│  └─ StatsChartHeadless.tsx     # 데이터 처리만
└─ types/
    └─ index.ts                   # 공통 타입 정의

apps/web/components/
├─ StationCard.tsx               # 웹 스타일 래퍼
├─ ChatMessage.tsx               # TailwindCSS 적용
└─ StatsChart.tsx                # Recharts 래퍼

apps/mobile/components/
├─ StationCard.tsx               # 모바일 스타일 래퍼
├─ ChatMessage.tsx               # NativeWind 적용
└─ StatsChart.tsx                # Victory Native 래퍼
```

#### 포트/어댑터 패턴

```typescript
// packages/map-adapter/src/port.ts
export interface MapPort {
  mount(container: HTMLElement | null): void;
  setCenter(pos: { lat: number; lng: number }): void;
  pinStations(stations: Station[]): void;
  onMarkerClick(cb: (stationId: string) => void): void;
}

// packages/map-adapter/src/web-adapter.ts
export class MapboxAdapter implements MapPort {
  // Mapbox 구현
}

// packages/map-adapter/src/mobile-adapter.ts
export class RNMapsAdapter implements MapPort {
  // React Native Maps 구현
}
```

### 2. Backend 아키텍처

#### 모듈 구조

```
apps/backend/src/main/java/com/taja/
├─ auth/
│  ├─ controller/        # AuthController
│  ├─ service/          # AuthService, JwtService
│  ├─ repository/       # UserRepository
│  └─ dto/              # LoginRequest, TokenResponse
├─ station/
│  ├─ controller/       # StationController
│  ├─ service/         # StationService
│  ├─ repository/      # StationRepository
│  └─ dto/             # StationResponse, StationStats
├─ chat/
│  ├─ controller/      # ChatController
│  ├─ service/        # ChatService
│  ├─ repository/     # ChatRoomRepository, MessageRepository
│  ├─ websocket/      # WebSocketConfig, ChatWebSocketHandler
│  └─ dto/            # ChatMessage, ChatRoom
├─ stats/
│  ├─ controller/     # StatsController
│  ├─ service/        # StatsService, PredictionService
│  ├─ repository/     # StatsRepository
│  └─ dto/            # StatsResponse, PredictionResponse
└─ common/
    ├─ config/         # SecurityConfig, RedisConfig
    ├─ exception/      # GlobalExceptionHandler
    └─ util/          # DateUtil, ValidationUtil
```

## 보안 아키텍처

### 인증/인가 플로우

```
1. 사용자 로그인
   ↓
2. JWT 토큰 발급 (Access + Refresh)
   ↓
3. API 요청 시 JWT 검증
   ↓
4. 권한 확인 후 데이터 반환
```

## 성능 최적화 전략

### 1. 프론트엔드 최적화

- **코드 스플리팅**: Next.js Dynamic Import
- **이미지 최적화**: Next.js Image Component
- **상태 관리**: React Query 캐싱
- **번들 최적화**: Tree Shaking, Dead Code Elimination
