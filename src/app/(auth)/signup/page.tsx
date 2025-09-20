import { getServerSession } from "@/lib/get-session";
import SignUpForm from "./_components/SignUpForm";
import { redirect } from "next/navigation";

const Signup = async () => {
    const session = await getServerSession();

  if(session?.user){
    return redirect("/")
  }
  
  return <SignUpForm />;
};

export default Signup;
