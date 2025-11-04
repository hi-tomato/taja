"use client";
import MarkerDetailSheet from "@/components/map/MarkerDetailSheet";
import { ChattingRoomContent } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MapDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [marker, setMarker] = useState<any | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("marker");
    if (data) {
      setMarker(JSON.parse(data));
      localStorage.removeItem("marker");
    }
  }, []);

  if (!marker) return <div>Loading...</div>;
  return (
    <div>
      <MarkerDetailSheet
        marker={marker}
        onClose={() => router.push("/map")}
        variant="page"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-black">채팅</h3>
        <ChattingRoomContent id={"1"} variant="thumbnail" />
      </div>
    </div>
  );
}
