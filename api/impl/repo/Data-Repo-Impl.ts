import DataRepo from '@api/domain/repo/Data-Repo';

import PokeDS from '@api/domain/ds/Poke-DS';
import UserDS from '@api/domain/ds/User-DS';

type ConstructorType = {
  userService: UserDS;
  pokeService: PokeDS;
};

class DataRepoImpl extends DataRepo {
  userService: UserDS;
  pokeService: PokeDS;

  constructor(params: ConstructorType) {
    super();

    this.userService = params.userService;
    this.pokeService = params.pokeService;
  }
}

export default DataRepoImpl;
