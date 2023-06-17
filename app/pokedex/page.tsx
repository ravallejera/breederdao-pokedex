import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { PokemonFragment } from '@/fragments/pokemon.fragment';
import Pokedex from '@/app/pokedex/pokedex';

const query = gql`
  query PokemonList {
    pokemons(first: 20) {
      ...PokemonDetails
    }
  }
  ${PokemonFragment}
`;

export default async function PokedexPage() {
  const { data, loading, error } = await getClient().query({ query });

  return (
    <Pokedex data={data} />
  )
}
