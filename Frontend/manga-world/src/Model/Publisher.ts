class Publisher {
  pid: number;
  pname: string;
  pwebsite: string;
  pdescription: string;

  constructor(
    pid: number,
    pname: string,
    pwebsite: string,
    pdescription: string
  ) {
    this.pid = pid;
    this.pname = pname;
    this.pwebsite = pwebsite;
    this.pdescription = pdescription;
  }
}

export default Publisher;
