import { FastifyPluginAsync } from "fastify"
import { GetUserRequest, UserSchema } from "./schema/get-user.schema"
import userService from "../../services/user.service"

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<GetUserRequest>(
    "/",
    { schema: UserSchema, onRequest: fastify.authenticate },
    async function (request, reply) {
      const userResponse = userService.buildUserResponse(request.user)

      return { user: { ...userResponse, token: request.headers.authorization! } }
    }
  )

  fastify.put("/", { onRequest: fastify.authenticate }, async function (request, reply) {})
}

export default user
