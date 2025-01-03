import { Model, Types } from "mongoose";

export const getObjectId = (
  target?: string | Model<any> | Types.ObjectId | null
): Types.ObjectId | null => {
  if (!target) return null;

  if (target instanceof Types.ObjectId) {
    return new Types.ObjectId(target.toString());
  }

  if (typeof target === "object") {
    if (target && target.id && Types.ObjectId.isValid(target.id)) {
      return new Types.ObjectId(target.id);
    }

    return target && target._id ? new Types.ObjectId(target._id) : null;
  }

  if (Types.ObjectId.isValid(target)) {
    return new Types.ObjectId(target.toString());
  }

  if (typeof target === "string") {
    if (Types.ObjectId.isValid(target)) {
      return new Types.ObjectId(target);
    }

    return null;
  }

  return null;
};
