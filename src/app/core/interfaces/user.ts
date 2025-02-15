export interface User {
  id: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  nationality: string;
  joinDate: string;
  licenseExpirationDate: string;
}
export interface UpdateUserVM {
  username: string;
  firstName: string;
  lastName: string;
  nationality: string;
}
