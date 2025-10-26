# 🚴‍♂️ Taja 주요 기능 상세 가이드

## 🗺️ 지도 기능

### 실시간 대여소 조회

```typescript
// packages/features/src/use-stations.ts
export function useNearbyStations(location: { lat: number; lng: number }) {
  return useQuery({
    queryKey: ["stations", "nearby", location],
    queryFn: () => stationApi.getNearbyStations(location),
    refetchInterval: 30000, // 30초마다 새로고침
  });
}
```

**주요 기능:**

- **위치 기반 검색**: 사용자 현재 위치 기준 반경 1km 내 대여소 조회
- **실시간 데이터**: 30초마다 자동 새로고침으로 최신 자전거 수 표시
- **필터링**: 남은 자전거 수, 대여 가능 여부로 필터링
- **즐겨찾기**: 자주 이용하는 대여소 북마크 기능

### 대여소 검색

```typescript
// packages/features/src/use-station-search.ts
export function useStationSearch(query: string) {
  return useQuery({
    queryKey: ["stations", "search", query],
    queryFn: () => stationApi.searchStations(query),
    enabled: query.length > 1,
  });
}
```

**검색 기능:**

- **이름 검색**: 대여소명으로 검색
- **주소 검색**: 도로명주소, 지번주소 검색
- **자동완성**: 타이핑 시 실시간 검색 제안
- **검색 히스토리**: 최근 검색어 저장 및 관리

## 📍 대여소 상세 정보

### 대여소 기본 정보

```typescript
// packages/models/src/station-detail.ts
export interface StationDetail {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  bikesAvailable: number;
  totalRacks: number;
  operatingHours: string;
  contact: string;
  facilities: string[];
}
```

**표시 정보:**

- **기본 정보**: 대여소명, 주소, 운영시간, 연락처
- **실시간 상태**: 현재 남은 자전거 수, 대여 가능 여부
- **시설 정보**: 주차장, 화장실, 편의시설 등
- **이용 안내**: 이용 방법, 주의사항

### 예측 기능

```typescript
// packages/features/src/use-station-prediction.ts
export function useStationPrediction(stationId: string) {
  return useQuery({
    queryKey: ["station", stationId, "prediction"],
    queryFn: () => stationApi.getStationPrediction(stationId),
    refetchInterval: 300000, // 5분마다 업데이트
  });
}
```

**예측 알고리즘:**

- **시간대별 패턴**: 과거 데이터 기반 시간대별 이용량 예측
- **요일별 패턴**: 평일/주말 이용 패턴 분석
- **날씨 연관성**: 날씨 데이터와 연관된 이용량 예측
- **이벤트 영향**: 특별 이벤트나 행사 시 이용량 변화 예측

### 근처 추천 대여소

```typescript
// packages/features/src/use-nearby-recommendations.ts
export function useNearbyRecommendations(stationId: string) {
  return useQuery({
    queryKey: ["stations", stationId, "recommendations"],
    queryFn: () => stationApi.getNearbyRecommendations(stationId),
  });
}
```

**추천 알고리즘:**

- **거리 기반**: 현재 위치에서 가까운 대여소
- **이용 가능성**: 자전거가 충분히 있는 대여소 우선
- **이용 패턴**: 사용자 과거 이용 이력 기반 추천
- **실시간 상태**: 현재 자전거 수가 많은 대여소 우선

## 📊 이용 통계 및 시각화

### 시간대별 통계

```typescript
// packages/features/src/use-station-stats.ts
export function useStationStats(
  stationId: string,
  period: "day" | "week" | "month"
) {
  return useQuery({
    queryKey: ["station", stationId, "stats", period],
    queryFn: () => stationApi.getStationStats(stationId, period),
  });
}
```

**통계 데이터:**

- **시간대별 이용량**: 24시간 이용 패턴 그래프
- **요일별 패턴**: 평일/주말 이용량 비교
- **월별 트렌드**: 장기간 이용량 변화
- **피크 타임**: 가장 많이 이용되는 시간대 분석

### 날씨 연관 분석

```typescript
// packages/features/src/use-weather-stats.ts
export function useWeatherStats(stationId: string) {
  return useQuery({
    queryKey: ["station", stationId, "weather-stats"],
    queryFn: () => stationApi.getWeatherStats(stationId),
  });
}
```

**날씨 데이터 연관:**

- **온도별 이용량**: 기온과 이용량의 상관관계
- **강수량 영향**: 비가 올 때 이용량 변화
- **계절별 패턴**: 봄/여름/가을/겨울 이용 패턴
- **예보 연동**: 날씨 예보 기반 이용량 예측

### 시각화 컴포넌트

```typescript
// packages/ui/src/StatsChart.tsx
export function StatsChart({ data, type }: { data: StatsData[]; type: 'line' | 'bar' | 'pie' }) {
  return (
    <div className="w-full h-64">
      {type === 'line' && <LineChart data={data} />}
      {type === 'bar' && <BarChart data={data} />}
      {type === 'pie' && <PieChart data={data} />}
    </div>
  );
}
```

**차트 타입:**

- **라인 차트**: 시간대별 이용량 변화
- **바 차트**: 요일별 이용량 비교
- **파이 차트**: 이용 목적별 비율
- **히트맵**: 시간대별 요일별 이용량 밀도

## 👤 사용자 인증 및 프로필

### 인증 시스템

```typescript
// packages/features/src/use-auth.ts
export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.getCurrentUser,
  });

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(["auth"]);
    },
  });

  return { user, isLoading, login };
}
```

**인증 방식:**

- **JWT 토큰**: Access Token + Refresh Token
- **소셜 로그인**: Google, Kakao OAuth 2.0
- **자동 로그인**: 토큰 자동 갱신
- **권한 관리**: 역할 기반 접근 제어

### 프로필 관리

```typescript
// packages/features/src/use-profile.ts
export function useProfile() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getProfile,
  });

  const updateProfile = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return { profile, updateProfile };
}
```

**프로필 기능:**

- **기본 정보**: 닉네임, 이메일, 프로필 사진
- **이용 통계**: 개인 이용 이력 및 통계
- **설정**: 알림 설정, 개인정보 설정
- **활동 내역**: 채팅 참여, 즐겨찾기 등

## 💬 실시간 채팅 시스템

### 채팅방 관리

```typescript
// packages/features/src/use-chat-rooms.ts
export function useChatRooms() {
  return useQuery({
    queryKey: ["chat-rooms"],
    queryFn: chatApi.getChatRooms,
  });
}

export function useChatRoom(roomId: string) {
  return useQuery({
    queryKey: ["chat-room", roomId],
    queryFn: () => chatApi.getChatRoom(roomId),
  });
}
```

**채팅방 기능:**

- **대여소별 채팅방**: 각 대여소마다 독립적인 채팅방
- **실시간 참여자 수**: 현재 채팅방 참여자 수 표시
- **채팅방 검색**: 대여소명으로 채팅방 검색
- **참여/나가기**: 채팅방 참여 및 나가기 기능

### 실시간 메시지

```typescript
// packages/features/src/use-chat-messages.ts
export function useChatMessages(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/ws/chat/${roomId}`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => socket.close();
  }, [roomId]);

  return messages;
}
```

**메시지 기능:**

- **실시간 전송**: WebSocket을 통한 즉시 메시지 전송
- **메시지 타입**: 텍스트, 이미지, 위치 공유
- **읽음 확인**: 메시지 읽음 상태 표시
- **메시지 검색**: 채팅 내역 검색 기능

### 알림 시스템

```typescript
// packages/features/src/use-notifications.ts
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/notifications/stream");

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, notification]);
    };

    return () => eventSource.close();
  }, []);

  return notifications;
}
```

**알림 타입:**

- **새 메시지**: 채팅방에 새 메시지 도착
- **대여소 상태**: 즐겨찾기 대여소 자전거 수 변화
- **예측 알림**: 자전거 부족 예상 시간 알림
- **시스템 알림**: 앱 업데이트, 이벤트 등

## 🔧 고급 기능

### 예측 분석

```typescript
// packages/features/src/use-predictions.ts
export function usePredictions(stationId: string) {
  return useQuery({
    queryKey: ["predictions", stationId],
    queryFn: () => predictionApi.getPredictions(stationId),
    refetchInterval: 600000, // 10분마다 업데이트
  });
}
```

**예측 모델:**

- **머신러닝**: 과거 데이터 기반 이용량 예측
- **실시간 분석**: 현재 상황을 반영한 동적 예측
- **정확도 표시**: 예측 신뢰도 표시
- **알림 설정**: 예측 결과 기반 알림

### 데이터 내보내기

```typescript
// packages/features/src/use-data-export.ts
export function useDataExport() {
  const exportData = useMutation({
    mutationFn: (format: "csv" | "json" | "excel") =>
      dataApi.exportData(format),
  });

  return { exportData };
}
```

**내보내기 기능:**

- **개인 데이터**: 개인 이용 이력 다운로드
- **통계 데이터**: 대여소별 통계 데이터 내보내기
- **형식 지원**: CSV, JSON, Excel 형식 지원
- **일괄 처리**: 여러 데이터 일괄 내보내기

## 🎯 사용자 경험 최적화

### 성능 최적화

```typescript
// packages/features/src/use-optimized-queries.ts
export function useOptimizedStationData(stationId: string) {
  return useQuery({
    queryKey: ["station", stationId],
    queryFn: () => stationApi.getStation(stationId),
    staleTime: 30000, // 30초간 캐시 유지
    cacheTime: 300000, // 5분간 메모리 보관
    refetchOnWindowFocus: false, // 포커스 시 자동 새로고침 비활성화
  });
}
```

**최적화 전략:**

- **캐싱**: React Query를 통한 스마트 캐싱
- **지연 로딩**: 필요할 때만 데이터 로드
- **배치 처리**: 여러 요청을 하나로 묶어 처리
- **오프라인 지원**: 네트워크 없이도 기본 기능 사용

### 접근성

```typescript
// packages/ui/src/AccessibleStationCard.tsx
export function AccessibleStationCard({ station }: { station: Station }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${station.name} 대여소, 남은 자전거 ${station.bikesAvailable}대`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <h3>{station.name}</h3>
      <p>남은 자전거: {station.bikesAvailable}대</p>
    </div>
  );
}
```

**접근성 기능:**

- **스크린 리더**: 화면 읽기 프로그램 지원
- **키보드 네비게이션**: 키보드만으로 모든 기능 사용
- **고대비 모드**: 시각 장애인을 위한 고대비 테마
- **폰트 크기**: 사용자 설정 폰트 크기 지원

이러한 기능들을 통해 사용자에게 편리하고 직관적인 따릉이 이용 경험을 제공할 수 있습니다.
