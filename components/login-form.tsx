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
import { useActionState } from 'react';
import { LoginState, signIn } from '@/app/(auth)/sign-in/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    signIn,
    { success: null, message: '' }
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Film className="mr-2" />
            Welcome
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-500 hover:underline"
                >
                  Forgot my password
                </Link>
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
                    You have successfully logged in.
                  </AlertDescription>
                </Alert>
              )}
              <Button className="w-full">
                {pending && <Loader2 className="animate-spin" />}Sign In
              </Button>
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </div>
        </form>
      </Card>
    </div>
  );
}
