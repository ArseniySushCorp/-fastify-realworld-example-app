import { Static, Type } from "@sinclair/typebox"
import { RouteShorthandOptions } from "fastify"

const CreateUserDto = Type.Object({
  username: Type.String(),
  password: Type.String(),
  email: Type.String({ format: "email" })
})

const CreateUserResponse = Type.Object({
  email: Type.String({ format: "email" }),
  token: Type.String(),
  username: Type.String(),
  bio: Type.String(),
  image: Type.String()
})

export const registerOptions: RouteShorthandOptions = {
  schema: {
    body: CreateUserDto
    // response: {
    //   201: CreateUserResponse
    // }
  }
}

export type RegisterRequest = {
  Body: Static<typeof CreateUserDto>
  Reply: Static<typeof CreateUserResponse>
}
