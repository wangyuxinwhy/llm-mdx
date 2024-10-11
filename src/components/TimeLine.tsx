import { cn } from "@/lib/utils";
import React from "react";

interface TimelineEventProps {
  date: string;
  children: React.ReactNode;
  className?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  date,
  children,
  className,
}) => {
  return (
    <div className={cn("relative pl-10 pb-4", className)}>
      <div
        className={cn(
          "absolute left-0 top-0 mt-1.5 -ml-2 h-4 w-4 rounded-full border-2 border-white bg-gray-500",
          "animate-pulse"
        )}
      ></div>
      <div className="absolute left-0 top-0 mt-2 ml-[3px] h-full w-[2px] bg-gradient-to-b from-gray-200 to-gray-400"></div>
      <time className="mb-1 text-sm font-bold text-gray-400">{date}</time>
      <div className="mt-2 transform transition-all duration-500 ease-in-out hover:scale-105">
        {children}
      </div>
    </div>
  );
};

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ children, className }) => (
  <div className={cn("relative", className)}>{children}</div>
);

export { Timeline, TimelineEvent };
