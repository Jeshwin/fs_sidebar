import {MoonIcon, SunIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Directly add the 'dark' class to the body based on theme state
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-1 rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900"
        >
            {theme === "light" ? (
                <SunIcon className="w-6 h-6" />
            ) : (
                <MoonIcon className="w-6 h-6" />
            )}
        </button>
    );
}
