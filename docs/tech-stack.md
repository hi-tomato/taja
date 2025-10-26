# 🛠️ Taja 기술 스택 상세 가이드

## Frontend 기술 스택

### Web Application (Next.js)

#### 핵심 프레임워크

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0"
}
```

**선택 이유:**

- **App Router**: 최신 Next.js 14의 App Router로 서버 컴포넌트 활용
- **TypeScript**: 타입 안정성과 개발 생산성 향상
- **React 18**: Concurrent Features, Suspense 등 최신 기능 활용

#### 스타일링

```json
{
  "tailwindcss": "^3.4.0",
  "@tailwindcss/forms": "^0.5.0",
  "@tailwindcss/typography": "^0.5.0"
}
```

**설정 파일:**

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
    },
  },
};
```

#### 데이터 시각화

```json
{
  "recharts": "^2.8.0",
  "d3": "^7.8.0"
}
```

**사용 예시:**

```typescript
// components/StationChart.tsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export function StationChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="hour" />
        <YAxis />
        <Line type="monotone" dataKey="bikes" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

#### 상태 관리

```json
{
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^4.4.0"
}
```

**React Query 설정:**

```typescript
// lib/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      cacheTime: 10 * 60 * 1000, // 10분
    },
  },
});
```

**Zustand 스토어 예시:**

```typescript
// stores/station-store.ts
import { create } from "zustand";

interface StationState {
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
}

export const useStationStore = create<StationState>((set) => ({
  selectedStation: null,
  setSelectedStation: (station) => set({ selectedStation: station }),
}));
```

### Mobile Application (Expo)

#### 핵심 프레임워크

```json
{
  "expo": "~49.0.0",
  "react-native": "0.72.0",
  "typescript": "^5.0.0"
}
```

#### 네이티브 스타일링

```json
{
  "nativewind": "^2.0.11",
  "react-native-svg": "^13.0.0"
}
```

**NativeWind 설정:**

```javascript
// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### 모바일 전용 라이브러리

```json
{
  "react-native-maps": "^1.8.0",
  "victory-native": "^36.6.0",
  "expo-location": "~15.0.0",
  "expo-notifications": "~0.20.0"
}
```

## 공통 패키지 구조

### @taja/models

```typescript
// packages/models/src/station.ts
import { z } from "zod";

export const StationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  bikesAvailable: z.number(),
  totalRacks: z.number(),
});

export type Station = z.infer<typeof StationSchema>;

// packages/models/src/chat.ts
export const ChatMessageSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  userId: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
```

### @taja/api

```typescript
// packages/api/src/client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10000,
});

// packages/api/src/station.ts
export const stationApi = {
  getStations: () => apiClient.get<Station[]>("/api/stations"),
  getStation: (id: string) => apiClient.get<Station>(`/api/stations/${id}`),
  getStationStats: (id: string) =>
    apiClient.get<StationStats>(`/api/stations/${id}/stats`),
};
```

### @taja/features

```typescript
// packages/features/src/use-stations.ts
import { useQuery } from "@tanstack/react-query";
import { stationApi } from "@taja/api";

export function useStations() {
  return useQuery({
    queryKey: ["stations"],
    queryFn: stationApi.getStations,
  });
}

export function useStation(id: string) {
  return useQuery({
    queryKey: ["station", id],
    queryFn: () => stationApi.getStation(id),
    enabled: !!id,
  });
}
```

## 개발 도구

### 코드 품질

```json
{
  "eslint": "^8.0.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "prettier": "^3.0.0",
  "husky": "^8.0.0",
  "lint-staged": "^14.0.0"
}
```

### 빌드 및 배포

```json
{
  "turbo": "^1.10.0",
  "pnpm": "^8.0.0"
}
```

## 환경 변수 설정

### Frontend (.env.local)

```bash
# API 설정
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws

# 지도 API
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_key

# 소셜 로그인
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_client_id
```

## 성능 최적화

### Frontend 최적화

```typescript
// Next.js 설정
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```
