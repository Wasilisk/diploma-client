import { $api } from 'shared/configs/axios-config';
import {
  LoginFormData,
  LoginResponse,
  PasswordResetFormData,
  RegistrationFormData,
  RequestPasswordResetFormData,
} from 'shared/utils/types';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';

export class AuthService {
  static async signup(data: RegistrationFormData) {
    return $api.post(endpoints.auth.signUp, data);
  }

  static async login(data: LoginFormData): Promise<AxiosResponse<LoginResponse>> {
    return $api.post(endpoints.auth.login, data);
  }

  static async checkResetPasswordToken(token: string) {
    return $api.get(`${endpoints.auth.resetPassword}/${token}`);
  }

  static async resetPasswordRequest(data: RequestPasswordResetFormData) {
    return $api.post(endpoints.auth.resetPassword, data);
  }

  static async resetPassword(token: string, data: PasswordResetFormData) {
    return $api.post(`${endpoints.auth.resetPassword}/${token}`, data);
  }

  static async verifyCaptcha(token: string) {
    return $api.post(`${endpoints.auth.verifyCaptcha}/${token}`);
  }
}
