import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'Users' })
export class User {
  @Prop({ type: String, unique: true, index: true })
  login!: string;

  @Prop({ type: String, unique: true, index: true })
  email!: string;

  @Prop({ type: String, required: true })
  passwordHash!: string;

  @Prop({ type: String, required: true })
  createdAt!: string;

  @Prop({
    type: {
      confirmationCode: { type: String, default: null },
      expirationDate: { type: Date, default: null },
      isConfirmed: { type: Boolean, default: false },
    },
    required: true,
  })
  emailConfirmation!: {
    confirmationCode: string | null;
    expirationDate: Date | null;
    isConfirmed: boolean;
  };

  @Prop({
    type: {
      recoveryCode: { type: String, default: null },
      expirationDate: { type: Date, default: null },
    },
    default: { recoveryCode: null, expirationDate: null },
  })
  passwordRecovery!: {
    recoveryCode: string | null;
    expirationDate: Date | null;
  };
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
