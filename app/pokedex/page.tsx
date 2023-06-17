'use client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Card from '@/components/card';
import SvgClose from '@/svg/close';
import styles from './page.module.scss';

export interface Pokemon {
  __typename: string;
  name: string;
  classification: string;
  id: string;
  number: string;
  image: string;
  types: string[];
  maxHP: number,
  maxCP: number,
  attacks: {
    __typename: string;
    fast: any[];
    special: any[];
  };
}

interface FormInput {
  filterSearch: string;
  filterTypes: string[];
}

const query = gql`
  query PokemonList {
    pokemons(first: 20) {
      name
      classification
      id
      number
      image
      types
      maxHP
      maxCP
      weaknesses
      resistant
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      evolutions {
        name
      }
      evolutionRequirements {
        name
      }
      attacks {
        fast {
          type
          name
          damage
        }
        special {
          type
          name
          damage
        }
      }
    }
  }
`;

export default function Pokedex() {
  const { data }: any = useSuspenseQuery(query);
  const pokemonList: Pokemon[] = data?.pokemons;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  let timer: ReturnType<typeof setTimeout>;
  const defaultValues = { filterSearch: '', filterTypes: [] };
  const [formValues, setFormValues] = useState<FormInput>(defaultValues);
  const { register, handleSubmit, getValues, reset, resetField } = useForm<FormInput>({ defaultValues });
  const onSubmit: SubmitHandler<FormInput> = data => setFormValues({ ...data });
  const handleFilterReset = () => { reset(); };
  const handleFilterFields = () => {
    clearTimeout(timer);
    timer = setTimeout(() => setFormValues(getValues()), 50);
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
    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [isFilterOpen]);

  return (
    <section className={cn('section bg-white')}>
      <div
        className={cn(
          'container',
          'py-7 px-5 text-black',
          'md:px-10 md:mx-auto',
          'lg:max-w-[1186px] lg:pt-[73px] lg:pb-[60px]'
        )}
      >
        <div className={cn('top-content')}>
          <h1
            className={cn(
              'text-[27px] tracking-widest text-center mb-7 lg:text-[35px] lg:mb-8'
            )}
          >
            800 <b className='font-bold'>Pokemons</b> for you to choose your favorite
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('filterSearch')}
              type='text'
              placeholder='Encuentra tu pokémon...'
              onKeyUp={handleFilterTextfield}
              className={cn(
                'bg-light-2 w-full rounded-[40px] h-[31px] shadow-textfield text-[12px] text-dark px-4',
                'lg:h-[53px] lg:text-[16px] lg:px-8'
              )}
            />
            <div className='filter-buttons flex gap-x-4 mt-4 lg:gap-x-14 lg:mt-9'>
              <div
                className={cn('filter-type', 'relative grid')}
              >
                <button
                  onClick={toggleFilter}
                  className={cn(
                    'bg-light-2 w-[77px] rounded-[8px] h-[20px] shadow-textfield text-[12px] text-black px-3',
                    'md:w-[134px] md:h-[24px] md:text-[14px]'
                  )}
                >
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
                    'filter-list',
                    'grid grid-cols-3 gap-y-2 gap-x-5',
                    'md:absolute md:z-10 md:top-8 md:py-4 md:px-8',
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
                          className={cn('text-[16px]')}
                        >
                          {type}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cn('filter-reset', 'relative grid')}>
                <button
                  onClick={handleFilterReset}
                  className={cn(
                    'bg-light-2 w-[77px] rounded-[8px] h-[20px] shadow-textfield text-[12px] text-black px-3',
                    'md:w-[134px] md:h-[24px] md:text-[14px]'
                  )}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        {pokemonListByNameAndTypes.length > 0 && (
          <ul
            className={cn(
              'grid gap-y-6 mt-7',
              'md:grid-cols-2 md:gap-x-5',
              'lg:grid-cols-3 lg:gap-x-8 lg:gap-y-11 lg:mt-11'
            )}
          >
            {pokemonListByNameAndTypes.map((data, index) => (
              <li key={index}>
                <Card data={data} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
