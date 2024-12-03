import DataDS from '@api/domain/ds/DataDS';
import DataRepo from '@api/domain/repo/DataRepo';

class DataRepoImpl extends DataRepo {
  constructor(private db: DataDS) {
    super();
  }

  async getUser() {
    const data = await this.db.getUser();
    return data;
  }

  async signinWithEmailAndPassword(email: string, password: string) {
    const data = await this.db.signinWithEmailAndPassword(email, password);
    return data;
  }

  async signinWithGoogle() {
    const data = await this.db.signinWithGoogle();
    return data;
  }

  async signinWithApple() {
    const data = await this.db.signinWithApple();
    return data;
  }

  async signinAnonymously() {
    const data = await this.db.signinAnonymously();
    return data;
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    const data = await this.db.signUpWithEmailAndPassword(email, password);
    return data;
  }

  async signInWithLocalAuth() {
    const data = await this.db.signInWithLocalAuth();
    return data;
  }

  async checkBiometric() {
    const data = await this.db.checkBiometric();
    return data;
  }

  async setCheckBiometric(value: boolean) {
    return await this.db.setCheckBiometric(value);
  }

  async getCheckBiometric() {
    const data = await this.db.getCheckBiometric();
    return data;
  }

  async logout() {
    await this.db.logout();
  }

  async deleteAccount() {
    await this.db.deleteAccount();
  }
}

export default DataRepoImpl;
