import { pick } from "ramda"
import { genSalt, hash } from "bcryptjs"
import UserModel, { User } from "../models/user"
import { CreateUserDto } from "../routes/users/schema/register.schema"

class UserService {
  async findUser({ email }: { email: string }): Promise<User | null> {
    const user = await UserModel.findOne({ email }).exec()

    return user
  }

  async createUser({ user }: CreateUserDto) {
    const salt = await genSalt(10)

    const newUser = await UserModel.create({ ...user, passwordHash: await hash(user.password, salt) })

    return this.buildUserResponse(newUser.toObject())
  }

  buildUserResponse(user: User): Pick<User, "email" | "username" | "bio" | "image"> {
    const userResponse = pick(["email", "username", "bio", "image"], user)

    return userResponse
  }
}

export default UserService