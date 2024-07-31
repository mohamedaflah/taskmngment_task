"use client";
import { LandingTopCard } from "@/components/app/landing-topcard";
import { getUserAction } from "@/redux/actions/user/user.action";
import { handleTaskDrop } from "@/redux/reducers/task.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Menu, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.user);
  const { task } = useAppSelector((state) => state.task);

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

  const handleDragEnd = (
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
  };

  return (
    <main className="h-screen overflow-y-auto flex-1 p-3 ">
      <style jsx global>{`
        .task-card {
          transition: all 0.3s ease;
        }
        .task-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .task-column {
          transition: background-color 0.3s ease;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
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
      <div className="w-full min-h-56 rounded-sm mt-4 bg-white overflow-x-auto flex whitespace-nowrap gap-3 p-3">
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
              <Image width={20} height={20} alt="" src={"/icons/menu.svg"} />
            </div>
            {taskColumn.tasks?.map((card, index) => (
              <div
                id={card._id}
                key={card._id}
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, taskColumn._id.toString(), card._id, index)
                }
                className="task-card cursor-grab w-full border rounded-md bg-forgroundColor-kanbanbox min-h-56 p-3 flex flex-col gap-3"
              >
                <div className="text-wrap">
                  <h3 className="text-[15px] text-[#606060] leading-5">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#797979] mt-1 leading-4">
                    {card.description + " => " + card._id}
                  </p>
                </div>
                <div>
                  <div
                    className={`${card.priority.toLowerCase()} inline-block text-white text-[13px] py-1 font-[400]`}
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
            <button className="w-full justify-between h-9 rounded-md px-2 flex items-center bg-add text-white text-sm pulse">
              Add Task
              <Plus className="w-5" />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
