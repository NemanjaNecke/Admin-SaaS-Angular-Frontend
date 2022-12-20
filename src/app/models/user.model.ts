


export interface UserResponse {
    "access_token": string,
    "refresh_token": string,
    "user": {
        "pk": number,
        "email": string,
        "first_name": string,
        "last_name": string
        "ip_address": string[]
        "company": Company
    }
}


export interface DecodedToken {
    'exp': number;
    'username': string;
  }

export class DecodedToken{};

export interface User{
    'id': number;
    'url': string;
    'username': string;
    'email': string;
    'is_staff': boolean;
    'first_name': string;
    'last_name': string;
    'company': Company;
}

export interface Company {
    "id": string,
    "name": string,
    "admin": string,
    "active_until": Date,
    "is_active": boolean,
    "accounts": User['id'][
    ]
}

export interface Admin {
    "email": string,
    "first_name": string,
    "last_name": string,
}

export interface Invites  {
    "id": string,
    "email": string,
    "invited_by": string,
    "accepted": boolean,
    "used": boolean
}

export interface IpAddress {
    "id": string,
    "ip_address": string,
    "verified": boolean,
    "account": string
}