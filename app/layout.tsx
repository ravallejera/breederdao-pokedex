import './global.scss';
import { Karla, Roboto } from 'next/font/google';
import cn from 'classnames';

import Header from '@/components/header';
import Footer from '@/components/footer';

const karla = Karla({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-karla',
});
const roboto = Roboto({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'BreederDAO - PokeDex App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(karla.variable, roboto.variable)}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
