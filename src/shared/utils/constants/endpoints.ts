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
  },
  supportMessage: '/support-message',
  ticketTypes: '/ticket-types',
  payment: {
    createCheckoutSession: '/payment/create-checkout-session',
  },
};
