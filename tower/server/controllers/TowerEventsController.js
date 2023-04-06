import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .get('', this.getAllTowerEvents)
      .get('/:towerEventId', this.getTowerEventById)
      .get('/:towerEventId/tickets', this.getTicketsByEventId)
      .get('/:towerEventId/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:towerEventId', this.editTowerEvent)
      .delete('/:towerEventId', this.cancelEvent)
  }

  async getAllTowerEvents(req, res, next) {
    try {
      const query = req.query
      const towerEvents = await towerEventsService.getAllTowerEvents(query)
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

  async getTicketsByEventId(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const tickets = await ticketsService.getTicketsByEventId(towerEventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const comments = await commentsService.getCommentsByEventId(towerEventId)
      res.send(comments)
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
      const userId = req.userInfo.id
      const towerEvent = await towerEventsService.editTowerEvent(towerEventId, towerEventData, userId)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const userId = req.userInfo.id
      const message = await towerEventsService.cancelEvent(towerEventId, userId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}