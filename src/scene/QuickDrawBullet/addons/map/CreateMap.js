export default class CreateMap {
  constructor(platforms) {
    platforms.create(400, 50, "ground").setScale(2).refreshBody();
  }
}
