import { constant } from './constant';

export class Auth {
  private accessToken: string | undefined = '';
  private secretToken: string | undefined  = '';
  constructor() {
    this.accessToken = constant.UPBIT_ACCESS_TOKEN;
    this.secretToken = constant.UPBIT_SECRET_TOKEN;
  }

  public getTokens(): { accessToken: string | undefined , secretToken: string | undefined } {
    return { accessToken: this.accessToken, secretToken: this.secretToken };
  }
}
