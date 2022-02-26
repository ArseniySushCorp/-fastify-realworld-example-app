import { FastifyPluginAsync } from "fastify"
import { GetUserRequest, GetUserSchema } from "./schema/get-user.schema"
import errors from "../../constants/errors"
import UserService from "../../services/user.service"

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const userService = new UserService()

  fastify.get<GetUserRequest>(
    "/",
    { schema: GetUserSchema, onRequest: fastify.authenticate },
    async function (request, reply) {
      const existUser = await userService.findUser({ email: request.decodedUser.email })

      if (!existUser) throw fastify.httpErrors.unauthorized(errors.USER_NOT_FOUND)

      const userResponse = userService.buildUserResponse(existUser)

      return { user: { ...userResponse, token: request.headers.authorization! } }
    }
  )
}

export default user
