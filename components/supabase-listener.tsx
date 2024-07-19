import { createClient } from "@/utils/supabase/server";
import Navigation from "./navigation";

interface SupabaseListenerProps {
  children: React.ReactNode;
}

const SupbaseListener = async ({ children }: SupabaseListenerProps) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <Navigation session={session} />
      {children}
    </>
  );
};

export default SupbaseListener;
