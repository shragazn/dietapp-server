export const isAuthorized = (allowedRoles: string[], userRoles: string[]) => {
  return allowedRoles.some((role) => userRoles.includes(role));
};
