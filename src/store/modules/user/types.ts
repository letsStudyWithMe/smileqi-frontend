export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  userAccount?: string;
  userAvatar?: string;
  userName?: string;
  userRole: RoleType;
  // organization?: string;
  // location?: string;
  // email?: string;
  // introduction?: string;
  // personalWebsite?: string;
  // jobName?: string;
  // organizationName?: string;
  // locationName?: string;
  // phone?: string;
  // registrationDate?: string;
  // accountId?: string;
  // certification?: number;

}
