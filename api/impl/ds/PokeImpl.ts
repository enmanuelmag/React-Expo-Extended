import 'react-native-get-random-values';

import PokeDS from '@api/domain/ds/PokeDS';

import { Logger } from '@utils/log';
import { ErrorCodes, ErrorService } from '@utils/errors';

import { POKEMON_API } from '@constants/app';
import {
  GetPokemonBaseParamsType,
  GetPokemonParamsType,
  PokemonApiResponse,
  PokemonDetailType,
} from '@customTypes/pokemon';

class ExternalDS extends PokeDS {
  constructor() {
    super();
  }

  async getPokemonsBase(params: GetPokemonBaseParamsType) {
    try {
      const { limit = 10, offset = 0 } = params;

      const url = new URL(POKEMON_API);

      url.pathname = '/api/v2/pokemon';
      url.searchParams.append('limit', limit.toString());
      url.searchParams.append('offset', offset.toString());

      const pokemons = await fetch(url);

      const pokemonsJSON = (await pokemons.json()) as PokemonApiResponse;

      return pokemonsJSON;
    } catch (error) {
      Logger.error('Error getting pokemons', error);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_GETTING_POKEMONS);
    }
  }

  async getPokemonDetail(params: GetPokemonParamsType) {
    try {
      const { id } = params;

      const url = new URL(POKEMON_API);

      url.pathname = `/api/v2/pokemon/${id}`;

      const pokemon = await fetch(url.toString());

      const pokemonJSON = (await pokemon.json()) as PokemonDetailType;

      pokemonJSON.stats = pokemonJSON.stats.sort((a, b) => b.base_stat - a.base_stat);

      return pokemonJSON;
    } catch (error) {
      Logger.error('Error getting pokemon detail', error);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_GETTING_POKEMON_DETAIL);
    }
  }
}

export default ExternalDS;
