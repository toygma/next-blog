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
  const router = useRouter();
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
        callbackURL: "/email-dogrula",
      });
      if (error) {
        toast.error(error?.message);
      } else {
        // BAŞARI MESAJI ÇEVİRİSİ
        toast.success("Hesap oluşturuldu! Yönlendiriliyorsunuz...");
        router.push("/email-dogrula");
      }
    });
  }
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Kayıt Ol
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tercih ettiğiniz kayıt yöntemini seçin
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adınız Soyadınız</FormLabel>
                    <FormControl>
                      <Input placeholder="Mehmet Yılmaz" {...field} />
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifreyi Onayla</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifreyi tekrarla"
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
                    <span>Hesap Oluşturuluyor...</span>
                  </>
                ) : (
                  <span>Hesap Oluştur</span>
                )}
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Zaten bir hesabınız var mı?
              <Link
                href={"/giris-yap"}
                className="underline text-blue-400 px-2 "
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;