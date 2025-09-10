import { Paginator, UserInputModel, UserViewModel } from '../../../core/types/types';
import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { QueryUsersDto } from '../dto/query-users.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(query: QueryUsersDto): Promise<Paginator<UserViewModel>>;
    createUser(userDTO: UserInputModel): Promise<{
        id: string;
        login: string;
        email: string;
        createdAt: string;
    }>;
    deleteUserById(userId: string): Promise<void>;
}
