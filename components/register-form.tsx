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
import signUp, { RegisterState } from '@/app/(auth)/register/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    signUp,
    { success: null, message: '' }
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Film className="mr-2" />
            Register
          </CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirm Email</Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="Confirm your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </form>
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
          <Button className="w-full" type="submit">
            Register
          </Button>
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              {pending && <Loader2 className="animate-spin" />}Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
