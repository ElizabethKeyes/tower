import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // TODO need to create TowerEventSchema then finish writing this post function.
    // .post('', this.createTowerEvent)
  }

}