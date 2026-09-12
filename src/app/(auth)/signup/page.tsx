import SignUpForm from "./SignUpForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SignUp() {
  return (
    <div className="bg-background flex min-h-[85vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/80">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 text-white font-black text-xl shadow-md">
            V
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create VoltMart Account</CardTitle>
          <CardDescription>
            Join to unlock saved addresses, order tracking, and member warranty
          </CardDescription>
        </CardHeader>
        <SignUpForm />
      </Card>
    </div>
  );
}
