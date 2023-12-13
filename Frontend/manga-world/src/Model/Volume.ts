import Manga from "./Manga";

class Volume {
  vid: number;
  vnumber: number;
  vtitle: string;
  vreleaseDate: Date;
  vviews: number;
  manga: Manga;

  constructor(
    vid: number,
    vnumber: number,
    vtitle: string,
    vreleaseDate: Date,
    vviews: number,
    manga: Manga
  ) {
    this.vid = vid;
    this.vnumber = vnumber;
    this.vtitle = vtitle;
    this.vreleaseDate = vreleaseDate;
    this.vviews = vviews;
    this.manga = manga;
  }
}
export default Volume;
