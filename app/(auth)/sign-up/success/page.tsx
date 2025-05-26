import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              Welcome to ‎ <p className="underline">Guara Movie Stills</p>
            </CardTitle>
            <CardDescription>
              Please check your inbox and verify your email address to complete
              the registration process.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center space-y-4"></CardContent>
          <CardFooter className="space-y-4">
            <Link href={'/sign-in'} className="underline">
              Return to login page
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
