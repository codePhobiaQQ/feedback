import { Model } from 'sequelize-typescript';
import { Role } from '../roles/role.module';
interface UserCreationAttributes {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    name: string;
    banReason: string;
    roles: Role[];
}
export {};
