"use client";
import { AddnewTaskModal } from "@/components/app/addtask-modal";
import { ColumnAddModal } from "@/components/app/column-addmodal";
import { ColumnEditModal } from "@/components/app/columnedit-modal";

import { LandingTopCard } from "@/components/app/landing-topcard";
import { TodoTitleEditModal } from "@/components/app/todotitleedit-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosInstance } from "@/constants/axios";
import { cn } from "@/lib/utils";
import {
  deleteFullTodo,
  deleteTaskCard,
  getTodos,
} from "@/redux/actions/todo/todo.action";
import { getUserAction } from "@/redux/actions/user/user.action";
import { handleTaskDrop } from "@/redux/reducers/task.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Ellipsis, Loader2, LoaderIcon, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction());
    dispatch(getTodos());
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.user);
  const { task, loading } = useAppSelector((state) => state.task);

  const [draggedItem, setDraggedItem] = useState<{
    columnId: string;
    taskId: string;
    index?: number;
  } | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string,
    taskId: string,
    index: number
  ) => {
    setDraggedItem({ columnId, taskId, index });
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ columnId, taskId, index })
    );
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = "0.5";
      e.target.style.transform = "scale(1.05)";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.backgroundColor = "";
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumnId: string
  ) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.backgroundColor = "";
    }

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const targetElement = e.currentTarget;

    // Calculate the drop index
    const dropIndex = calculateDropIndex(e, targetElement);

    handleDragEnd(
      data.columnId,
      data.taskId,
      targetColumnId,
      data.index,
      dropIndex
    );
  };

  const calculateDropIndex = (
    e: React.DragEvent<HTMLDivElement>,
    targetElement: HTMLElement
  ) => {
    const rect = targetElement.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const itemHeight = 60; // Adjust this based on the height of your task item
    const dropIndex = Math.floor(offsetY / itemHeight);
    // Ensure dropIndex is within valid range
    return Math.min(Math.max(dropIndex, 0), targetElement.children.length - 1);
  };

  const handleDragEnd = async (
    sourceColumnId: string,
    taskId: string,
    targetColumnId: string,
    sourceIndex: number,
    targetIndex: number
  ) => {
    // Reset styles
    const draggedElement = document.getElementById(taskId);
    if (draggedElement) {
      draggedElement.style.opacity = "1";
      draggedElement.style.transform = "scale(1)";
    }

    // Dispatch the action to update the state
    dispatch(
      handleTaskDrop({
        sourceColumnId,
        targetColumnId,
        taskId,
        sourceIndex,
        targetIndex,
      })
    );
    try {
      const { data } = await axiosInstance.put(`/api/todo/todo`, {
        sourceColumnId,
        targetColumnId,
        taskId,
        sourceIndex,
        targetIndex,
      });
    } catch (error: any) {
      console.error("Failed to update task order:", error);
      toast.error("Failed to update task order:", error.message);
    }
  };

  return (
    <main className="h-screen overflow-y-auto flex-1 p-3 scrollbar-thin">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold text-4xl text-forgroundColor-black">
          Good morning, {user?.name}
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
              className="w-full h-full outline-none text-sm bg-white"
              placeholder="Search"
            />
            <Image width={20} height={20} alt="" src={"/icons/find.svg"} />
          </div>
        </div>
        <Menu className="lg:hidden" />
        <div className=" gap-3 hidden lg:flex">
          <button className="h-9 px-2 flex gap-3 bg-forgroundColor-side-button items-center rounded-md font-sans">
            Calender view
            <Image width={20} height={20} alt="" src={"/icons/calendar.svg"} />
          </button>
          <button className="h-9 px-2 flex gap-3 bg-forgroundColor-side-button items-center rounded-md font-sans">
            Automation
            <Image
              width={20}
              height={20}
              alt=""
              src={"/icons/automation.svg"}
            />
          </button>
          <button className="h-9 px-2 flex gap-3 bg-forgroundColor-side-button items-center rounded-md font-sans">
            Filter
            <Image width={20} height={20} alt="" src={"/icons/filter.svg"} />
          </button>
          <button className="h-9 px-2 flex gap-3 bg-forgroundColor-side-button items-center rounded-md font-sans">
            share
            <Image width={20} height={20} alt="" src={"/icons/send.svg"} />
          </button>
          <ColumnAddModal />
        </div>
      </div>
      <div
        className={cn(
          "w-full min-h-56 rounded-sm mt-4 bg-white overflow-x-auto flex whitespace-nowrap gap-3 p-3 scrollbar-thin",
          { "flex-center": loading }
        )}
      >
        {loading ? (
          <div className="w-full  h-full flex-center items-center">
            <LoaderIcon className="w-56 animate-spin text-black" />
          </div>
        ) : (
          <>
            {task?.map((taskColumn) => (
              <div
                key={taskColumn._id.toString()}
                className="task-column min-w-56 max-w-56 gap-3 flex flex-col"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, taskColumn._id.toString())}
              >
                <div className="w-full flex justify-between">
                  <span>{taskColumn.title}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Image
                        width={20}
                        height={20}
                        alt=""
                        src={"/icons/menu.svg"}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <button className="w-full text-[14px] py-1  px-2 flex justify-start">
                        {" "}
                        <TodoTitleEditModal
                          title={taskColumn.title}
                          todoId={taskColumn._id}
                        />
                      </button>
                      <DropdownMenuItem
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => {
                          dispatch(deleteFullTodo(String(taskColumn._id)));
                        }}
                      >
                        Delete
                        {loading && (
                          <>
                            <Loader2 className="w-4 animate-spin" />
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {taskColumn.tasks?.map((card, index) => (
                  <div
                    id={card._id}
                    key={card._id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(
                        e,
                        taskColumn._id.toString(),
                        card._id,
                        index
                      )
                    }
                    className="task-card cursor-grab w-full border rounded-md bg-forgroundColor-kanbanbox min-h-56 p-3 flex flex-col gap-3"
                  >
                    <div className="text-wrap items-center">
                      <div className="text-wrap w-full flex justify-between">
                        <h3 className="text-[15px] text-[#606060] leading-5">
                          {card.title}
                        </h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {" "}
                            <Ellipsis className="w-5 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Card option</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <button className="w-full text-[14px] py-1  px-2 flex justify-start ">
                              {" "}
                              <ColumnEditModal />
                            </button>
                            <DropdownMenuItem
                              onClick={() => {
                                dispatch(
                                  deleteTaskCard({
                                    todoId: String(taskColumn._id),
                                    taskId: String(card._id),
                                  })
                                );
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-[13px] text-[#797979] mt-1 leading-4">
                        {card.description}
                      </p>
                    </div>
                    <div>
                      <div
                        className={`${card?.priority?.toLowerCase()} inline-block text-white text-[13px] py-1 font-[400]`}
                      >
                        {card.priority}
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
                ))}
                <AddnewTaskModal todoId={taskColumn._id} />
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
