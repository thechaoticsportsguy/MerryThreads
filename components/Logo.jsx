// Inline geometry from public/logo.svg so the mark inherits the wordmark color.
export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      width="53.333"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-8 w-auto shrink-0"
    >
      <path d="M14 106 L52 63" />
      <ellipse cx="57.5" cy="57.5" rx="6" ry="3.6" transform="rotate(-48 57.5 57.5)" strokeWidth="2.6" />
      <path d="M63 54 C 73 47, 82 50, 89 62 C 96 74, 103 85, 116 85 C 124 85, 130 84, 135 81" />
      <path d="M134 81 L192 47" />
      <path d="M142.7 75.9 L152.7 59.9" />
      <path d="M154.3 69.1 L164.3 53.1" />
      <path d="M165.9 62.3 L175.9 46.3" />
      <path d="M142.7 75.9 L157 86" />
      <path d="M154.3 69.1 L168.6 79.2" />
      <path d="M165.9 62.3 L180.2 72.4" />
    </svg>
  );
}
