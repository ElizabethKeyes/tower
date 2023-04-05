import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {

  async createTicket(ticketData) {
    const towerEvent = await towerEventsService.getTowerEventById(ticketData.eventId)
    if (towerEvent.capacity == 0) {
      throw new BadRequest("Cannot complete request, event has no capacity remaining")
    }
    towerEvent.capacity--
    await towerEvent.save()
    if (towerEvent.isCanceled == true) {
      throw new BadRequest("I'm sorry, this event has been cancelled")
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate("profile", "name picture")
    await ticket.populate("event")
    return ticket
  }

  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate("event")
    return tickets
  }

  async getTicketsByEventId(towerEventId) {
    const tickets = await dbContext.Tickets.find({ eventId: towerEventId }).populate("profile", "name picture")
    return tickets
  }

  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (userId != ticket.accountId) {
      throw new Forbidden("You do not have permission to delete this ticket.")
    }
    const towerEvent = await towerEventsService.getTowerEventById(ticket.eventId)
    towerEvent.capacity++
    await towerEvent.save()
    if (!ticket) {
      throw new BadRequest("This ticket could not be found, invalid ID")
    }
    ticket.remove()
    return (`The ticket with id ${ticketId} has been deleted`)
  }

}

export const ticketsService = new TicketsService()