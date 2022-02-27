import { FastifySchema } from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { UserReply, UserReplyType, ErrorReply } from "../../../shared/schema"

export interface GetUserRequest extends RouteGenericInterface {
  Reply: UserReplyType
}

export const GetUserSchema: FastifySchema = {
  response: {
    200: UserReply,
    401: ErrorReply
  }
}
