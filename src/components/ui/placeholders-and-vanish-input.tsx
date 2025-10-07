"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  /** ============================
   * PLACEHOLDER ROTATION LOGIC
   * ============================ */
  const startAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  }, [placeholders]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  }, [startAnimation]);

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange, startAnimation]);

  /** ============================
   * DRAW VANISH DATA ON CANVAS
   * ============================ */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!canvas || !input) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 800;
    const height = 200;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    const computedStyles = getComputedStyle(input);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 20, 60);

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        if (pixelData[idx + 3] > 0) {
          newData.push({
            x,
            y,
            r: 1,
            color: `rgba(${pixelData[idx]}, ${pixelData[idx + 1]}, ${pixelData[idx + 2]}, ${pixelData[idx + 3] / 255})`,
          });
        }
      }
    }

    newDataRef.current = newData;
  }, [value]);

  /** ============================
   * ANIMATION EFFECT
   * ============================ */
  const animateVanish = (startX: number) => {
    const animateFrame = (pos: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, 800, 200);
      const updated: any[] = [];

      for (const dot of newDataRef.current) {
        if (dot.x < pos) {
          dot.r -= 0.05;
        } else {
          dot.x += Math.random() > 0.5 ? 1 : -1;
          dot.y += Math.random() > 0.5 ? 1 : -1;
          dot.r -= 0.05 * Math.random();
        }

        if (dot.r > 0) {
          updated.push(dot);
          ctx.fillStyle = dot.color;
          ctx.fillRect(dot.x, dot.y, dot.r, dot.r);
        }
      }

      newDataRef.current = updated;

      if (updated.length > 0) {
        requestAnimationFrame(() => animateFrame(pos - 6));
      } else {
        setAnimating(false);
        setValue("");
      }
    };

    requestAnimationFrame(() => animateFrame(startX));
  };

  /** ============================
   * FORM LOGIC
   * ============================ */
  const vanishAndSubmit = useCallback(() => {
    if (animating || !value.trim()) return;
    setAnimating(true);
    draw();

    const maxX = newDataRef.current.reduce(
      (max, curr) => (curr.x > max ? curr.x : max),
      0
    );

    animateVanish(maxX);
  }, [draw, animating, value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      vanishAndSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-xl mx-auto h-12 rounded-full overflow-hidden border shadow-sm transition duration-200",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        value && "bg-blue-50 dark:bg-blue-900/20 border-blue-400"
      )}
    >
      {/* Canvas for vanish effect */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute top-[20%] left-2 sm:left-8 scale-50 origin-top-left pointer-events-none transition-opacity duration-200",
          animating ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder=""
        className={cn(
          "w-full h-full rounded-full px-4 sm:pl-10 pr-20 border-none bg-transparent text-gray-900 dark:text-white text-sm sm:text-base focus:outline-none",
          animating && "text-transparent"
        )}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={!value}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <motion.path
            d="M5 12h14"
            initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
            animate={{ strokeDashoffset: value ? 0 : "50%" }}
            transition={{ duration: 0.3 }}
          />
          <path d="M13 18l6-6-6-6" />
        </motion.svg>
      </button>

      {/* Placeholder rotation */}
      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && !animating && (
            <motion.p
              key={`placeholder-${currentPlaceholder}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="pl-4 sm:pl-12 text-gray-500 dark:text-zinc-400 text-sm sm:text-base truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
