export enum ApiPaths {
  companies = 'companies/',
  invites = 'invites/',
  adminusers = 'auth/accounts/admin/',
  allUsers = 'auth/accounts/all/',
  ipAddress = 'auth/ip-address',
  account = 'auth/accounts/account/',
  task = 'tasks/',
  analytcis = 'tasks/analytics'
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
    refreshPass = 'auth/password/change/',
    resetPass = 'auth/password/reset/',
    resetPassConfirm = 'auth/password/reset/confirm/'
  }
  export const environment = {
    production: false,
    baseUrl: 'https://nemanjacone.pythonanywhere.com/', 
    apipaths: ApiPaths,
    registrationpaths: RegistrationPaths,
    loginpaths: LoginPaths
  };
  