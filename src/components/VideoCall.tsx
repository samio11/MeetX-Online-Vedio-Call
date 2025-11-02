"use client";

import { useEffect, useRef } from "react";
import Peer from "peerjs";

type Props = {
  roomId: string;
};

export default function VideoCall({ roomId }: Props) {
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    // Get camera and mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          myVideo.current.play();
        }

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
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
  }, [roomId]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-black text-white justify-center items-center min-h-screen">
      <div>
        <video
          ref={myVideo}
          className="rounded-lg border border-white"
          playsInline
          muted
        />
        <p className="text-center mt-2">You</p>
      </div>
      <div>
        <video
          ref={userVideo}
          className="rounded-lg border border-white"
          playsInline
        />
        <p className="text-center mt-2">Guest</p>
      </div>
    </div>
  );
}
