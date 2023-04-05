import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate("creator", "name picture")
    return comment
  }

  async getCommentsByEventId(towerEventId) {
    const comments = await dbContext.Comments.find({ eventId: towerEventId }).populate("creator", "name picture")
    return comments
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest("Comment was not found, invalid ID")
    }
    if (userId != comment.creatorId) {
      throw new Forbidden("Only the original creator of a comment may remove it.")
    }
    comment.remove()
    return `The comment reading ${comment.body} has been removed`
  }

}

export const commentsService = new CommentsService()