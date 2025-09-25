import { PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { FieldError } from '../types/types';
import { ValidationException } from '../exceptions/custom-validation.exception';

export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      const errors: FieldError[] = [
        {
          message: 'Invalid MongoDB ID format',
          field: 'id',
        },
      ];
      throw new ValidationException(errors);
    }
    return value;
  }
}
