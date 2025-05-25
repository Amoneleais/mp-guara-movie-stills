'use server';

import { createClient } from '@/utils/supabase/server';

export type RegisterState = {
  success: null | boolean;
  message?: string;
};

export default async function signUp(
  previousState: RegisterState,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const confirmEmail = formData.get('confirmEmail') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (email !== confirmEmail)
    return { success: false, message: 'Emails do not match' };
  if (password !== confirmPassword)
    return { success: false, message: 'Passwords do not match' };

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) return { success: false, message: error.message };

  return { success: true, message: 'Signed up successfully' };
}
