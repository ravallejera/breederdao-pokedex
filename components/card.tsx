'use client'; // This is a client component
import { useState } from 'react';
import { Pokemon, Attack } from '@/utils/types';
import cn from 'classnames';
import Pills from './pill';
import SvgClose from '@/svg/close';

interface CardProps {
  data: Pokemon;
}

export default function Card({ data }: CardProps) {
  const {
    name,
    types,
    image,
    classification,
    maxHP,
    maxCP,
    number,
    attacks,
  } = data;

  const [isCardOpen, setIsCardOpen] = useState(false);
  const toggleCard = () => setIsCardOpen(!isCardOpen);

  return (
    <>
      {/* Main Card */}
      <div onClick={toggleCard} className="card relative overflow-hidden flex h-[140px] rounded-lg bg-light shadow-card md:h-[146px] hover:cursor-pointer">
        <div className="relative z-1 grid w-[34.1246290801%] pl-5 pt-2 pb-3 text-[18px] font-bold">
          <h2 className="text-dark">
            <span>{name}</span>
          </h2>
          <div className="flex items-end">
            <Pills types={types} className="mt-auto" />
          </div>
        </div>
        <div className="w-[65.8753709199%]">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Card Details */}
      {isCardOpen && (
        <div className="fixed z-30 inset-x-0 inset-y-0 before:content-[''] before:fixed before:inset-x-0 before:inset-y-0 before:bg-light flex md:items-center md:justify-center md:before:bg-dark md:before:opacity-50">
          <div className="absolute z-2 inset-x-0 inset-y-0" onClick={toggleCard} />
          <div
            style={{ background: 'linear-gradient(270deg, #B33327 0.15%, #D93E30 100%)' }}
            className={cn(
              'relative z-10 overflow-y-auto h-full w-full bg-light p-5 pt-10 rounded-xl',
              'md:p-0 md:h-[310px] md:max-w-[700px] md:overflow-y-visible',
              'lg:h-[370px] lg:max-w-[800px]'
            )}
          >
            <button onClick={toggleCard} className="absolute top-[15px] left-[14px] md:-top-[45px] md:left-auto md:right-0">
              <SvgClose />
            </button>
            <div className="content grid gap-y-5 md:grid-cols-2 md:transform md:h-full">
              <div
                style={{ background: 'linear-gradient(180deg, #732119 42.19%, #D93E30 100%)' }}
                className="absolute -z-1 inset-y-0 inset-x-0 top-[350px] rounded-xl md:top-0"
              />

              <h2 className="relative md:hidden text-light font-bold text-[36px] text-center">{name}</h2>
              <div className="relative grid gap-y-5">
                <img src={image} className="w-full h-full object-cover relative rounded-xl shadow-textfield md:rounded-r-none md:absolute" />
                <div className="flex items-center justify-between md:fixed md:right-[50%] md:bottom-[20px] md:pr-4">
                  <div className="card-info-1 flex gap-x-4 items-center md:fixed md:top-[18px] md:right-[16px]">
                    <span className="rounded-[50%] bg-warning w-[41px] h-[41px] flex items-center justify-center text-[16px] text-black md:order-1">
                      {number}
                    </span>
                    <span className="text-light-2 text-[16px]">{classification}</span>
                  </div>
                  <Pills types={types} className="h-[21px] pb-1" />
                </div>
              </div>

              <div className="relative grid gap-y-5 content-start md:pr-4 md:pb-5 md:pt-6 md:pl-3">
                <h2 className="hidden md:block font-bold text-[p24px] text-light-3">{name}</h2>

                <div className="info-box p-5 bg-light-3 rounded-xl grid gap-y-3 shadow-textfield md:order-1">
                  <h3 className="text-[31px] md:hidden">Attack</h3>
                  <ul className="grid grid-cols-2 gap-x-3 md:gap-x-2">
                    <li className="grid gap-y-2 content-start md:gap-y-1">
                      <h4 className="text-[22px] md:-text-[12px]">Fast:</h4>
                      {attacks.fast.map(({ name, type }: Attack, index) => (
                        <div key={index} className="flex gap-x-2">
                          <span className="text-[14px] md:text-[12px]">{name}</span>
                          <Pills types={[type]} />
                        </div>
                      ))}
                    </li>
                    <li className="grid gap-y-2 content-start md:gap-y-1">
                      <h4 className="text-[22px] md:-text-[12px]">Special:</h4>
                      {attacks.special.map(({ name, type }: Attack, index) => (
                        <div key={index} className="flex gap-x-2">
                          <span className="text-[14px] md:text-[12px]">{name}</span>
                          <Pills types={[type]} />
                        </div>
                      ))}
                    </li>
                  </ul>
                </div>

                <div className="info-box p-5 bg-light-3 rounded-xl grid gap-y-3 shadow-textfield">
                  <ul className="grid grid-cols-2 gap-x-3">
                    <li className="grid gap-y-1 content-start">
                      <h4 className="text-[14px]">Max HP: {maxHP}</h4>
                      <div className="bg-light rounded-md h-[8px] relative overflow-hidden">
                        <div
                          style={{ width: `${(maxHP / 3500) * 100}%`, background: 'linear-gradient(270deg, #64D368 0.15%, #64D368 70.88%)' }}
                          className="w-full absolute left-0 top-0 bottom-0 bg-dark rounded-md"
                        />
                      </div>
                    </li>
                    <li className="grid gap-y-1 content-start">
                      <h4 className="text-[14px]">Max CP: {maxCP}</h4>
                      <div className="bg-light rounded-md h-[8px] relative overflow-hidden">
                        <div
                          style={{ width: `${(maxCP / 3500) * 100}%`, background: 'linear-gradient(180deg, #F5DB13 0%, #F2B807 100%)' }}
                          className="w-full absolute left-0 top-0 bottom-0 bg-dark rounded-md"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
