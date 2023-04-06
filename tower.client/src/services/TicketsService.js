import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async getTowerEventAttendees(towerEventId) {
    const res = await api.get(`/api/events/${towerEventId}/tickets`)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }

  async attendEvent(towerEventId) {
    const res = await api.post(`api/tickets`, { eventId: towerEventId })
    AppState.tickets.push(new Ticket(res.data))
  }

  async getTicketsByAccountId() {
    const res = await api.get('account/tickets')
    AppState.tickets = res.data.map(t => new Ticket(t))
  }
}

export const ticketsService = new TicketsService()