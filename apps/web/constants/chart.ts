import { TooltipItem, type ChartOptions, type ChartType } from "chart.js";

const hourlyData = {
  hours: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
  bikeCounts: [5, 8, 3, 10, 7, 6, null, null, null, null, null, null],
  predictionUpBikeCounts: [
    null,
    null,
    null,
    null,
    null,
    6,
    12,
    15,
    18,
    null,
    null,
    null,
  ],
  predictionDownBikeCounts: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    18,
    16,
    14,
    10,
  ],
};

// 차트 데이터 구성
export const chartData = {
  labels: hourlyData.hours,
  datasets: [
    {
      type: "bar" as const,
      label: "현재 데이터",
      data: hourlyData.bikeCounts,
      backgroundColor: "rgba(37, 99, 235, 1)",
      order: 3,
    },
    {
      type: "line" as const,
      label: "예측 증가 데이터",
      data: hourlyData.predictionUpBikeCounts,
      backgroundColor: "rgba(34, 197, 94, 0.3)",
      fill: true,
      borderColor: "rgb(34, 197, 94)",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      order: 5,
    },
    {
      type: "line" as const,
      label: "예측 감소 데이터",
      data: hourlyData.predictionDownBikeCounts,
      backgroundColor: "rgba(239, 68, 68, 0.3)",
      fill: true,
      borderColor: "rgb(239, 68, 68)",
      borderWidth: 2,
      borderDash: [6, 6],
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      order: 2,
    },
  ],
};

export const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 14,
      },
      displayColors: false,
      callbacks: {
        label: function (context: TooltipItem<ChartType>) {
          const value = context.parsed.y;
          if (value === null || value === undefined) return "";
          return `${value}대`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
        color: "#6b7280",
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        font: {
          size: 12,
        },
        color: "#6b7280",
        callback: function (value: number | string) {
          return `${value}대`;
        },
      },
    },
  },
};
