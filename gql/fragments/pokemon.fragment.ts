import { gql } from '@apollo/client';

export const PokemonFragment = gql`
  fragment PokemonDetails on Pokemon {
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
`;