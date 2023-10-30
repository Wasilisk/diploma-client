import { $api } from 'shared/configs/axios-config';
import {
  LoginFormData,
  LoginResponse,
  PasswordResetFormData,
  RegistrationFormData,
  RequestPasswordResetFormData,
} from 'shared/utils/types';
import { AxiosResponse } from 'axios';

export class AuthService {
  static async signup(data: RegistrationFormData) {
    return $api.post('auth/signup', data);
  }

  static async login(data: LoginFormData): Promise<AxiosResponse<LoginResponse>> {
    return $api.post('auth/login', data);
  }

  static async checkResetPasswordToken(token: string) {
    return $api.get(`auth/reset-password/${token}`);
  }

  static async resetPasswordRequest(data: RequestPasswordResetFormData) {
    return $api.post('auth/reset-password', data);
  }

  static async resetPassword(token: string, data: PasswordResetFormData) {
    return $api.post(`auth/reset-password/${token}`, data);
  }

  static async verifyCaptcha(token: string) {
    return $api.post(`auth/captcha/verify-token/${token}`);
  }
}
