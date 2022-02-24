import { Static, Type } from "@sinclair/typebox"

const LoginUserDto = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String()
})

export type LoginUserDto = Static<typeof LoginUserDto>

const LoginUserResponse = Type.Object({
  user: Type.Object({
    email: Type.String({ format: "email" }),
    token: Type.String(),
    username: Type.String(),
    bio: Type.String(),
    image: Type.String()
  })
})

export type LoginUserResponse = Static<typeof LoginUserResponse>

export type LoginRequest = {
  Body: LoginUserDto
  Reply: LoginUserResponse
}

export const LoginSchema = {
  body: LoginUserDto,
  response: {
    200: LoginUserResponse
  }
}
