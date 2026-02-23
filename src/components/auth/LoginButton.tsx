/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LoginWarning from "./LoginWarning";

export default function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    signIn("spotify");
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="bg-sky-400 hover:bg-sky-500 text-white font-bold rounded-full h-11 px-0 aspect-square sm:aspect-auto sm:px-5 transition-all hover:scale-105 active:scale-95 shadow-lg border-none"
      >
        <img
          src="/icons/spotify-white-icon.png"
          alt="Spotify"
          draggable={false}
          className="w-6 h-6 object-contain"
        />
        <span className="hidden sm:block ml-2 tracking-tight">
          Login <span className="hidden md:inline">with Spotify</span>
        </span>
      </Button>

      <LoginWarning
        isOpen={showModal}
        setIsOpen={setShowModal}
        onLogin={handleLogin}
      />
    </>
  );
}
