"use client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Video, Users, Shield, Zap } from "lucide-react";
import RippleGrid from "@/components/RippleGrid"; // Adjust the import path as needed

export default function HomePage() {
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Ripple Grid Background */}
      <div className="absolute inset-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#7877c6"
          rippleIntensity={0.05}
          gridSize={10.0}
          gridThickness={15.0}
          fadeDistance={1.5}
          vignetteStrength={2.0}
          glowIntensity={0.15}
          opacity={0.3}
          gridRotation={0}
          mouseInteraction={true}
          mouseInteractionRadius={1.5}
        />
      </div>

      {/* Additional animated elements for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500 rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl mb-6 shadow-2xl">
            <Video size={48} className="text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              MeetX
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Connect instantly with crystal-clear video calls
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCreateRoom}
          className="group relative px-8 py-4 mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all">
            <Video size={24} />
            Start a New Call
          </div>
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {/* Feature 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Instant Connection
              </h3>
              <p className="text-gray-400 text-sm">
                No downloads or sign-ups. Create a room and start calling in
                seconds.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-pink-500 transition-colors">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-400 text-sm">
                Peer-to-peer connections ensure your conversations stay private.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Easy Sharing
              </h3>
              <p className="text-gray-400 text-sm">
                Share your room link via WhatsApp, email, or copy to clipboard.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with Next.js, PeerJS, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
