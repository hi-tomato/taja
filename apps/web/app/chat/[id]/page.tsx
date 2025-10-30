import ChattingRoomContent from "@/components/ui/ChattingRoomContent";

export default function ChattingRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = await params;

  return <ChattingRoomContent id={"1"} />;
}
