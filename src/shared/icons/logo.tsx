import { createSvgIcon } from '@/shared/utils/create-svg';

const ReFlowLogo = createSvgIcon(
  'ReFlowLogo',
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 60"
    fill="none"
  >
    <defs>
      <linearGradient id="flowGradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3A7BD5" />
        <stop offset="100%" stopColor="#00D2FF" />
      </linearGradient>
    </defs>
    <text x="0" y="40" fill="#fff" fontSize="36" fontWeight="bold" fontFamily="Inter, sans-serif">Re:</text>
    <text x="60" y="40" fill="url(#flowGradient)" fontSize="36" fontWeight="bold" fontFamily="Inter, sans-serif" transform="skewX(-10)">Flow</text>
    <rect x="60" y="44" width="90" height="4" rx="2" fill="url(#flowGradient)" opacity="0.7" />
  </svg>
);

export default ReFlowLogo;