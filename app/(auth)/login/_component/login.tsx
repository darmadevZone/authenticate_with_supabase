"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = async (
    values: z.infer<typeof LoginFormSchema>
  ) => {
    console.log(values);
    setLoading(true);
    try {
      // Login with email and passwordの関数を作成
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        setMessage(`エラーが発生しました: ${error.message} `);
      }
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`エラーが発生しました: ${error.message} + ${error.cause}`);
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
    <div className="container max-w-[500px]  py-4 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            className="rounded-lg border border-gray-300 p-2 w-full"
            placeholder="メールアドレス"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="text-red-500   text-sm">
              {errors.email?.message}
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            className="rounded-lg border border-gray-300 p-2 w-full"
            placeholder="パスワード"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="text-red-500   text-sm">
              {errors.password?.message}
            </div>
          )}
        </div>
        <Button type="submit">Login</Button>
      </form>
      {message && <div>{message}</div>}

      <div className="flex flex-col gap-3">
        <div className="text-green-300 font-bold underline">
          <Link href="/reset-password">パスワードを忘れた方はこちら</Link>
        </div>
        <div className="text-green-300 font-bold underline">
          <Link href="/signup">アカウントを持っていない方はこちら</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
