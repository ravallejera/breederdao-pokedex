interface LogoProps {
  className?: string;
}

export default function Logo({ 
  className
}: LogoProps) {
  return (
    <svg className={className} width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.876953" width="30.9375" height="5.5" rx="2" fill="#212121"/>
      <rect x="0.876953" y="8.25" width="30.9375" height="5.5" rx="2" fill="#212121"/>
      <rect x="0.876953" y="16.5" width="30.9375" height="5.5" rx="2" fill="#212121"/>
    </svg>
  )
}
  