import { Profile } from "./Account.js"

export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.capacity = data.capacity
    this.coverImg = data.coverImg
    this.creator = data.creator ? new Profile(data.creator) : null
    this.creatorId = data.creatorId
    this.description = data.description
    this.isCanceled = data.isCanceled
    this.location = data.location
    this.name = data.name
    this.startDate = data.startDate
    this.type = data.type
  }
}