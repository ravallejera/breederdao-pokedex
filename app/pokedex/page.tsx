"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql } from "@apollo/client";
import { useState } from 'react';
import cn from "classnames";
import Card from "@/components/card";

export interface Pokemon {
  __typename: string;
  name: string;
  classification: string;
  id: string;
  number: string;
  image: string;
  types: string[];
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

  const defaultValues = { filterSearch: '', filterTypes: [] };
  const [formValues, setFormValues] = useState(defaultValues);
  const { register, handleSubmit, getValues } = useForm<FormInput>({ defaultValues });
  const onSubmit: SubmitHandler<FormInput> = data => setFormValues({...(data as any)});
  const handleFilterFields = () => setTimeout(() => setFormValues((getValues() as any)), 50);
  const filterPokemons = (pokemons: Pokemon[], searchName: string, searchTypes: string[]): Pokemon[] => {
    return pokemons.filter((pokemon) => {
      // Filter by name (case-insensitive)
      if (searchName && !pokemon.name.toLowerCase().includes(searchName.toLowerCase())) return false;
  
      // Filter by types (at least one type must match)
      if (searchTypes.length > 0 && !searchTypes.some((type) => pokemon.types.includes(type))) return false;
  
      // If all filters passed, include the Pokémon in the result
      return true;
    });
  };

  const filteredPokemonList = filterPokemons(pokemonList, formValues.filterSearch, formValues.filterTypes);
  const uniqueTypes = [
    ...new Set(filteredPokemonList.flatMap((pokemon: Pokemon) => pokemon.types)),
  ].sort() as string[];
  
  

  return (
    <section
      className={cn("section", "py-7 px-5 text-black bg-white")}
    >
      <div className={cn("container")}>
        <h1 className={cn("text-[27px] tracking-widest text-center")}>
          800 <b className="font-bold">Pokemons</b> for you to choose your
          favorite
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('filterSearch')}
            type="text"
            placeholder="Encuentra tu pokémon..."
            onKeyUp={handleFilterFields}
            className={cn(
              "bg-light-2 w-full rounded-[40px] h-[31px] shadow-textfield text-[12px] text-dark px-4"
            )}
          />
          <div className={cn('filter-type',
            'relative',
          )}>
            <button onClick={toggleFilter} className=''>
              <span className="md:hidden">Filter</span>
              <span className="hidden md:inline-block">Type</span>
            </button>
            {uniqueTypes?.map((type: string, index) => (
              <div key={index}>
                <input
                  id={`cb-${index}`}
                  type="checkbox"
                  value={type}
                  {...register('filterTypes')}
                  onClick={handleFilterFields}
                />
                <label htmlFor={`cb-${index}`}>{type}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
      {filteredPokemonList?.length > 0 && (
        <ul>
          {filteredPokemonList.map((data: Pokemon, index) => (
            <li key={index}>
              <Card data={data} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
