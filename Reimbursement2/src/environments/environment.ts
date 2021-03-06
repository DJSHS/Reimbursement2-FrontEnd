// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUri = `http://localhost`;
const port = '8080';
const name = 'reimbursement';

export const environment = {
 
  production: false,
  environmentName: 'Default Environment',
  loginUri: `${baseUri}:${port}/${name}/login/`,
  employeeUri: `${baseUri}:${port}/${name}/employees/`,
  departmentUri: `${baseUri}:${port}/${name}/departments/`,
  reimbursementUri: `${baseUri}:${port}/${name}/reimbursements/`,
  imageUri: `${baseUri}:${port}/${name}/images/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
