"use client";
import type { Metadata } from "next";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserProvider, {
  VideoProvider,
  SocketProvider,
  useAuth,
} from "@/Context";
import { PeerProvider } from "@/Context/usePeer";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Video call",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { authStatus } = useAuth();
  const [videoStatus, setVideoStatus] = useState(false);
  const [connectionStatus, setConnection] = useState(false);

  if (!authStatus) {
    router.replace("/");
    return <></>;
  }

  return (
    <>
      <PeerProvider>
        <VideoProvider value={{ videoStatus, setVideoStatus }}>
          <main className="w-[100%]">
            <UserProvider>
              <SocketProvider>{children}</SocketProvider>
            </UserProvider>
          </main>
        </VideoProvider>
      </PeerProvider>
    </>
  );
}
