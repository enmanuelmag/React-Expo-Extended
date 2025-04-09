import PokeImpl from '@api/impl/ds/Poke-Impl';
import UserImpl from '@api/impl/ds/User-Impl';

import DataRepoImpl from '@api/impl/repo/Data-Repo-Impl';

const pokeDS = new PokeImpl();

const userDS = new UserImpl();

const DataRepo = new DataRepoImpl({
  pokeService: pokeDS,
  userService: userDS,
});

export default DataRepo;
