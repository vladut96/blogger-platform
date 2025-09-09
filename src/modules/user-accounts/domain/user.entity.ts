import {
  EmailConfirmation,
  UserDBModel,
  UserInputModel,
  UserToPersistence,
} from '../../../core/types/types';
import { EmailConfirmationFactory } from '../infrastructure/email-confirmation-code-generator';
import { hashPassword } from '../infrastructure/passwordUtils';

export class UserEntity {
  constructor(
    public readonly id: string | null,
    public readonly login: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly emailConfirmation: EmailConfirmation,
    public readonly passwordRecovery: {
      recoveryCode: string | null;
      expirationDate: Date | null;
    },
    public readonly createdAt: string,
  ) {}

  static fromPersistence(persisted: UserDBModel): UserEntity {
    return new UserEntity(
      persisted._id.toString(),
      persisted.login,
      persisted.email,
      persisted.passwordHash,
      persisted.emailConfirmation,
      persisted.passwordRecovery,
      persisted.createdAt || new Date().toISOString(),
    );
  }

  static async create(dto: UserInputModel): Promise<UserEntity> {
    const passwordHash = await hashPassword(dto.password);
    return new UserEntity(
      null,
      dto.login,
      dto.email,
      passwordHash,
      EmailConfirmationFactory.createDefault(),
      { recoveryCode: null, expirationDate: null },
      new Date().toISOString(),
    );
  }
  static async register(dto: UserInputModel): Promise<UserEntity> {
    const passwordHash = await hashPassword(dto.password);
    return new UserEntity(
      null,
      dto.login,
      dto.email,
      passwordHash,
      EmailConfirmationFactory.create(),
      { recoveryCode: null, expirationDate: null },
      new Date().toISOString(),
    );
  }

  toViewModel() {
    if (!this.id) {
      throw new Error('UserEntity.toViewModel called without persisted id');
    }
    return {
      id: this.id,
      login: this.login,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
  toPersistence(): UserToPersistence {
    return {
      login: this.login,
      email: this.email,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      emailConfirmation: this.emailConfirmation,
      passwordRecovery: this.passwordRecovery,
    };
  }
}
