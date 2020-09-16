export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
}

export const TYPES = {
  setIsAuthenticated: 'AUTH_IS_AUTHENTICATED_SET',
  setAuthenticatedUser: 'AUTH_AUTHENTICATED_USER_SET',
}
