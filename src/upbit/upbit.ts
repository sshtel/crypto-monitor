import { Auth } from './auth';

export class Upbit {

  private auth: Auth;
  constructor(accessToken: string, secretToken: string) {
    this.auth = new Auth(accessToken, secretToken);
  }

  public setAuth(accessToken: string, secretToken: string) {
    this.auth = new Auth(accessToken, secretToken);
  }

  public getToken() {
    this.auth.getTokens();
  }

}
