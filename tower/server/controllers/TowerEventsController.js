import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .get('', this.getAllTowerEvents)
      .get('/:towerEventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:towerEventId', this.editTowerEvent)
      .delete('/:towerEventId', this.cancelEvent)
  }

  async getAllTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAllTowerEvents()
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventById(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const towerEvent = await towerEventsService.getTowerEventById(towerEventId)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async createTowerEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(eventData)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editTowerEvent(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const towerEventData = req.body
      const towerEvent = await towerEventsService.editTowerEvent(towerEventId, towerEventData)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      // TODO come back and finish soft delete function
      res.send()
    } catch (error) {
      next(error)
    }
  }
}