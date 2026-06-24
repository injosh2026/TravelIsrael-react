export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User'; // 'Admin' for admin, 'User' for regular user
};