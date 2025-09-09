import { HttpException, HttpStatus } from '@nestjs/common';
import { APIErrorResult, FieldError } from '../types/types';

export class ValidationException extends HttpException {
  constructor(errors: FieldError[]) {
    const response: APIErrorResult = {
      errorsMessages: errors,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}
