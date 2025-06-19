"use client";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Lee el modo al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme");
      if (savedMode === "dark") setIsDarkMode(true);
      else if (savedMode === "light") setIsDarkMode(false);
    }
  }, []);

  // Aplica el modo cuando cambia
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode((v) => !v)}
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/30 dark:border-black/30 flex items-center justify-center transition-all duration-500 hover:scale-110 bg-white dark:bg-white shadow-md  cursor-pointer"
      aria-label="Cambiar modo"
    >
      <span
        className={`transition-transform duration-500 ease-in-out transform ${isDarkMode ? "rotate-180" : "rotate-0"}`}
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-6 sm:h-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12H2.5M19.071 4.929l-.707.707M5.636 18.364l-.707.707M19.071 19.071l-.707-.707M5.636 5.636l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-6 sm:h-6 text-black transition-transform duration-500 ease-in-out"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.09 9.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
