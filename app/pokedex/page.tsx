import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';


const GET_POKEMON_LIST = gql`
  query PokemonList {
    pokemons(first: 4) {
      name
      classification
      id
      number
      image
      types
    }
  }
`;

export default async function Pokedex() {
  const { data: { pokemons } } = await client.query({ query: GET_POKEMON_LIST });

  console.log('data', pokemons);

  console.log( 'test' );


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Pokedex page</h2>

    </main>
  )
}
