/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Settings2, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "Type / to search",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const [ page, query, type] = pathname.split("/");

  const handleSearch = useCallback(
    (value: string) => {
      if (!value) return;
      const trimmed = value.trim().replace(/\s/g, "+");

      if (type) {
        router.push(`/search/${trimmed}/${type}`);
      } else {
        router.push(`/search/${trimmed}`);
      }
    },
    [router, type],
  );

  useEffect(() => {
    if (page === "search" && query) {
      setInput(query.replace(/\+/g, " "));
    }
  }, [page, query]);

  useEffect(() => {
    const inputElement = searchRef.current;
    if (!inputElement) return;

    const typewriter = new Typewriter(null, {
      loop: true,
      delay: 50,
      onCreateTextNode: (character: string) => {
        inputElement.placeholder = inputElement.placeholder + character;
        return null;
      },
      onRemoveNode: () => {
        inputElement.placeholder = inputElement.placeholder.slice(0, -1);
      },
    });

    typewriter
      .typeString("What do you want to listen?")
      .pauseFor(3000)
      .deleteAll()
      .typeString("Search for a song or artist")
      .pauseFor(3000)
      .deleteAll()
      .typeString(placeholder)
      .pauseFor(5000)
      .deleteAll()
      .start();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputElement) {
        e.preventDefault();
        inputElement.focus();
      }
      if (e.key === "Escape") {
        inputElement.blur();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [placeholder]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(input);
        searchRef.current?.blur();
      }}
      className={cn("relative group w-full max-w-xl", className)}
    >
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-zinc-500 group-focus-within:text-sky-500 transition-colors" />

        <Input
          type="text"
          ref={searchRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-11 pl-11 pr-24 bg-zinc-900/50 border-zinc-800 rounded-full focus-visible:ring-1 focus-visible:ring-sky-500/50 focus-visible:border-sky-500 transition-all placeholder:text-zinc-600 font-medium"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {pathname !== "/search" && (
            <Link
              href="/search"
              className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <Settings2 className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
