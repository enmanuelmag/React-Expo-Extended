import {
  GetPokemonBaseParamsType,
  GetPokemonParamsType,
  PokemonApiResponse,
  PokemonDetailType,
} from '@customTypes/pokemon';

abstract class PokeDS {
  abstract getPokemonsBase(params: GetPokemonBaseParamsType): Promise<PokemonApiResponse>;

  abstract getPokemonDetail(name: GetPokemonParamsType): Promise<PokemonDetailType>;
}

export default PokeDS;
