import { HttpException } from '@nestjs/common';
import { FieldError } from '../types/types';
export declare class ValidationException extends HttpException {
    constructor(errors: FieldError[]);
}
