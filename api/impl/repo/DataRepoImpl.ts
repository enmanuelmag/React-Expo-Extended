import DataRepo from '@api/domain/repo/DataRepo';

import PokeDS from '@api/domain/ds/PokeDS';
import UserDS from '@api/domain/ds/UserDS';

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
