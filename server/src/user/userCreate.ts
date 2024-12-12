import { UserModel } from "./userModel.js";

type UserCreateArgs = {
  name: string;
  email: string;
  password: string;
};

type UserCreate = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCreateSuccess = {
  success: true;
  user: UserCreate;
};

type UserCreateError = {
  success: false;
  error: string;
};

type UserCreateResponse = UserCreateSuccess | UserCreateError;

export const userCreate = async (
  userPayload: UserCreateArgs
): Promise<UserCreateResponse> => {
  const userExistent = await UserModel.findOne({ email: userPayload.email });

  if (userExistent) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const user = await UserModel.create(userPayload);

  return {
    success: true,
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};
