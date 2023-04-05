import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getAllTowerEvents() {
    const res = await api.get(`/api/events`)
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
    logger.log(AppState.towerEvents)
  }
}

export const towerEventsService = new TowerEventsService()