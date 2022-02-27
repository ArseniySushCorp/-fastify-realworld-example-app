import { UpdateUserDto } from "./../routes/user/schema/update-user.schema"
import { pick } from "ramda"
import { genSalt, hash } from "bcryptjs"
import UserModel, { User } from "../models/user"
import { CreateUserDto } from "../routes/users/schema/register.schema"

class UserService {
  async findUser({ email }: { email: string }): Promise<User | null> {
    const user = await UserModel.findOne({ email }).exec()

    if (!user) return null

    return user.toObject()
  }

  async createUser({ user }: CreateUserDto): Promise<User> {
    const salt = await genSalt(10)

    const newUser = await UserModel.create({ ...user, passwordHash: await hash(user.password, salt) })

    return newUser.toObject()
  }

  buildUserResponse(user: User): Pick<User, "email" | "username" | "bio" | "image"> {
    const userResponse = pick(["email", "username", "bio", "image"], user)

    return userResponse
  }

  async updateUser({ _id }: User, { user }: UpdateUserDto): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(_id, user, { new: true }).exec()

    if (!updatedUser) return null

    return updatedUser.toObject()
  }
}

const userService = new UserService()

export default userService
