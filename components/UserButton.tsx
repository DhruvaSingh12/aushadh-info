"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Check, LogOutIcon, MonitorIcon, Settings, GlobeIcon } from "lucide-react";
import { useState } from "react";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { theme, setTheme } = useTheme();
  const [, setLoading] = useState(false);

  const handleLanguageChange = async (language: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetLanguage: language }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Translation API Error Response:", errorData);
        throw new Error(errorData.error || "Failed to translate the website.");
      }
  
      const data = await response.json();
      console.log("Translation success:", data.translations);
      window.location.reload();
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`flex-none p-2 rounded-full ${className}`}>
          <Settings className="rounded-full w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <MonitorIcon size={24} className="mr-2 text-muted-foreground" />Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System Default {theme === "system" && <Check className="ms-2 size-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light {theme === "light" && <Check className="ms-2 size-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark {theme === "dark" && <Check className="ms-2 size-4" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <GlobeIcon size={24} className="mr-2 text-muted-foreground" />Language
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("es")}>
              Spanish
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
              French
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("de")}>
              German
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("zh")}>
              Chinese
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {/* Add logout logic here */}}>
          <LogOutIcon size={24} className="mr-2 text-muted-foreground" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
