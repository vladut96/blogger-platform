import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const generateTokens = (
  user: { _id: ObjectId; email: string; login: string },
  deviceId: string,
) => {
  const accessTokenExpiresIn = '1000000s';
  const refreshTokenExpiresIn = '20s';

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
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: refreshTokenExpiresIn },
  );

  return {
    accessToken,
    refreshToken,
  };
};
