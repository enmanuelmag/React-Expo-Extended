import FirebaseDS from '@api/impl/ds/ExternalDS';

import DataRepoImpl from '@api/impl/repo/DataRepoImpl';

const firebaseDS = new FirebaseDS();

const DataRepo = new DataRepoImpl(firebaseDS);

export default DataRepo;
