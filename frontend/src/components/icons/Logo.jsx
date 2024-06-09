const Logo = () => {
  return (
    <>
      <svg
        width="48"
        height="48"
        className="lg:mr-2 h-6 sm:h-9"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#4A90E2"
          stroke-width="10"
          fill="none"
        />
        <circle cx="100" cy="100" r="70" fill="#F5A623" />
        <circle cx="100" cy="100" r="50" fill="#FFFFFF" />
        <circle cx="100" cy="100" r="30" fill="#F5A623" />
        <circle cx="100" cy="100" r="15" fill="#FFFFFF" />

        <rect x="70" y="30" width="60" height="140" fill="#4A90E2" rx="15" />
        <circle cx="100" cy="30" r="10" fill="#FFFFFF" />
        <circle cx="100" cy="170" r="10" fill="#FFFFFF" />

        <polygon points="115,100 85,80 85,120" fill="#FFFFFF" />
      </svg>
    </>
  );
};

export default Logo;
