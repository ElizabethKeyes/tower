import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TowerEventsService {
  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate("creator", "name picture")
    return towerEvents
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate("creator", "name picture")
    if (!towerEvent) {
      throw new BadRequest("The tower event you are looking for does not exist")
    }
    return towerEvent
  }

  async createTowerEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)
    return towerEvent
  }

  async editTowerEvent(towerEventId, towerEventData) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    if (towerEvent.isCanceled) {
      throw new BadRequest("A cancelled event can no longer be edited.")
    }
    towerEvent.name = towerEventData.name ? towerEventData.name : towerEvent.name
    towerEvent.description = towerEventData.description ? towerEventData.description : towerEvent.description
    towerEvent.coverImg = towerEventData.coverImg ? towerEventData.coverImg : towerEvent.coverImg
    towerEvent.location = towerEventData.location ? towerEventData.location : towerEvent.location
    towerEvent.capacity = towerEventData.capacity ? towerEventData.capacity : towerEvent.capacity
    towerEvent.startDate = towerEventData.startDate ? towerEventData.startDate : towerEvent.startDate
    towerEvent.isCanceled = towerEvent.isCanceled
    towerEvent.type = towerEventData.type ? towerEventData.type : towerEvent.type
    await towerEvent.save()
    return towerEvent
  }

  async cancelEvent(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    towerEvent.isCanceled = true
    await towerEvent.save()
    return `${towerEvent.name} has been cancelled.`
  }


}

export const towerEventsService = new TowerEventsService()