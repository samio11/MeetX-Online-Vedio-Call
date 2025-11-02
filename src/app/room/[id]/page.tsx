import VideoCall from "@/components/VideoCall";

// ✅ Make it async to await the params
export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <VideoCall roomId={id} />;
}
