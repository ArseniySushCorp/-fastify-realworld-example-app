import { FastifyPluginAsync } from "fastify"
import { compare } from "bcryptjs"

import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND, WRONG_PASS } from "./users.const"
import { RegisterRequest, RegisterSchema } from "./schema/register.schema"
import { LoginRequest, LoginSchema } from "./schema/login.schema"
import UserService from "./users.service"

const UsersRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const userService = new UserService()

  fastify.post<RegisterRequest>("/", { schema: RegisterSchema }, async (request, reply) => {
    const existUser = await userService.findUser({ email: request.body.email })

    if (existUser) throw fastify.httpErrors.badRequest(ALREADY_REGISTERED_ERROR)

    const createdUser = await userService.createUser(request.body)

    const responseWithToken = { ...createdUser, token: fastify.jwt.sign({ email: request.body.email }) }

    reply.status(201).send({ user: responseWithToken })
  })

  fastify.post<LoginRequest>("/login", { schema: LoginSchema }, async (request, reply) => {
    const { email, password } = request.body
    const existUser = await userService.findUser({ email })

    if (!existUser) throw fastify.httpErrors.unauthorized(USER_NOT_FOUND)

    const isCorrectPass = await compare(password, existUser.passwordHash)

    if (!isCorrectPass) throw fastify.httpErrors.unauthorized(WRONG_PASS)

    const userResponse = userService.buildUserResponse(existUser)

    const responseWithToken = { ...userResponse, token: fastify.jwt.sign({ email: request.body.email }) }

    reply.status(201).send({ user: responseWithToken })
  })
}

export default UsersRoute
