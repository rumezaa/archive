export default function Mark({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3 L28 27 L16.5 21.5 L4 27 Z"
        fill={color}
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="15.2" cy="12.2" r="1.7" fill="#F6F3CF" />
    </svg>
  );
}
