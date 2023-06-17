import Image from 'next/image';
import Link from 'next/link';

{/* TOFIX: temporary fix, this should ne removed, once 'Response not successful: Received status code 404' is resolve */}
import Pokedex from '@/app/pokedex/page';

export default function Home() {
  return (
    <section className="bg-third relative overflow-hidden">
      <div className="pt-12 pb-7 md:mx-auto lg:flex lg:max-w-[1186px]">
        <div className="max-w-full grid lg:order-1 lg:w-[54.13153457%]">
          <Image
            className="lg:-ml-6 lg:min-w-[150%]"
            src="/banner.png"
            alt="Next.js Logo"
            width={1400}
            height={0}
            style={{ width: '100%', height: 'auto' }} // optional
            priority
          />
        </div>
        <div className="grid gap-y-2 px-6 text-center text-black md:pb-5 lg:p-0 lg:pl-7 lg:text-left lg:w-[45.86846543%]">
          <h1 className="text-[42px] md:text-[72px] lg:text-left">
            <b className="font-bold">Find</b> all your favorite <b className="font-bold">Pokemon</b>
          </h1>
          <p className="text-[24px] lg:text-[32px]">
            You can learn about the type, strengths, weaknesses, and abilities of each Pokemon.
          </p>
          <Link href="/pokedex" className="flex justify-center items-center h-[55px] rounded-[11px] bg-green text-dark text-[24px] font-bold shadow-button pb-1 px-9 mt-8 md:inline-flex md:w-fit md:mx-auto md:h-[66px] lg:mx-0">
            See Pokemons
          </Link>
        </div>
      </div>

      {/* TOFIX: temporary fix, this should ne removed, once 'Response not successful: Received status code 404' is resolve */}
      <div className='hidden'>
        <Pokedex />
      </div>
    </section>
  );
}