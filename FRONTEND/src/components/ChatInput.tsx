import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const placeholders = [
  "Ask about optimizing your code...",
  "Need help with a coding problem?",
  "Want to improve your code quality?",
  "Looking for performance tips?",
];

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  };

  return (
    <form
      className="w-full relative max-w-3xl mx-auto bg-zinc-800/80 rounded-2xl overflow-hidden shadow-lg mb-4 border border-white/10"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleInput();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }
        }}
        className={cn(
          "w-full resize-none text-sm sm:text-base z-50 border-none text-white bg-transparent rounded-2xl focus:outline-none focus:ring-0 pl-4 sm:pl-6 pr-20 py-3",
          "scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent hover:scrollbar-thumb-zinc-500"
        )}
        placeholder={placeholders[currentPlaceholder]}
        rows={1}
        style={{
          maxHeight: "150px",
          lineHeight: "1.5rem",
        }}
      />

      <button
        disabled={!value}
        type="submit"
        className="absolute right-3 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-zinc-700 bg-primary/20 hover:bg-primary/30 transition duration-200 flex items-center justify-center disabled:opacity-50"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary h-4 w-4"
        >
          <path d="M5 12l14 0" />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
    </form>
  );
}