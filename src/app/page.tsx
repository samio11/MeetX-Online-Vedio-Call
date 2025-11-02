"use client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">🎥 Simple Video Call</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Create a Call
      </button>
    </div>
  );
}
