"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { toggleDarkMode } from "../../redux/themeSlice";
import { Sun, Moon } from "lucide-react";

export default function DarkMode() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    // Ensures correct theme is applied after hydration
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md transition"
    >
      {darkMode ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-700" />
      )}
    </button>
  );
}
