import PokeImpl from '@api/impl/ds/PokeImpl';
import UserImpl from '@api/impl/ds/UserImpl';

import DataRepoImpl from '@api/impl/repo/DataRepoImpl';

const pokeDS = new PokeImpl();

const userDS = new UserImpl();

const DataRepo = new DataRepoImpl({
  pokeService: pokeDS,
  userService: userDS,
});

export default DataRepo;
