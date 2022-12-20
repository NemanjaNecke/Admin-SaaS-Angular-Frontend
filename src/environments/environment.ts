export enum ApiPaths {
  companies = 'companies/',
  invites = 'invites/',
  adminusers = 'auth/accounts/admin/',
  ipAddress = 'auth/ip-address'
  }
  
  export enum RegistrationPaths {
    registration = 'auth/register/',
    admin = 'auth/register/admin/'
  }
  
  export enum LoginPaths {
    login = 'auth/login/',
    logout = 'auth/logout/',
    verifyToken = 'auth/token/verify/',
    refreshToken = 'auth/token/refresh/',
    refreshPass = 'auth/password/change/'
  }
  export const environment = {
    production: false,
    baseUrl: 'http://127.0.0.1:8000/', 
    apipaths: ApiPaths,
    registrationpaths: RegistrationPaths,
    loginpaths: LoginPaths
  };
  