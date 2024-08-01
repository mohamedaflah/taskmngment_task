import { cn } from "@/lib/utils";
import { Loader2Icon, Maximize2, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { columnAddSchema } from "@/lib/Schema/columnadd.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/constants/axios";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addTask } from "@/redux/actions/todo/todo.action";
export function ColumnEditModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [expaned, setExapned] = useState<boolean>(false);
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof columnAddSchema>>({
    resolver: zodResolver(columnAddSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      deadline: new Date(),
      description: "",
      title: "",
    },
  });
  const dispatch = useAppDispatch();
  const handlecolumnAdd = (values: z.infer<typeof columnAddSchema>) => {
    dispatch(
      addTask({
        todoId: values.status,
        task: {
          description: values.description,
          deadline: values.deadline,
          priority: values.priority,
          title: values.title,
        },
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        modalRef.current?.close();
      }
    });
  };
  const [status, setStatus] = useState<{ title: string; _id: string }[] | null>(
    null
  );
  useEffect(() => {
    axiosInstance.get("/api/todo/status").then((res) => {
      setStatus(res.data.statuses);
    });
  }, []);
  const { loading } = useAppSelector((state) => state.task);
  return (
    <>
      <button onClick={() => modalRef?.current?.showModal()}>Edit</button>
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
          <form
            className="w-full min-h-56 mt-5 "
            onSubmit={handleSubmit(handlecolumnAdd)}
          >
            <div className="w-full h-16  flex flex-col">
              <input
                type="text"
                className="w-full h-full bg-transparent text-5xl outline-none"
                placeholder="Title"
                onChange={(e) => {
                  setValue("title", e.target.value);
                  trigger("title");
                }}
              />
              <span className="text-sm text-red-500">
                {errors && errors.title && errors.title?.message}
              </span>
            </div>
            <div className="mt-5 w-full ">
              <div className="flex flex-col gap-1">
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
                    <select
                      className="select   w-full  bg-transparent border-none outline-none"
                      onChange={(e) => {
                        setValue("status", e.target.value);
                        trigger("status");
                      }}
                    >
                      <option disabled selected>
                        not selected
                      </option>
                      {status?.map((status) => (
                        <option key={status?._id} value={status?._id}>
                          {status?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span className="text-sm text-red-500">
                  {errors && errors.status && errors.status?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
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
                    <select
                      className="select  w-full  bg-transparent border-none outline-none"
                      onChange={(e) => {
                        setValue("priority", e.target.value);
                        trigger("priority");
                      }}
                    >
                      <option disabled selected>
                        not selected
                      </option>
                      <option value={"urgent"}>urgent</option>
                      <option value={"medium"}>medium</option>
                      <option value={"low"}>low</option>
                    </select>
                  </div>
                </div>
                <span className="text-sm text-red-500">
                  {errors && errors.priority && errors.priority?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
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
                    <DatePicker
                      className="w-full bg-transparent"
                      selected={watch("deadline")}
                      onChange={(date) => {
                        setValue("deadline", date as Date);
                        trigger("deadline");
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-red-500">
                  {errors && errors.priority && errors.priority?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="mt-5 flex items-start  gap-5 w-full ">
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
                      onChange={(e) => {
                        setValue("description", e.target.value);
                        trigger("description");
                      }}
                      placeholder="not added"
                      className="w-full bg-transparent text-sm flex items-center"
                      id=""
                    ></textarea>
                  </div>
                </div>
                <span className="text-sm text-red-500">
                  {errors && errors.priority && errors.priority?.message}
                </span>
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
              <button
                className={cn(
                  "h-9 flex-center bg-create px-3 rounded-md text-white text-sm",
                  {
                    "pointer-events-none gap-2": loading,
                  }
                )}
              >
                submit
                {loading && (
                  <>
                    <Loader2Icon className="w-5 animate-spin" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
