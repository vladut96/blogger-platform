import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
class EmailConfirmation {
  @Prop({ type: String, default: null }) confirmationCode!: string | null;
  @Prop({ type: Date, default: null }) expirationDate!: Date | null;
  @Prop({ type: Boolean, required: true }) isConfirmed!: boolean;
}

@Schema({ _id: false })
class PasswordRecovery {
  @Prop({ type: String, default: null }) recoveryCode!: string | null;
  @Prop({ type: Date, default: null }) expirationDate!: Date | null;
}

@Schema({ collection: 'Users' })
export class User {
  @Prop({ type: String, unique: true, index: true }) login!: string;
  @Prop({ type: String, unique: true, index: true }) email!: string;
  @Prop({ type: String, required: true }) passwordHash!: string;
  @Prop({ type: String, required: true }) createdAt!: string;

  @Prop({ type: EmailConfirmation, required: true })
  emailConfirmation!: EmailConfirmation;

  @Prop({
    type: PasswordRecovery,
    default: () => ({ recoveryCode: null, expirationDate: null }),
  })
  passwordRecovery!: PasswordRecovery;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
