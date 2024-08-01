import { cn } from "@/lib/utils";
import { Maximize2, Plus, X } from "lucide-react";

import { useRef, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/redux/store";
import { addTodo } from "@/redux/actions/todo/todo.action";
import { titleSchema } from "@/lib/Schema/titleadd.schema";
export function TaskTitleAddModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [expaned, setExapned] = useState<boolean>(false);
  const {
    setValue,
    formState: { errors },
    watch,
    trigger,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
    },
  });
  const dispatch = useAppDispatch();
  const handleTitleAdd = (values: z.infer<typeof titleSchema>) => {
    dispatch(addTodo({ title: values.title })).then((res) => {
      modalRef.current?.close();
    });
    setValue("title", "");
  };
  return (
    <>
      <button
        onClick={() => modalRef?.current?.showModal()}
        className="flex-center font-sans  h-10 gap-2  bg-buttonBg-create text-white rounded-md w-full"
        style={{
          background: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)",
        }}
      >
        Create new task
        <div className="bg-white size-6 flex-center rounded-full">
          <Plus className="w-4 text-violet-700" />
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
          </div>
          <form onSubmit={handleSubmit(handleTitleAdd)}>
            <div className="w-full flex flex-col gap-1 mt-3">
              <label htmlFor="" className="text-sm">
                Todo title
              </label>
              <input
                type="text"
                className="w-full rounded-md px-3 text-sm h-10  bg-forgroundColor-side-button"
                placeholder="title"
                onChange={(e) => {
                  setValue("title", e.target.value);
                  trigger("title");
                }}
              />
              <span className="text-red-600 text-sm">
                {errors && errors.title && errors.title?.message}
              </span>
            </div>
            <div className="w-full flex flex-col gap-1 mt-3">
              <button className="w-full h-10 flex-center bg-create rounded-md text-white text-sm">
                submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
