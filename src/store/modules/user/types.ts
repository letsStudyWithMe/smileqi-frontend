export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  userAccount?: string;
  userAvatar?: string;
  userName?: string;
  userRole: RoleType;
}
