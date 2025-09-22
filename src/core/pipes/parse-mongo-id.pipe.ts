import { PipeTransform } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
import { FieldError } from '../types/types';
import { ValidationException } from '../exceptions/custom-validation.exception';

export class ParseMongoIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string): Types.ObjectId {
    if (!isValidObjectId(value)) {
      const errors: FieldError[] = [
        {
          message: 'Invalid MongoDB ID format',
          field: 'id',
        },
      ];
      throw new ValidationException(errors);
    }
    return new Types.ObjectId(value);
  }
}
