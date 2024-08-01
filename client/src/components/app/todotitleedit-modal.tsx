import { cn } from "@/lib/utils";
import { Maximize2, Plus, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/redux/store";
import { addTodo, updateTodoTitle } from "@/redux/actions/todo/todo.action";
import { titleSchema } from "@/lib/Schema/titleadd.schema";
export function TodoTitleEditModal({
  title,
  todoId,
}: {
  title: string;
  todoId: string;
}) {
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
    dispatch(updateTodoTitle({ title: values.title, todoId: todoId })).then(
      () => {
        modalRef.current?.close();
      }
    );
    setValue("title", "");
  };
  useEffect(() => {
    setValue("title", title);
  }, [title]);
  return (
    <>
      <button onClick={() => modalRef?.current?.showModal()} className="w-full flex justify-start h-full items-center">Edit</button>
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
              <label htmlFor="" className="text-sm text-start">
                Todo title
              </label>
              <input
                type="text"
                className="w-full rounded-md px-3 text-sm h-10  bg-forgroundColor-side-button"
                placeholder="title"
                value={watch("title")}
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
