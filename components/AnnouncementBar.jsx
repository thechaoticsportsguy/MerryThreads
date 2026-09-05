"use client";

import { useEffect, useState } from "react";

// December 12, 2026, at 11:59:59 p.m. Eastern Standard Time.
// Update this when the next holiday delivery deadline is confirmed.
const DEADLINE = Date.parse("2026-12-12T23:59:59-05:00");

function getSecondsRemaining() {
  return Math.max(0, Math.ceil((DEADLINE - Date.now()) / 1000));
}

function getTimeParts(totalSeconds) {
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(number) {
  return String(number).padStart(2, "0");
}

export default function AnnouncementBar() {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    function updateCountdown() {
      const nextRemaining = getSecondsRemaining();
      setRemaining(nextRemaining);

      if (nextRemaining === 0) {
        window.clearInterval(intervalId);
      }
    }

    const intervalId = window.setInterval(updateCountdown, 1000);
    const initialId = window.setTimeout(updateCountdown, 0);

    function refreshWhenVisible() {
      if (!document.hidden) {
        updateCountdown();
      }
    }

    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(initialId);
      document.removeEventListener(
        "visibilitychange",
        refreshWhenVisible
      );
    };
  }, []);

  const expired = remaining === 0;
  const time = remaining === null ? null : getTimeParts(remaining);

  return (
    <aside
      aria-label="Christmas delivery deadline"
      className="dark-surface bg-sage text-eggshell"
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2 text-center text-[14px]">
        <p>
          {expired
            ? "The Christmas delivery cutoff has passed"
            : "Order by Dec 12 for Christmas delivery"}
        </p>

        {!expired && (
          <span
            role="timer"
            aria-live="off"
            aria-label={
              time
                ? `${time.days} days, ${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds remaining`
                : "Calculating time remaining"
            }
            className="whitespace-nowrap font-medium tabular-nums"
          >
            {time
              ? `${time.days}d ${pad(time.hours)}h ${pad(time.minutes)}m ${pad(time.seconds)}s`
              : "--d --h --m --s"}
          </span>
        )}
      </div>
    </aside>
  );
}
