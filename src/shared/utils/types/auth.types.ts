import { z } from 'zod';
import { PasswordResetFormSchema } from 'shared/utils/validations/password-reset-form-schema';
import { RegistrationFormSchema } from 'shared/utils/validations/registration-form-schema';
import { LoginFormSchema } from 'shared/utils/validations/login-form-schema';
import { RequestPasswordResetFormSchema } from 'shared/utils/validations/request-password-reset-form-schema';
import {guideRegistrationFormSchema} from "shared/utils/validations/guide-registration-form-schema";

export type RequestPasswordResetFormData = z.infer<typeof RequestPasswordResetFormSchema>;

export type RegistrationFormData = z.infer<typeof RegistrationFormSchema>;

export type PasswordResetFormData = z.infer<typeof PasswordResetFormSchema>;

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export type LoginResponse = {
  accessToken: string;
};

export type GuideRegistrationFormData = z.infer<typeof guideRegistrationFormSchema>