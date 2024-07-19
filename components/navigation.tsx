"use client";

import { Session } from "@supabase/supabase-js";
import Link from "next/link";

function Navigation({ session }: { session: Session | null }) {
  return (
    <header className="container flex flex-col justify-center  shadow-lg shadow-gray-200  h-16">
      <div className="flex items-center justify-between  gap-3">
        <div>
          <Link href="/" className="font-bold text-xl cursor-pointer w-full">
            Supabase Authentication with Next.js Ex
          </Link>
        </div>

        <div className="text-sm items-center space-x-5">
          {session ? (
            <div>
              <div className="flex items-center space-x-5">
                <Link href="setting/profile">プロフィール</Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/login">ログイン</Link>
              <Link href="/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
