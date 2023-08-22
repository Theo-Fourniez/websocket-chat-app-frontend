export class UserCredentials {
  constructor(
    private username: string,
    private password: string,
  ) {}

  toAuthorizationHeader(): string {
    return 'Basic ' + btoa(this.username + ':' + this.password);
  }
}
