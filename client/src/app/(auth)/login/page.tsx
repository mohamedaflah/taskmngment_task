"use client";
import { loginSchema } from "@/lib/Schema/Login.schema";
import { userLoginAction } from "@/redux/actions/user/user.action";
import { useAppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const {
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    dispatch(userLoginAction(values)).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        router.push("/");
      }
    });
  };
  return (
    <main className="w-full h-screen overflow-hidden flex-center items-start bg-secondary-gradient">
      <section className="w-[90%] sm:w-[67%] md:w-[48%] lg:w-[38%] h-[420px] mt-20 border border-[#CECECE] rounded-xl bg-auth-sections pt-14 flex flex-col items-center">
        <h1 className="font-bold text-4xl text-black">
          Welcome to <span className="text-forgroundColor-voilet">Workflo</span>
          !
        </h1>
        <form
          className="w-[80%] flex flex-col gap-4 items-center mt-6 "
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={watch("email")}
              onChange={(e) => {
                setValue("email", e.target.value);
                trigger("email");
              }}
              className="w-full h-12 px-3 rounded-md bg-[#EBEBEB]"
              placeholder="email"
            />
            <span className="text-[13px] text-red-600">
              {errors && errors.email && errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col w-full">
            <div className="relative w-full">
              <input
                type="password"
                value={watch("password")}
                onChange={(e) => {
                  setValue("password", e.target.value);
                  trigger("password");
                }}
                className="w-full h-12 px-3 rounded-md bg-[#EBEBEB]"
                placeholder="Enter password"
              />
              <Image
                src={"/icons/eye.svg"}
                alt=""
                width={20}
                height={20}
                className="absolute right-3 top-3"
              />
            </div>
            <span className="text-[13px] text-red-600">
              {errors && errors.password && errors.password?.message}
            </span>
          </div>
          <button
            className="w-full h-12 rounded-md flex-center bg-create text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-6">
          <span className="font-sans ">
            Don’t have an account? Create a{" "}
            <Link href={"/signup"} className="text-[#0054A1]">
              new account
            </Link>
            .
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
