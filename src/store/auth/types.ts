export interface Profile {
  id: string;
  email: string;
  /* eslint-disable-next-line camelcase */
  given_name: string;
  /* eslint-disable-next-line camelcase */
  family_name: string;
  name: string;
  picture: string;
  /* eslint-disable-next-line camelcase */
  email_verified: boolean;
}

export const TYPES = {
  setIsAuthenticated: 'AUTH_IS_AUTHENTICATED_SET',
  setAuthenticatedUser: 'AUTH_AUTHENTICATED_USER_SET',
}
