
export interface IUser {
    uid      : string;
    name     : string;
    email    : string;
    password?: string;
    role     : string;

    createdAt?: string;
    updatedAt?: string;
}