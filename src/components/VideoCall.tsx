"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Share2,
  Copy,
  Check,
} from "lucide-react";

type Props = {
  roomId: string;
};

export default function VideoCall({ roomId }: Props) {
  const router = useRouter();
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    // Get camera and mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          myVideo.current.play();
        }

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setIsConnected(true);
            if (userVideo.current) {
              userVideo.current.srcObject = remoteStream;
              userVideo.current.play();
            }
          });
        });

        // Join existing call if another peer is already in the room
        fetch(`/api/room/${roomId}`)
          .then((res) => res.json())
          .then(({ hostId }) => {
            if (hostId && hostId !== peer.id) {
              const call = peer.call(hostId, stream);
              call.on("stream", (remoteStream) => {
                setIsConnected(true);
                if (userVideo.current) {
                  userVideo.current.srcObject = remoteStream;
                  userVideo.current.play();
                }
              });
            }
          });

        // Save current peer id to room
        peer.on("open", (id) => {
          fetch(`/api/room/${roomId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
        });
      });

    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [roomId]);

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const handleLeave = () => {
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    // Destroy peer connection
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    // Navigate back to home
    router.push("/");
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    window.location.href = `mailto:?subject=Join my video call&body=Join my video call: ${link}`;
  };

  const shareViaWhatsApp = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    window.open(`https://wa.me/?text=Join my video call: ${link}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-6">
        {/* Header */}
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-white flex-shrink min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              MeetX
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 truncate">
              Room: {roomId.slice(0, 8)}...
            </p>
          </div>

          <div className="relative flex-shrink-0 ml-2">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Share Menu */}
            {showShareMenu && (
              <div className="fixed sm:absolute right-4 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-56 max-w-xs bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50">
                <button
                  onClick={copyRoomLink}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 transition-colors"
                >
                  {copied ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <button
                  onClick={shareViaWhatsApp}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 transition-colors border-t border-gray-700"
                >
                  <Share2 size={18} />
                  Share via WhatsApp
                </button>
                <button
                  onClick={shareViaEmail}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 flex items-center gap-3 transition-colors border-t border-gray-700"
                >
                  <Share2 size={18} />
                  Share via Email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-6xl">
            {/* My Video */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <video
                  ref={myVideo}
                  className="w-full aspect-video object-cover"
                  playsInline
                  muted
                />
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <p className="text-white font-medium flex items-center gap-2">
                    You
                    {!isVideoOn && (
                      <VideoOff size={16} className="text-red-400" />
                    )}
                    {!isAudioOn && (
                      <MicOff size={16} className="text-red-400" />
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Video */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <video
                  ref={userVideo}
                  className="w-full aspect-video object-cover"
                  playsInline
                />
                {!isConnected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white font-medium">
                        Waiting for guest...
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Share the room link to invite
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <p className="text-white font-medium">Guest</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full transition-all shadow-lg hover:shadow-xl ${
              isVideoOn
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            title={isVideoOn ? "Turn off camera" : "Turn on camera"}
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition-all shadow-lg hover:shadow-xl ${
              isAudioOn
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            title={isAudioOn ? "Mute microphone" : "Unmute microphone"}
          >
            {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>

          <button
            onClick={handleLeave}
            className="p-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all shadow-lg hover:shadow-xl"
            title="Leave call"
          >
            <PhoneOff size={24} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
