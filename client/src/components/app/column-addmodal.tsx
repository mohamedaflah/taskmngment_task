import { cn } from "@/lib/utils";
import { Maximize2, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";

export function ColumnAddModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [expaned, setExapned] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => modalRef?.current?.showModal()}
        className="h-9 px-2 flex gap-3 create-button text-white items-center rounded-md font-sans "
      >
        Create new
        <div className="bg-white size-5 flex-center rounded-full text-violet-700">
          <Plus className="w-4 text-link" />
        </div>
      </button>
      <dialog
        id="my_modal_4"
        className={cn("modal", {
          "modal modal-bottom sm:modal-middle": !expaned,
        })}
        ref={modalRef}
      >
        <div
          style={{ borderRadius: "6px" }}
          className={cn("modal-box w-11/12 max-w-5xl rounded-sm bg-white", {
            "modal-box rounded-sm bg-white": !expaned,
          })}
        >
          <div className="w-full items-center flex gap-4 justify-between">
            <div className="flex gap-4">
              <X
                className="w-5 cursor-pointer"
                onClick={() => modalRef?.current?.close()}
              />
              <Maximize2
                className="w-5 cursor-pointer rotate-90"
                onClick={() => setExapned(!expaned)}
              />
            </div>
            <div className="flex gap-2">
              <button className="h-9 flex-center rounded-sm bg-forgroundColor-side-button px-4">
                Share
              </button>
              <button className="h-9 flex-center rounded-sm bg-forgroundColor-side-button px-4">
                Favourite
              </button>
            </div>
          </div>
          <form className="w-full min-h-56 mt-5 ">
            <div className="w-full h-16  ">
              <input
                type="text"
                className="w-full h-full bg-transparent text-5xl outline-none"
                placeholder="Title"
              />
            </div>
            <div className="mt-5 w-full ">
              <div className="mt-2 flex items-center gap-5 w-full justify-between ">
                <div className="flex gap-3 w-36 items-center">
                  <Image
                    src={"/icons/status.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Status</span>
                </div>
                <div className="w-full ">
                  <select className="select   w-full  bg-transparent border-none outline-none">
                    <option disabled selected>
                      not selected
                    </option>
                    <option>Game of Thrones</option>
                    <option>Lost</option>
                    <option>Breaking Bad</option>
                    <option>Walking Dead</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-5 w-full ">
                <div className="flex gap-3 w-36 items-center">
                  <Image
                    src={"/icons/priority.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Priority</span>
                </div>
                <div className="w-full">
                  <select className="select  w-full  bg-transparent border-none outline-none">
                    <option disabled selected>
                      not selected
                    </option>
                    <option>Game of Thrones</option>
                    <option>Lost</option>
                    <option>Breaking Bad</option>
                    <option>Walking Dead</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-5 w-full ">
                <div className="flex gap-3 items-center w-36">
                  <Image
                    src={"/icons/deadline.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Deadline</span>
                </div>
                <div className="w-full">
                  <select className="select  w-full  bg-transparent border-none outline-none">
                    <option disabled selected>
                      not selected
                    </option>
                    <option>Game of Thrones</option>
                    <option>Lost</option>
                    <option>Breaking Bad</option>
                    <option>Walking Dead</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-5 w-full ">
                <div className="flex gap-3 items-center w-36">
                  <Image
                    src={"/icons/description.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Description</span>
                </div>
                <div className="w-full">
                  <textarea
                    placeholder="not added"
                    className="w-full bg-transparent text-sm flex items-center"
                    id=""
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 border-b pb-5 flex items-center gap-5 w-full  ">
                <div
                  className="flex gap-3 items-center min-w-36 text-black cursor-pointer"
                  onClick={() =>
                    toast.success("this new feature coming soon 😀😀")
                  }
                >
                  <Image
                    src={"/icons/custom.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Add Custome property</span>
                </div>
              </div>
              <textarea
                placeholder="Start writing, or drag your own files here."
                className="outline-none resize-none mt-4 bg-transparent  flex items-start gap-5 w-full font-sm text-[#C0BDBD] font-light h-28  "
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <button className="h-9 flex-center bg-create px-3 rounded-md text-white text-sm">
                submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
