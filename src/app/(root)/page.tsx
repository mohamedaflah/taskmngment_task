import { LandingTopCard } from "@/components/app/landing-topcard";
import { Menu, Plus } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto flex-1 p-3 ">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold text-4xl text-forgroundColor-black">
          Good morning, Joe!
        </h1>
        <div className="flex gap-1 items-center text-forgroundColor-black">
          <span>Help and feedback</span>
          <Image alt="" width={23} height={23} src={"/icons/question.svg"} />
        </div>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-2 mt-3">
        <LandingTopCard
          title="Introduce tag"
          imagePath="/images/intro.svg"
          descriptioin="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
        />
        <LandingTopCard
          title="Share Notes Instantly"
          imagePath="/images/share-link.svg"
          descriptioin="Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
        />
        <LandingTopCard
          title="Access Anywhere"
          imagePath="/images/access.svg"
          descriptioin="Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
        />
      </div>
      <div className="mt-4 w-full flex justify-between flex-wrap">
        <div>
          <div className="flex px-3 h-8 w-56 rounded-md border bg-white justify-between">
            <input
              type="search"
              className="w-full h-full outline-none text-sm"
              placeholder="Search"
            />
            <Image width={20} height={20} alt="" src={"/icons/find.svg"} />
          </div>
        </div>
        <Menu className="lg:hidden" />
        <div className=" gap-3 hidden lg:flex">
          <button className="h-9 px-2 flex gap-3 bg-buttonBg-side-button items-center rounded-md font-sans">
            Calender view
            <Image width={20} height={20} alt="" src={"/icons/calendar.svg"} />
          </button>
          <button className="h-9 px-2 flex gap-3 bg-buttonBg-side-button items-center rounded-md font-sans">
            Automation
            <Image
              width={20}
              height={20}
              alt=""
              src={"/icons/automation.svg"}
            />
          </button>
          <button className="h-9 px-2 flex gap-3 bg-buttonBg-side-button items-center rounded-md font-sans">
            Filter
            <Image width={20} height={20} alt="" src={"/icons/filter.svg"} />
          </button>
          <button className="h-9 px-2 flex gap-3 bg-buttonBg-side-button items-center rounded-md font-sans">
            share
            <Image width={20} height={20} alt="" src={"/icons/send.svg"} />
          </button>
          <button className="h-9 px-2 flex gap-3 create-button text-white items-center rounded-md font-sans ">
            Create new
            <div className="bg-white size-5 flex-center rounded-full text-violet-700">
              <Plus className="w-4 text-link" />
            </div>
          </button>
        </div>
        <main className="w-full min-h-56 rounded-sm mt-4 bg-white overflow-x-auto flex whitespace-nowrap gap-3 p-3">
          <div className="min-w-56 max-w-56 gap-3 flex flex-col ">
            <div className="w-full flex justify-between">
              <span>To do</span>
              <Image width={20} height={20} alt="" src={"/icons/menu.svg"} />
            </div>
            <div className="w-full border rounded-md  bg-forgroundColor-kanbanbox h-56 p-3 flex flex-col gap-3">
              <div className="text-wrap">
                <h3 className="text-[15px] text-[#606060] leading-5">
                  Implement User Authentication
                </h3>
                <p className="text-[13px] text-[#797979] mt-1 leading-4">
                  Develop and integrate user authentication using email and
                  password.
                </p>
              </div>
              <div>
                <div className="urgent inline-block text-white text-[13px] py-1 font-[400]">
                  urgent
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  alt=""
                  src={"/icons/time-pick.svg"}
                />
                <span className="text-sm">2024-08-15</span>
              </div>
              <div>
                <span className="text-sm">1 hr ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
