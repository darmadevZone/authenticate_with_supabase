import { createClient } from "@/utils/supabase/server";

const Home = async () => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="container flex-1 w-full flex flex-col items-center justify-center ">
      {session ? <div>Home</div> : <div>Loginしていません</div>}
    </div>
  );
};

export default Home;
