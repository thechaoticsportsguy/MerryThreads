"use client";

import { useEffect, useState } from "react";

// December 12, 2026, at 11:59:59 p.m. Eastern Standard Time.
// Update this deadline when the next holiday delivery schedule is confirmed.
const ORDER_DEADLINE = Date.parse("2026-12-12T23:59:59-05:00");

function getRemainingSeconds() {
  return Math.max(0, Math.ceil((ORDER_DEADLINE - Date.now()) / 1000));
}

function splitTime(totalSeconds) {
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function CountdownBar() {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    let intervalId;

    function updateCountdown() {
      const nextRemaining = getRemainingSeconds();
      setRemaining(nextRemaining);

      if (nextRemaining === 0 && intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    }

    intervalId = window.setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const expired = remaining === 0;
  const time = remaining === null ? null : splitTime(remaining);

  return (
    <aside
      aria-label="Christmas delivery deadline"
      className="bg-oat text-sage"
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
            className="inline-block whitespace-nowrap font-medium tabular-nums"
          >
            {time
              ? `${time.days}d ${pad(time.hours)}h ${pad(time.minutes)}m ${pad(time.seconds)}s`
              : "\u2014d \u2014h \u2014m \u2014s"}
          </span>
        )}
      </div>
    </aside>
  );
}
