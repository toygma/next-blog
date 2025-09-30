import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ResendVerificationButton } from "./_components/ResendVerificationButton";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "E-posta Doğrula",
};

export default async function VerifyEmailPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (user?.emailVerified) {
    toast.success("E-postanız zaten doğrulanmış.");
    return redirect("/");
  }

  if (!user) {
    return redirect("/");
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <div
        className="space-y-6 border border-slate-200 dark:border-slate-800 rounded-lg p-8 w-full max-w-md 
text-center"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold ">E-postanızı doğrulayın</h1>
          <p className="text-muted-foreground ">
            Gelen kutunuza bir doğrulama e-postası gönderildi.
          </p>
        </div>
        <ResendVerificationButton email={user.email} />
      </div>
    </main>
  );
}