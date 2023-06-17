'use client'; // This is a client component
import { useState } from 'react';
import { Pokemon } from '@/utils/types';
import Pills from '../../components/pill';
import CardDetails from './card-details';

interface CardProps {
  data: Pokemon;
}

export default function Card({ data }: CardProps) {
  const {
    name,
    types,
    image,
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
      {isCardOpen && ( <CardDetails data={data} toggleCard={toggleCard} /> )}
    </>
  );
}
