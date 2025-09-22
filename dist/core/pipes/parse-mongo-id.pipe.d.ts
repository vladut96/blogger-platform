import { PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
export declare class ParseMongoIdPipe implements PipeTransform<string, Types.ObjectId> {
    transform(value: string): Types.ObjectId;
}
