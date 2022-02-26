import fp from "fastify-plugin"
import fastifyJwt, { FastifyJWTOptions } from "fastify-jwt"
import { FastifyReply, FastifyRequest } from "fastify"

declare module "fastify" {
  export interface FastifyRequest {
    decodedUser: { email: string }
  }
}

export default fp<FastifyJWTOptions>(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!
  })

  fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.decodedUser = await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): void
  }
}
