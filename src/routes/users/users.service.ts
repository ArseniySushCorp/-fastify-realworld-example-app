import { pick } from "ramda"
import { genSalt, hash } from "bcryptjs"
import UserModel from "../../models/user"
import { CreateUserDto } from "./schema/register.schema"

const userService = {
  createUserResponse: async (body: CreateUserDto): Promise<any> => {
    const salt = await genSalt(10)

    const newUser = await UserModel.create({ ...body, passwordHash: await hash(body.password, salt) })

    const response = pick(["email", "username", "bio", "image"], newUser.toObject())

    return response
  }
}

export default userService
