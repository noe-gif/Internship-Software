import { isUserAllowedToOpenReport } from 'src/utils/logic/permission/reportPermissions';

describe('reportPermissions utils', () => {
  describe('isUserAllowedToOpenReport Function', () => {
    it ('should return true when userPermission contain the view report permission', () => {
      const userPermissions = [
        "tarmac.delete_turnaroundclosereportformat",
        "tarmac.view_turnaroundclosereportformat",
        "tarmac.change_turnaroundclosereportformat",
        "tarmac.add_turnaroundclosereportformat",
      ];
      
      const isUserAllowed = isUserAllowedToOpenReport(userPermissions);

      expect(isUserAllowed).toBeTruthy();
    });

    it ('should return false when userPermission do not contain the view report permission', () => {
      const userPermissions = [
        "tarmac.delete_turnaroundclosereportformat",
        "tarmac.change_turnaroundclosereportformat",
        "tarmac.add_turnaroundclosereportformat",
      ];
      
      const isUserAllowed = isUserAllowedToOpenReport(userPermissions);

      expect(isUserAllowed).toBeFalsy();
    });
  });
});
