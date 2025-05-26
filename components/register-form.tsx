'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Film, Loader2, MessageCircle } from 'lucide-react';
import { useActionState, useState } from 'react';
import signUp, { RegisterState } from '@/app/(auth)/sign-up/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    signUp,
    { success: null, message: '' }
  );
  const [password, setPassword] = useState('');
  const hasEightChars = password.length >= 8;
  const startsWithUpper = /^[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const isPasswordValid =
    hasEightChars && startsWithUpper && hasNumber && hasSpecialChar;

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Film className="mr-2" />
            Create Account
          </CardTitle>
          <CardDescription>
            Sign up now and dive into our exclusive Movie Stills collection
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <div className="space-y-4">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirm Email</Label>
                <Input
                  id="confirmEmail"
                  name="confirmEmail"
                  type="email"
                  placeholder="Confirm your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <div className="flex flex-col gap-1 text-xs">
                  <span
                    className={
                      hasEightChars ? 'text-green-500' : 'text-gray-500'
                    }
                  >
                    Must contain at least 8 characters
                  </span>
                  <span
                    className={
                      startsWithUpper ? 'text-green-500' : 'text-gray-500'
                    }
                  >
                    Must start with an uppercase letter
                  </span>
                  <span
                    className={hasNumber ? 'text-green-500' : 'text-gray-500'}
                  >
                    Must include at least one number
                  </span>
                  <span
                    className={
                      hasSpecialChar ? 'text-green-500' : 'text-gray-500'
                    }
                  >
                    Must include at least one special character (!@#$%^&*)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {state.success === false && (
                <Alert className="text-muted-foreground">
                  <MessageCircle className="h-4 w-4 !text-red-600" />
                  <AlertTitle className="text-gray-50">Error!</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              {state.success === true && (
                <Alert className="text-muted-foreground">
                  <MessageCircle className="h-4 w-4 !text-green-600" />
                  <AlertTitle className="text-gray-50">Success!</AlertTitle>
                  <AlertDescription>
                    You have successfully registered. Please check your email to
                    verify your account.
                  </AlertDescription>
                </Alert>
              )}
              <Button
                className="w-full"
                type="submit"
                disabled={!isPasswordValid}
              >
                {pending && <Loader2 className="animate-spin" />}Sign Up
              </Button>
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </div>
        </form>
      </Card>
    </div>
  );
}
