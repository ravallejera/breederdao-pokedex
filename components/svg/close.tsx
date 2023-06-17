import cn from 'classnames';

interface LogoProps {
  className?: string;
}

export default function Logo({ 
  className
}: LogoProps) {
  return (
    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="34.6239" height="8.99322" rx="3" transform="matrix(0.710717 0.703479 -0.710717 0.703479 6.39258 0.316406)" fill="#212121"/>
      <rect width="34.6239" height="8.99322" rx="3" transform="matrix(-0.710717 0.703478 -0.710716 -0.703479 30.999 6.32666)" fill="#212121"/>
    </svg>
  )
  }
  