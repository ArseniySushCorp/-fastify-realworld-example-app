import { FastifyPluginAsync } from "fastify"
import { pick } from "ramda"
import UserModel from "../../models/user"
import { ALREADY_REGISTERED_ERROR } from "./const"
import { RegisterRequest, registerOptions } from "./options"

const UsersRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<RegisterRequest>("/", registerOptions, async (request, reply) => {
    const existUser = await UserModel.findOne({ email: request.body.email })

    if (existUser) throw fastify.httpErrors.badRequest(ALREADY_REGISTERED_ERROR)

    const newUser = await UserModel.create({ ...request.body, passwordHash: "111" })

    const response = pick(["email", "username", "bio", "image"], newUser.toObject())

    reply.status(201).send({ ...response, token: "13" })
  })
}

export default UsersRoute
