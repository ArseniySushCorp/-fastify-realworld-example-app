import { Static, Type } from "@sinclair/typebox"
import { FastifySchema } from "fastify"
import { UserReply, UserReplyType, ErrorReply } from "./../../../shared/schema"

const CreateUserDto = Type.Object({
  user: Type.Object({
    username: Type.String(),
    password: Type.String(),
    email: Type.String({ format: "email" })
  })
})

export type CreateUserDto = Static<typeof CreateUserDto>

export type RegisterRequest = {
  Body: CreateUserDto
  Reply: UserReplyType
}

export const RegisterSchema: FastifySchema = {
  body: CreateUserDto,
  response: {
    201: UserReply,
    400: ErrorReply
  }
}
