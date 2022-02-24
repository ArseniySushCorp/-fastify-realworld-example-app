import { Static, Type } from "@sinclair/typebox"
import { FastifySchema } from "fastify"

const CreateUserDto = Type.Object({
  username: Type.String(),
  password: Type.String(),
  email: Type.String({ format: "email" })
})

export type CreateUserDto = Static<typeof CreateUserDto>

const CreateUserResponse = Type.Object({
  email: Type.String({ format: "email" }),
  token: Type.String(),
  username: Type.String(),
  bio: Type.String(),
  image: Type.String()
})

export type CreateUserResponse = Static<typeof CreateUserResponse>

export type RegisterRequest = {
  Body: CreateUserDto
  Reply: CreateUserResponse
}

export const RegisterSchema: FastifySchema = {
  body: CreateUserDto,
  response: {
    201: CreateUserResponse
  }
}
