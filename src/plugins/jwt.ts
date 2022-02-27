import fp from "fastify-plugin"
import fastifyJwt, { FastifyJWTOptions } from "fastify-jwt"
import { FastifyReply, FastifyRequest } from "fastify"
import { User } from "../models/user"

export default fp<FastifyJWTOptions>(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!
  })

  fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      console.log(await request.jwtVerify<User>())
    } catch (err) {
      fastify.log.error(err)
      reply.send(err)
    }
  })
})

declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: User
  }
}

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): void
  }
}
