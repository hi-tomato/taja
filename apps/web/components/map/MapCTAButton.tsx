type MapCategory = "CURRENT_LOCATION" | "LIKED_PLACES" | "REFRESH_LOCATION";

type Props = {
  actions: Record<MapCategory, () => void>;
  className?: string;
  categories?: MapCategory[];
};

const LABELS: Record<MapCategory, string> = {
  CURRENT_LOCATION: "현재 위치",
  LIKED_PLACES: "즐겨 찾기",
  REFRESH_LOCATION: "새로고침",
};

const DEFAULT_ORDER: MapCategory[] = [
  "CURRENT_LOCATION",
  "LIKED_PLACES",
  "REFRESH_LOCATION",
];

export default function MapCTAButton({
  actions,
  className,
  categories,
}: Props) {
  const order =
    categories && categories.length > 0 ? categories : DEFAULT_ORDER;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 ${className ?? ""}`}
    >
      {order.map((category) => (
        <button
          key={category}
          type="button"
          onClick={actions[category]}
          aria-label={LABELS[category]}
          title={LABELS[category]}
          className={
            "h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 active:bg-blue-800 flex items-center justify-center"
          }
        >
          <span className="pointer-events-none select-none text-sm font-semibold">
            {category === "CURRENT_LOCATION" && "현재 위치"}
            {category === "LIKED_PLACES" && "즐겨찾기"}
            {category === "REFRESH_LOCATION" && "새로고침"}
          </span>
        </button>
      ))}
    </div>
  );
}
