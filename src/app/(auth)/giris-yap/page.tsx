import { getServerSession } from "@/lib/get-session";
import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();

  if(session?.user){
    return redirect("/")
  }
  

  return <LoginForm />;
};

export default Login;
