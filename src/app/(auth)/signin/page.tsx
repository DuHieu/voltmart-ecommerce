import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "./SignInForm";

type SignInProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SignIn({ searchParams }: SignInProps) {
  const params = await searchParams;
  const message = params.message ? String(params.message) : null;

  return (
    <div className="bg-background flex min-h-[85vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/80">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-xl shadow-md">
            V
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to VoltMart</CardTitle>
          <CardDescription>
            Enter your credentials to access your account & orders
          </CardDescription>
        </CardHeader>
        <SignInForm message={message} />
      </Card>
    </div>
  );
}
