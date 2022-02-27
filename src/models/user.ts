import { getModelForClass, prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export class User extends TimeStamps {
  @prop({ required: true, unique: true })
  public email: string

  @prop({ required: true, default: "" })
  public username!: string

  @prop({ default: "" })
  public bio!: string

  @prop({ default: "" })
  public image!: string

  @prop({ required: true })
  public passwordHash!: string
}

export interface User extends Base {}

const UserModel = getModelForClass(User)

export default UserModel
