import { FastifyPluginAsync } from "fastify"
import { GetUserRequest, GetUserSchema } from "./schema/get-user.schema"
import userService from "../../services/user.service"
import { UpdateUserRequest, UpdateUserSchema } from "./schema/update-user.schema"
import { isEmpty } from "ramda"
import errors from "../../constants/errors"

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<GetUserRequest>(
    "/",
    { schema: GetUserSchema, onRequest: fastify.authenticate },
    async function (request) {
      const userResponse = userService.buildUserResponse(request.user)

      return { user: { ...userResponse, token: request.headers.authorization! } }
    }
  )

  fastify.put<UpdateUserRequest>(
    "/",
    { schema: UpdateUserSchema, onRequest: fastify.authenticate },
    async function (request) {
      const { user } = request.body

      if (isEmpty(request.body.user)) {
        throw fastify.httpErrors.unprocessableEntity(errors.EMPTY_UPDATE_USER_BODY_ERROR)
      }

      if (user.email) {
        const checkExistUser = await userService.findUser({ email: user.email })

        if (checkExistUser) {
          throw fastify.httpErrors.conflict(errors.EMAIL_ALREADY_EXIST_ERROR)
        }
      }

      const updatedUser = await userService.updateUser(request.user, request.body)

      if (!updatedUser) {
        throw fastify.httpErrors.badRequest(errors.FAILED_TO_UPDATE_USER_ERROR)
      }

      return { user: { ...userService.buildUserResponse(updatedUser), token: request.headers.authorization! } }
    }
  )
}

export default user
