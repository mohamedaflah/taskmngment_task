import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <main className="w-full h-screen overflow-hidden flex-center items-start bg-secondary-gradient">
      <section className="w-[90%] sm:w-[67%] md:w-[48%] lg:w-[38%] pb-10 min-h-[420px] mt-20 border border-[#CECECE] rounded-xl bg-auth-sections pt-14 flex flex-col items-center">
        <h1 className="font-bold text-4xl text-black">
          Welcome to <span className="text-forgroundColor-voilet">Workflo</span>
          !
        </h1>
        <div className="w-[80%] flex flex-col gap-4 items-center mt-6 ">
          <input
            type="text"
            className="w-full h-12 px-3 rounded-md bg-[#EBEBEB]"
            placeholder="username"
          />
          <input
            type="email"
            className="w-full h-12 px-3 rounded-md bg-[#EBEBEB]"
            placeholder="email"
          />
          <div className="relative w-full">
            <input
              type="password"
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
          <button className="w-full h-12 rounded-md flex-center bg-create text-white">
            Signup
          </button>
        </div>
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
