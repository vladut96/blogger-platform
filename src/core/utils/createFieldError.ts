import { FieldError } from '../types/types';

export function createFieldError(message: string, field: string): FieldError {
  return { message, field };
}
