export interface IWithCookieCredentials {
  access: string;
  refresh: string;
  removeAccess: Function;
  removeRefresh: Function;
}
