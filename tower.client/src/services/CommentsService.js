import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  async getCommentsByEventId(towerEventId) {
    const res = await api.get(`/api/events/${towerEventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async postComment(commentData) {
    const res = await api.post(`/api/comments`, commentData)
    AppState.comments.push(new Comment(res.data))
  }
}

export const commentsService = new CommentsService()