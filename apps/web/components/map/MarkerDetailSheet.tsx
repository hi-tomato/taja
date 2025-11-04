import { formatDate } from "@/app/utils/day";
import { chartData, chartOptions } from "@/constants/chart";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { HelpCircle, RefreshCw } from "lucide-react";
import { Chart } from "react-chartjs-2";
interface MarkerDetailSheetProps {
  marker: {
    id: string;
    position: { lat: number; lng: number };
    label: string;
    address: string;
    distance: number;
    bikeCount: number;
    stationId?: string;
  };
  onClose: () => void;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MarkerDetailSheet({
  marker,
  onClose,
}: MarkerDetailSheetProps) {
  const currentTime = new Date();
  const formatted = formatDate(currentTime, "YYYY.MM.DD HH:mm 기준");

  const handleRefresh = () => {
    // TODO: 데이터 새로고침 로직 구현
    console.log("새로고침");
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    console.log("공유");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-lg animate-slide-up max-h-[90vh] overflow-y-auto">
      {/* 드래그 핸들 */}
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center"
        aria-label="닫기"
      >
        ✕
      </button>

      {/* 상단 정보 섹션 */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* 왼쪽: 제목, 주소, ID */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-1">
              {marker.label}
            </h2>
            <p className="text-sm text-black mb-1">{marker.address}</p>
            {marker.stationId && (
              <p className="text-sm text-black">{marker.stationId}</p>
            )}
          </div>

          {/* 오른쪽: 현재 대수, 타임스탬프, 새로고침 */}
          <div className="flex flex-col items-end ml-4">
            <p className="text-5xl font-bold text-black mb-2">
              {marker.bikeCount}
            </p>
            <div className="flex items-center gap-1 mb-1">
              <p className="text-xs text-black">{formatDate(currentTime)}</p>
              <button
                onClick={handleRefresh}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="새로고침"
              >
                <RefreshCw className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* 공유 버튼 */}
        <button
          onClick={handleShare}
          className="w-full bg-gray-100 text-black py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
          aria-label="공유"
        >
          공유
        </button>
      </div>

      {/* 구분선 및 정보 말풍선 */}
      <div className="relative px-4 mb-4">
        <div className="h-px bg-gray-200" />
      </div>

      {/* 차트 섹션 */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-black">오늘의 남은 자전거</h3>
          <button
            className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            aria-label="도움말"
          >
            <HelpCircle className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
        <p className="text-xs text-black mb-4">{formatted}</p>

        {/* 차트 */}
        <div className="h-[250px]">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
