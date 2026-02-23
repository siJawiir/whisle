"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import LogoutWarning from "./LogoutWarning";

export default function LogoutButton() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setShowLogoutModal(true);
        }}
        className="flex items-center gap-2 text-zinc-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer rounded-lg px-3 py-2 transition-colors group"
      >
        <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="font-semibold text-xs">Logout</span>
      </DropdownMenuItem>

      <LogoutWarning
        isOpen={showLogoutModal}
        setIsOpen={setShowLogoutModal}
        onLogout={handleLogout}
      />
    </>
  );
}
