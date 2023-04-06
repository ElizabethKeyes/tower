import { Profile } from "./Account.js"

export class Comment {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.createdAt = new Date(data.createdAt)
    this.creator = new Profile(data.creator)
    this.creatorId = data.creatorId
    this.eventId = data.eventId
  }
}