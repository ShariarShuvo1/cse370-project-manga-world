import Volume from "./Volume";

class VolumeCover {
  vcId: number;
  vcPicture: string;
  volume: Volume;

  constructor(vcId: number, vcPicture: string, volume: Volume) {
    this.vcId = vcId;
    this.vcPicture = vcPicture;
    this.volume = volume;
  }
}
export default VolumeCover;
