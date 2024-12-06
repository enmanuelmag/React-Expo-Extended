import UserDS from '@api/domain/ds/UserDS';
import PokeDS from '@api/domain/ds/PokeDS';

abstract class DataRepo {
  abstract userService: UserDS;

  abstract pokeService: PokeDS;
}

export default DataRepo;
