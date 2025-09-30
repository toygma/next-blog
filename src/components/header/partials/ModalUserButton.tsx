"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";

const ModalUserButton = () => {
  const { data: session } = authClient.useSession();

  async function handleLogout() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.message("Failed to logout. Please try again.");
    } else {
      toast.message("Successfully logged out.");
    }
  }

  return (
    <div className="flex items-center gap-4 px-4">
      {/* avatar signed in */}
      {session?.user?.role === "admin" && (
        <Link href={"/admin/dashboard"}>
          <Button type="button" className="block w-full text-left px-3 py-2 ">
            Admin Panel
          </Button>
        </Link>
      )}
      {session ? (
       <>
       <p>Hoş geldin, {session?.user?.name}</p>
        <Button
          onClick={handleLogout}
          type="button"
          variant="destructive"
          className="text-sm h-9 px-4 rounded-md border-red-300 hover:bg-red-500"
        >
          Çıkış Yap
        </Button>
       </>
      ) : (
        <Link href={"/giris-yap"}>
          <Button
            type="button"
            variant="outline"
            className="text-sm h-9 px-4 rounded-md border-gray-300 hover:bg-gray-50"
          >
            Giriş Yap
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ModalUserButton;
