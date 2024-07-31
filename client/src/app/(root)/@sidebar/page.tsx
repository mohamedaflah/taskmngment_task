"use client";
import { TaskTitleAddModal } from "@/components/app/todotitle-addmodal";
import { Navigations } from "@/constants/navigations";
import { cn } from "@/lib/utils";
import { userlogoutAction } from "@/redux/actions/user/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Plus } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import React from "react";
const SideBar = () => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <aside className="sticky top-0 left-0 w-56 border p-3 flex flex-col justify-between bg-white">
      <main>
        <div className="flex w-full items-center gap-2">
          <Image
            src={"/images/women-image.jfif"}
            alt=""
            width={28}
            height={20}
            className="rounded-md object-cover size-8"
          />
          <h1 className="font-medium font-sans text-forgroundColor-black text-[17px]">
            {user?.name}
          </h1>
        </div>
        <div className="flex justify-between w-full mt-2 items-center">
          <div className="flex gap-3">
            <div>
              <Image
                alt=""
                width={23}
                height={23}
                src={"/icons/Notification.svg"}
              />
            </div>
            <div>
              <Image alt="" width={23} height={23} src={"/icons/mode.svg"} />
            </div>
            <div>
              <Image
                alt=""
                width={23}
                height={23}
                src={"/icons/collapse.svg"}
              />
            </div>
          </div>
          <div className="">
            <button
              className="h-9 px-2 font-medium flex-center bg-forgroundColor-side-button rounded-sm"
              onClick={() => {
                dispatch(userlogoutAction()).then((res) => {
                  if (res.type.endsWith("fulfilled")) {
                    router.push("/login");
                  }
                });
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col mt-3 gap-2">
          {Navigations.map(({ iconpath, id, title, path }) => (
            <div
              key={id}
              className={cn(
                "w-full cursor-pointer h-9 flex items-center px-2 gap-3",
                {
                  "bg-forgroundColor-side-button rounded-md border border-[#DDDDDD]":
                    pathname == path,
                }
              )}
            >
              <Image alt="" width={23} height={23} src={iconpath} />{" "}
              <span>{title}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 mx-auto">
          <TaskTitleAddModal />
        </div>
      </main>
      <div className="h-20  w-full">
        <div className="h-14 flex items-center bg-forgroundColor-kanbanbox py-1 px-3 rounded-md bg-buttonBg-side-button">
          <div>
            <Image
              alt="Load"
              width={29}
              height={29}
              src={"/icons/down-load.svg"}
            />{" "}
          </div>
          <div className="h-full flex flex-col">
            <h1 className="font-semibold ">Download the app</h1>
            <span className="text-[12px] font-sans">
              Get the full experience{" "}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
