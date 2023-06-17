'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Card from '@/app/pokedex/card';
import SvgClose from '@/svg/close';
import styles from './pokedex.module.scss';
import { Pokemon } from '@/utils/types';
import { chunkArray } from '@/utils/helperFunctions';

interface FormInput {
  filterSearch: string;
  filterTypes: string[];
}

export default function Pokedex({
  data
}: {
  data: { pokemons: Pokemon[] }
}) {
  const pokemonList: Pokemon[] = data?.pokemons;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  let timer: ReturnType<typeof setTimeout>;
  const defaultValues = { filterSearch: '', filterTypes: [] };
  const [formValues, setFormValues] = useState<FormInput>(defaultValues);
  const { register, handleSubmit, getValues, reset, resetField } = useForm<FormInput>({ defaultValues });
  const onSubmit: SubmitHandler<FormInput> = data => setFormValues({ ...data });
  const handleFilterReset = () => { 
    reset(); 
    setActivePage(0); 
  };
  const handleFilterFields = () => {
    clearTimeout(timer);
    timer = setTimeout(() => setFormValues(getValues()), 50);
    setActivePage(0);
  };
  const handleFilterTextfield = () => {
    handleFilterFields();
    resetField('filterTypes');
  }

  const pokemonListBySearchName: Pokemon[] = pokemonList.filter(({ name }) =>
    name.toLowerCase().includes(formValues.filterSearch.toLowerCase())
  );
  const uniqueTypes = [...new Set(pokemonListBySearchName.flatMap(pokemon => pokemon.types))].sort();

  const pokemonListByNameAndTypes: Pokemon[] = formValues.filterTypes.length > 0
  ? pokemonListBySearchName.filter(({ types }) =>
      formValues.filterTypes.some(type => types.includes(type))
    )
  : pokemonListBySearchName;

  const filterTypeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (isFilterOpen && filterTypeRef.current && !filterTypeRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);
    return () => window.removeEventListener('mousedown', handleOutSideClick);
  }, [isFilterOpen]);


  // for pager
  const [pageCount, setPageCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);
  const pageSize = 9;
  const length = pokemonListByNameAndTypes?.length || 0;
  const pageSets: Pokemon[][] = chunkArray(pokemonListByNameAndTypes, pageSize);

  useEffect(() => {
    setPageCount(Math.ceil(length / pageSize));
  }, [pokemonListByNameAndTypes]);

  return (
    <section className="section bg-white">
      <div
        className="container py-7 px-5 text-black md:px-10 md:mx-auto lg:max-w-[1186px] lg:pt-[73px] lg:pb-[60px]">
        <div className="top-content">
          <h1 className="text-[27px] tracking-widest text-center mb-7 lg:text-[35px] lg:mb-8">
            800 <b className='font-bold'>Pokemons</b> for you to choose your favorite
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('filterSearch')}
              type='text'
              placeholder='Encuentra tu pokémon...'
              onKeyUp={handleFilterTextfield}
              className="bg-light-2 w-full rounded-[40px] h-[31px] shadow-textfield text-[12px] text-dark px-4 lg:h-[53px] lg:text-[16px] lg:px-8"
            />
            <div className='filter-buttons flex gap-x-4 mt-4 lg:gap-x-14 lg:mt-9'>
              <div
                className="filter-type relative grid"
              >
                <button
                  onClick={toggleFilter}
                  className="'bg-light-2 w-[77px] rounded-[8px] h-[20px] shadow-textfield text-[12px] text-black px-3 md:w-[134px] md:h-[24px] md:text-[14px]">
                  <span className='md:hidden'>Filter</span>
                  <span className='hidden md:inline-block'>Type</span>
                </button>
                <div
                  className={cn('hidden', { [styles.filterOverlay]: isFilterOpen })}
                  onClick={toggleFilter}
                />
                <div
                  ref={filterTypeRef}
                  className={cn(
                    'filter-list grid grid-cols-3 gap-y-2 gap-x-5 md:absolute md:z-10 md:top-8 md:py-4 md:px-8',
                    'md:grid-cols-1 md:bg-light-2 md:w-full md:rounded-[8px] md:shadow-textfield md:text-[14px] md:text-black',
                    { hidden: !isFilterOpen, [styles.filterListOpen]: isFilterOpen }
                  )}
                >
                  <button className='hidden' onClick={toggleFilter}>
                    <SvgClose />
                  </button>
                  <h3 className='hidden'>Type</h3>
                  {uniqueTypes?.map((type, index) => (
                    <div key={index}>
                      <div className={styles.checkboxCont}>
                        <input
                          id={`cb-${index}`}
                          type='checkbox'
                          value={type}
                          {...register('filterTypes')}
                          onClick={handleFilterFields}
                        />
                        <label
                          htmlFor={`cb-${index}`}
                          className="text-[16px]"
                        >
                          {type}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="filter-reset relative grid">
                <button
                  onClick={handleFilterReset}
                  className="bg-light-2 w-[77px] rounded-[8px] h-[20px] shadow-textfield text-[12px] text-black px-3 md:w-[134px] md:h-[24px] md:text-[14px]">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        {pokemonListByNameAndTypes.length > 0 && (
          <ul
            className="grid gap-y-6 mt-7 md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-11 lg:mt-11">
            {pageSets[activePage].map((data:Pokemon, index: number) => (
              <li key={index}>
                <Card data={data} />
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Pager */}
      {pageCount > 0 && (
        <div className="flex items-center justify-center pb-12 gap-x-4">
          {Array.from({ length: pageCount }, (_, index) => index).map((item: number) => (
            <button 
              key={item} onClick={() => setActivePage(item)}
              className={cn('rounded-[50%] w-2 h-2 bg-dark opacity-50', { '!opacity-100': activePage === item })} />
          ))}
        </div>
      )}
      
    </section>
  );
}
