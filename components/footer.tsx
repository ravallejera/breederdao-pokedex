import Link from 'next/link';
import cn from 'classnames';

export default function Footer() {
  return (
    <footer className={cn('bg-third relative overflow-hidden px-3 pb-4 text-dark text-center', 'md:px-9 md:pt-10 md:pb-6', 'lg:px-7 lg:pb-8')}>
      <ul className={cn('grid gap-y-1', 'md:flex justify-between md:mx-auto', 'lg:max-w-[1186px]')}>
        <li className={cn('md:order-1')}>
          <Link href="/" className={cn('text-[18px] font-bold')}>
            Ours Team
          </Link>
        </li>
        <li className={cn('md:flex items-center')}>
          <p className={cn('text-[16px]', 'lg:text-[18px]')}>
            Made with ❤️ by the PokéSpartans team, Platzi Master
          </p>
        </li>
      </ul>
    </footer>
  );
}
