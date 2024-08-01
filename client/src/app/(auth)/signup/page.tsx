"use client";
import { signupFormSchema } from "@/lib/Schema/Signup.schema";
import { cn } from "@/lib/utils";
import { userSignupAction } from "@/redux/actions/user/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOffIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const Signup = () => {
  const {
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignup = (values: z.infer<typeof signupFormSchema>) => {
    dispatch(userSignupAction(values)).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        router.replace("/");
      }
    });
  };
  const [showPass, setShowPass] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.user);
  return (
    <main className="w-full h-screen overflow-hidden flex-center items-start bg-secondary-gradient">
      <section className="w-[90%] sm:w-[67%] md:w-[48%] lg:w-[38%] pb-10 min-h-[420px] mt-20 border border-[#CECECE] rounded-xl bg-auth-sections pt-14 flex flex-col items-center">
        <h1 className="font-bold text-4xl text-black">
          Welcome to <span className="text-forgroundColor-voilet">Workflo</span>
          !
        </h1>
        <form
          className="w-[80%] flex flex-col gap-4 items-center mt-6 "
          onSubmit={handleSubmit(handleSignup)}
        >
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={watch("name")}
              onChange={(e) => {
                setValue("name", e.target.value);
                trigger("name");
              }}
              className="w-full h-12 px-3 rounded-md bg-[#EBEBEB]"
              placeholder="username"
            />
            <span className="text-[13px] text-red-600">
              {errors && errors.name && errors.name?.message}
            </span>
          </div>
          <div className="flex flex-col w-full">
            <input
              type="email"
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
                type={!showPass ? "password" : "text"}
                value={watch("password")}
                onChange={(e) => {
                  setValue("password", e.target.value);
                  trigger("password");
                }}
                className="w-full h-12 px-3 rounded-md bg-[#EBEBEB]"
                placeholder="Enter password"
              />
              {!showPass ? (
                <>
                  <Image
                    src={"/icons/eye.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                </>
              ) : (
                <>
                  <EyeOffIcon
                    className="w-4 absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                </>
              )}
            </div>
            <span className="text-[13px] text-red-600">
              {errors && errors.password && errors.password?.message}
            </span>
          </div>
          <button
            className={cn(
              "w-full h-12 rounded-md flex-center bg-create text-white gap-2",
              {
                "pointer-events-none": loading,
              }
            )}
            type="submit"
          >
            Signup
            {loading && <>
            <LoaderCircle className="w-5 animate-spin"/></>}
          </button>
        </form>
        <div className="mt-6">
          <span className="font-sans font-med ">
            Already have an account?{" "}
            <Link href={"/login"} className="text-[#0054A1]">
              Log in
            </Link>
            .
          </span>
        </div>
      </section>
    </main>
  );
};

export default Signup;
