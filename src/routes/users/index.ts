import { FastifyPluginAsync } from "fastify"
import { compare } from "bcryptjs"

import { RegisterRequest, RegisterSchema } from "./schema/register.schema"
import { LoginRequest, LoginSchema } from "./schema/login.schema"
import UserService from "../../services/user.service"
import errors from "../../constants/errors"

const UsersRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  const userService = new UserService()

  fastify.post<RegisterRequest>("/", { schema: RegisterSchema }, async (request, reply) => {
    const { email } = request.body.user
    const existUser = await userService.findUser({ email })

    if (existUser) throw fastify.httpErrors.badRequest(errors.ALREADY_REGISTERED_ERROR)

    const createdUser = await userService.createUser(request.body)

    const responseWithToken = { ...createdUser, token: `Bearer ${fastify.jwt.sign({ email })}` }

    reply.status(201)
    return { user: responseWithToken }
  })

  fastify.post<LoginRequest>("/login", { schema: LoginSchema }, async (request, reply) => {
    const { email, password } = request.body.user
    const existUser = await userService.findUser({ email })

    if (!existUser) throw fastify.httpErrors.unauthorized(errors.USER_NOT_FOUND)

    const isCorrectPass = await compare(password, existUser.passwordHash)

    if (!isCorrectPass) throw fastify.httpErrors.unauthorized(errors.WRONG_PASS)

    const userResponse = userService.buildUserResponse(existUser)

    const responseWithToken = { ...userResponse, token: `Bearer ${fastify.jwt.sign({ email })}` }

    reply.status(201)
    return { user: responseWithToken }
  })
}

export default UsersRoute
