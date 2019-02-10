// import { jwttoken } from 'jsonwebtoken';

export class Auth {
  private accessToken: string = '';
  private secretToken: string = '';
  constructor(accessToken: string, secretToken: string) {
    this.accessToken = accessToken;
    this.secretToken = secretToken;
  }

  public getTokens(): { accessToken: string, secretToken: string } {
    return { accessToken: this.accessToken, secretToken: this.secretToken };
  }
}
