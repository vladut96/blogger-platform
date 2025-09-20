import { HttpException, HttpStatus } from '@nestjs/common';
import { APIErrorResult, FieldError } from '../types/types';

export class ValidationException extends HttpException {
  constructor(error: FieldError);
  constructor(errors: FieldError[]);

  constructor(errors: FieldError | FieldError[]) {
    const normalized: FieldError[] = Array.isArray(errors) ? errors : [errors];

    const response: APIErrorResult = {
      errorsMessages: normalized,
    };

    super(response, HttpStatus.BAD_REQUEST);
  }
}
