export const endpoints = {
  auth: {
    signUp: 'auth/signup',
    login: 'auth/login',
    resetPassword: 'auth/reset-password',
    verifyCaptcha: 'auth/captcha/verify-token',
  },
  directions: 'directions',
  tours: 'tours',
  tourSchedule: 'tour-schedule',
  tourGroup: 'tour-group',
  account: {
    profile: '/account/profile',
    allUsers: '/account/all-users',
    banUser: '/account/ban',
    changeRole: '/account/update-role',
  },
  supportMessage: {
    message: '/support-message',
    updateStatus: '/support-message/status',
    reply: '/support-message/reply',
  },
  ticketTypes: '/ticket-types',
  payment: {
    createCheckoutSession: '/create-checkout-session',
  },
  orders: 'orders',
  guidePermission: {
    request: '/guide-permission',
    updateStatus: '/guide-permission/status',
  }
};
