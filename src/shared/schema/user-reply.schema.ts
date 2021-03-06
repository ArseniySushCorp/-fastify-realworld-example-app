import { Static, Type } from "@sinclair/typebox"

export const UserReply = Type.Object({
  user: Type.Object({
    email: Type.String({ format: "email" }),
    token: Type.String(),
    username: Type.String(),
    bio: Type.String(),
    image: Type.String({ format: "uri", default: "" })
  })
})

export type UserReplyType = Static<typeof UserReply>
