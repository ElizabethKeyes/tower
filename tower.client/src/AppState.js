import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],

  /** @type {import('./models/TowerEvent.js').TowerEvent|null} */
  towerEvent: null,

  /** @type {import('./models/Ticket.js').Tickets[]} */
  tickets: [],

  /** @type {import('./models/Comment.js').Comments[]} */
  comments: [],
})
