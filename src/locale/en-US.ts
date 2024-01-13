import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeUser from '@/views/sysmanagement/sysuser/locale/en-US';
import localeMenu from '@/views/sysmanagement/sysmenu/locale/en-US';
import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'menu.sys.management': 'System Management',
  'menu.user.setting': 'User Setting',
  'menu.user.central': 'User Central',
  ...localeSettings,
  ...localeUser,
  ...localeMenu,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
};
