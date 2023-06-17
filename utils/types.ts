export interface Attack {
  name: string;
  type: string;
}

export interface Pokemon {
  __typename: string;
  name: string;
  classification: string;
  id: string;
  number: string;
  image: string;
  types: string[];
  maxHP: number;
  maxCP: number;
  attacks: {
    __typename: string;
    fast: Attack[];
    special: Attack[];
  };
}
