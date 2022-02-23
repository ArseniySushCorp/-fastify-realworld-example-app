import { FastifyPluginAsync } from "fastify"

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return "this is an example users"
  })
}

export default user
