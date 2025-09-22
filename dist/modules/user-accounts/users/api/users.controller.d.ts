import { CreateUserDto } from '../dto/create-user.dto';
import { QueryUsersDto } from '../dto/query-users.dto';
import { UsersService } from '../application/users.service';
import { UserID } from '../../../../core/types/types';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(query: QueryUsersDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").UserViewModel>>;
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        login: string;
        email: string;
        createdAt: string;
    }>;
    deleteUserById(_id: UserID): Promise<void>;
}
