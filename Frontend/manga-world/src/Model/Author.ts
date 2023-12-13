class Author {
  aid: number;
  aname: string;
  awebsite: string;
  adescription: string;

  constructor(
    aid: number,
    aname: string,
    awebsite: string,
    adescription: string
  ) {
    this.aid = aid;
    this.aname = aname;
    this.awebsite = awebsite;
    this.adescription = adescription;
  }
}

export default Author;
