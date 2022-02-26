import { FastifySchema } from "fastify"
import { UserReply, UserReplyType, ErrorReply } from "./../../../shared/schema"

export type GetUserRequest = {
  Reply: UserReplyType
}

export const GetUserSchema: FastifySchema = {
  response: {
    200: UserReply,
    401: ErrorReply
  }
}
