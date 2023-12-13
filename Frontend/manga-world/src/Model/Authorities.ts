import User from "./User";

class Authorities {
  authId: number;
  type: string;
  user: User;

  constructor(authId: number, type: string, user: User) {
    this.authId = authId;
    this.type = type;
    this.user = user;
  }
}

export default Authorities;
