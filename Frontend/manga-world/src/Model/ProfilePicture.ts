import User from "./User";

class ProfilePicture {
  pictureId: number;
  picture: string;
  user: User;

  constructor(pictureId: number, picture: string, user: User) {
    this.pictureId = pictureId;
    this.picture = picture;
    this.user = user;
  }
}

export default ProfilePicture;
