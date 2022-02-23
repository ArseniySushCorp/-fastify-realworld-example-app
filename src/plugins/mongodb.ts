import fp from "fastify-plugin"
import { connect } from "mongoose"

export default fp(async (fastify, opts) => {
  try {
    connect(process.env.MONGODB_URL!)
  } catch (e) {
    console.error(e)
  }
})
