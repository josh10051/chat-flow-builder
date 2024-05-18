'use client'

import React, { FC, DragEvent } from "react";
import { useStore } from "../store";

interface NodesPanelProps {}

const NodesPanel: FC<NodesPanelProps> = () => {
  const { setError } = useStore();

  // Function to handle drag start event
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    content: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex border-blue-600 px-3 w-full bg-white">
      <div
        className="flex flex-row border border-blue-700 p-4 h-32 rounded-lg m-[5rem] w-[20rem] cursor-pointer"
        onDragStart={(event) => onDragStart(event, "textNode", "message")}
        draggable
        onMouseEnter={() => setError("")}
      >
        <div className="flex flex-col h-full m-3 items-center justify-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="blue"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M8 2C4.262 2 1 4.57 1 8c0 1.86.98 3.486 2.455 4.566a3.472 3.472 0 0 1-.469 1.26.75.75 0 0 0 .713 1.14 6.961 6.961 0 0 0 3.06-1.06c.403.062.818.094 1.241.094 3.738 0 7-2.57 7-6s-3.262-6-7-6ZM5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          <h3>Message</h3>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;