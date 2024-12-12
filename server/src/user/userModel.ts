import { model, Schema, type Types } from "mongoose";
import { writeConcern } from "../mongo/writeConcern.js";

type User = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date;
};

export type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    removedAt: { type: Date, default: null },
  },
  {
    collection: "User",
    writeConcern,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const UserModel = model<UserDocument>("User", UserSchema);
