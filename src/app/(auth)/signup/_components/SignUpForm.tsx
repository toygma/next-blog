"use client";
import { useTransition } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signUpSchema, SignUpSchemaType } from "@/validation/auth.schema";

const SignUpForm = () => {
  const [formPending, startFormTransition] = useTransition();
  const router = useRouter()
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({ email, password, name }: SignUpSchemaType) {
    startFormTransition(async () => {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/email-verified",
      });
      if (error) {
        toast.error(error.message || "Failed to login. Please try again.");
      }else{
        toast.success("Account created! Please wait, you are being redirected.");
        router.push("/email-verified")
      }
    });
  }
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Sign Up
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Choose your preferred sign-up method
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Google Sign-In Button */}
          {/* <Button
            disabled={googlePending}
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2 font-semibold"
            variant="default"
          >
            {googlePending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <FaGoogle className="size-5" />
                <span>Sign Up with Google</span>
              </>
            )}
          </Button> */}

          {/* "Or" Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
            <span className="mx-4 flex-shrink text-xs uppercase text-slate-500 dark:text-slate-400">
              Or continue with
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* Email Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={formPending}
                className="w-full font-semibold"
              >
                {formPending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Do you have an account?
              <Link href={"/login"} className="underline text-blue-400 px-2 ">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
