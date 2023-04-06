import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getAllTowerEvents() {
    const res = await api.get(`/api/events`)
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
  }

  async getTowerEventById(towerEventId) {
    const res = await api.get(`api/events/${towerEventId}`)
    AppState.towerEvent = new TowerEvent(res.data)
  }

  async getEventsByCreatorId(accountId) {
    const res = await api.get(`api/events?creatorId=${accountId}`)
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
  }

  async createEvent(eventData) {
    const res = await api.post(`api/events`, eventData)
    AppState.towerEvents.push(new TowerEvent(res.data))
    AppState.towerEvent = new TowerEvent(res.data)
  }

  async cancelEvent(towerEventId) {
    const res = await api.delete(`/api/events/${towerEventId}`)
    const foundIndex = AppState.towerEvents.findIndex(t => t.id == towerEventId)
    AppState.towerEvents[foundIndex].isCanceled = true
    AppState.towerEvent.isCanceled = true
  }

  async editEvent(towerEventId, towerEventData) {
    const res = await api.put(`api/events/${towerEventId}`, towerEventData)
    const foundIndex = AppState.towerEvents.findIndex(t => t.id == towerEventId)
    AppState.towerEvents.splice(foundIndex, 1, new TowerEvent(res.data))
    AppState.towerEvent = new TowerEvent(res.data)
  }
}

export const towerEventsService = new TowerEventsService()