export const endpoints = {
  auth: {
    signUp: 'auth/signup',
    login: 'auth/login',
    resetPassword: 'auth/reset-password',
    verifyCaptcha: 'auth/captcha/verify-token',
  },
  directions: 'directions',
  tours: 'tours',
  account: {
    profile: '/account/profile',
    allUsers: '/account/all-users',
    banUser: '/account/ban',
    changeRole: '/account/update-role',
  },
  supportMessage: '/support-message',
  ticketTypes: '/order-types',
  payment: {
    createCheckoutSession: '/create-checkout-session',
  },
  orders: 'orders',
};
