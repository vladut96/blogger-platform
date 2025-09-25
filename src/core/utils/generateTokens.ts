import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const generateTokens = (
  user: { _id: ObjectId; email: string; login: string },
  deviceId: string,
) => {
  const accessTokenExpiresIn = '300s';
  const refreshTokenExpiresIn = '1440s';

  const accessToken = jwt.sign(
    {
      email: user.email,
      login: user.login,
      userId: user._id.toString(),
    },
    process.env.JWT_SECRET!,
    { expiresIn: accessTokenExpiresIn },
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id.toString(),
      deviceId,
    },
    process.env.JWT_SECRET!,
    { expiresIn: refreshTokenExpiresIn },
  );

  return {
    accessToken,
    refreshToken,
  };
};
