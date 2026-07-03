function LogoIcon({className = "size-6"}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21h18M5 21V8l4-3 4 3 4-3v16M9 21v-5h4v5" />
    </svg>
  );
}

export default LogoIcon;
