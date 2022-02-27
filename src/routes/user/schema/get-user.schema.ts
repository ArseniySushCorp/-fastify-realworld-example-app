import { FastifySchema } from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { UserReply, UserReplyType, ErrorReply } from "./../../../shared/schema"

export interface UserRequest extends RouteGenericInterface {
  Reply: UserReplyType
}

export const UserSchema: FastifySchema = {
  response: {
    200: UserReply,
    401: ErrorReply
  }
}
