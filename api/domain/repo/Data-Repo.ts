import UserDS from '@api/domain/ds/User-DS';
import PokeDS from '@api/domain/ds/Poke-DS';

abstract class DataRepo {
  abstract userService: UserDS;

  abstract pokeService: PokeDS;
}

export default DataRepo;
