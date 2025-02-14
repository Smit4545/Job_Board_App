'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store' 
import { toggleDarkMode } from '../../redux/themeSlice' 
import { Sun, Moon } from 'lucide-react' 

export default function DarkMode() {
  const dispatch = useDispatch()

  // Retrieve the dark mode state from the Redux store
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  useEffect(() => {
    // Applies or removes the "dark" class on the <html> element based on the dark mode state
    if (darkMode) {
      document.documentElement.classList.add('dark') // Enables dark mode by adding the "dark" class
    } else {
      document.documentElement.classList.remove('dark') // Disables dark mode by removing the "dark" class
    }
  }, [darkMode]) // Runs every time the dark mode state changes

  return (
    <button
      // Toggles dark mode when the button is clicked
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md transition"
    >
      {/* Show Sun icon when dark mode is enabled, Moon icon when dark mode is disabled */}
      {darkMode ? (
        <Sun className="text-yellow-400" /> // Sun icon (light mode) appears when dark mode is active
      ) : (
        <Moon className="text-gray-700" /> // Moon icon (dark mode) appears when dark mode is inactive
      )}
    </button>
  )
}
