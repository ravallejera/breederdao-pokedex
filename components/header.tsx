'use client'; // This is a client component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgLogo from '@/svg/logo';
import SvgBurger from '@/svg/burger';

import cn from 'classnames';
import styles from '@/components/header.module.scss';

export default function Header() {
  const currentRoute = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navList = [
    {
      name: 'Home',
      path: '/',
      className: null,
    },
    {
      name: 'Pokédex',
      path: '/pokedex',
      className: null,
    },
    {
      name: 'Legendaries',
      path: '/legendaries',
      LIclassName: 'md:hidden',
    },
    {
      name: 'El equipo',
      path: '/el-equipo',
      LIclassName: 'md:hidden',
    },
    {
      name: 'Documentacion',
      path: '/documentacion',
      LIclassName: 'md:hidden',
    }
  ];

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [currentRoute]);

  return (
    <header className="nav relative z-10 px-6 pt-5 pb-3 h-14 bg-third shadow-header md:px-5 md:py-6 md:items-start md:h-auto lg:px-0">
      <div className={cn('nav-overlay hidden', {[styles.navOverlay]: isMenuOpen })} onClick={toggleMenu} />
      <div className={cn('nav-inner flex items-center justify-between md:flex md:mx-auto lg:max-w-[1186px] lg:px-7', {[styles.navInner]: isMenuOpen })}>
        <div className={cn('logo flex', {[styles.navLogo]: isMenuOpen })}>
          <Link href="/">
            <SvgLogo className="w-[59px] md:w-[121px] lg:w-[157px]" />
          </Link>
        </div>
        {!isMenuOpen && (
          <button
            className="block md:hidden text-blue-500 hover:text-blue-700"
            onClick={toggleMenu}
          >
            <SvgBurger />
          </button>
        )}

        <nav className={cn('menu hidden md:block', {[styles.navMenu]: isMenuOpen })}>
          <ul className="grid md:flex md:pr-8 md:gap-11 lg:pr-0">
            {navList.map((item, index) => {
              const isActive = item.path === currentRoute;
              const defaultClass = 'font-roboto text-[27px] leading-[32px] text-dark md:flex md:relative md:text-[19px] md:leading-[22px]';
              const activeClass = 'before:hidden md:before:block before:content-[""] before:absolute before:h-[3px] before:inset-x-0 before:top-[40px] before:-mx-2 before:rounded-[3px] before:bg-dark pointer-events-none';

              return (
                <li key={index} className={cn(item.LIclassName)}>
                  <Link href={item.path} className={cn(defaultClass, {[activeClass]: isActive })}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
