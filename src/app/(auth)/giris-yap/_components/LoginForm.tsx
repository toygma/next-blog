"use client";
import { useTransition } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { signInSchema, SignInSchemaType } from "@/validation/auth.schema";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [formPending, startFormTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit({ email, password, rememberMe }: SignInSchemaType) {
    startFormTransition(async () => {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });
      if (error) {
        toast.error(error.message || "Giriş yapılamadı. Lütfen tekrar deneyin.");
      } else {
        toast.success("Başarıyla giriş yapıldı!");
        router.refresh();
        router.push("/");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Giriş Yap
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tercih ettiğiniz giriş yöntemini seçin
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
            <span className="mx-4 flex-shrink text-xs uppercase text-slate-500 dark:text-slate-400">
              Veya devam et
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="senin@eposta.com"
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
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Beni hatırla</FormLabel>
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
                    <span>Yükleniyor...</span>
                  </>
                ) : (
                  <span>Giriş Yap</span>
                )}
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Hesabınız yok mu?
              <Link href={"/kayit-ol"} className="underline text-blue-400 px-2 ">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;