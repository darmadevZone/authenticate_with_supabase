import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Login from "./_component/login";

const LoginPage = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }
  return <Login />;
};

export default LoginPage;
