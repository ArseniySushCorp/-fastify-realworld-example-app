import { FastifyPluginAsync } from "fastify"
import UserModel from "../../models/user"
import { ALREADY_REGISTERED_ERROR } from "./users.const"
import { RegisterRequest, RegisterSchema } from "./schema/register.schema"
import userService from "./users.service"

const UsersRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<RegisterRequest>("/", { schema: RegisterSchema }, async (request, reply) => {
    const existUser = await UserModel.findOne({ email: request.body.email })

    if (existUser) throw fastify.httpErrors.badRequest(ALREADY_REGISTERED_ERROR)

    const response = await userService.createUserResponse(request.body)

    reply.status(201).send({ ...response, token: fastify.jwt.sign({ email: request.body.email }) })
  })

  fastify.post("/login", async (request, reply) => {
    return "login"
  })
}

export default UsersRoute
