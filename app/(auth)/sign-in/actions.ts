'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export type LoginState = {
  success: null | boolean;
  message?: string;
};

export async function signIn(previousState: LoginState, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) return { success: false, message: error.message };

  return redirect('/home');
}
