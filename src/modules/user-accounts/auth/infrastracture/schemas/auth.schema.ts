import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'Device-Session' })
export class DeviceSession {
  @Prop({ type: String, required: true }) userId!: string;
  @Prop({ type: String, required: true }) deviceId!: string;
  @Prop({ type: String, required: true }) lastActiveDate!: string;
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: String, required: true }) ip!: string;
  @Prop({ type: String, required: true }) exp!: string;
}
export type DeviceSessionDocument = HydratedDocument<DeviceSession>;
export const DeviceSessionSchema = SchemaFactory.createForClass(DeviceSession);
