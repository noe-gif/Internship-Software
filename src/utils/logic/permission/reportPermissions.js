import { VIEW_REPORT_PERMISSION } from 'src/constants/permission/permissions';

export const isUserAllowedToOpenReport = (userPermissions) => ( //eslint-disable-line
  userPermissions.includes(VIEW_REPORT_PERMISSION)
);
