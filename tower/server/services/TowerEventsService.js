import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
  async createTowerEvent(eventData) {
    const towerEvent = await dbContext.TowerEvent.create(eventData)
    return towerEvent
  }

}

export const towerEventsService = new TowerEventsService()