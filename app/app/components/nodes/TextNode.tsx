'use client'

import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { useStore } from "../../store";

const TextNode = ({ selected, id }: NodeProps) => {
    const { setShowNodesPanel, nodes } = useStore();
    const currNode = nodes.find((nd) => nd.id === id);

    return (
        <div
            onClick={() => {
                setShowNodesPanel(false);
            }}
            className={`rounded-md border-2 shadow-lg ${selected ? "border-blue-700" : "border-gray-200"
                }`}
        >
            {/* Handle for incoming edge */}
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#000",
                }}
            />
            <div className="flex flex-col h-100 w-100 justify-between">
                <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2 bg-green-100 px-[1rem] rounded-t">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="green"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 2C4.262 2 1 4.57 1 8c0 1.86.98 3.486 2.455 4.566a3.472 3.472 0 0 1-.469 1.26.75.75 0 0 0 .713 1.14 6.961 6.961 0 0 0 3.06-1.06c.403.062.818.094 1.241.094 3.738 0 7-2.57 7-6s-3.262-6-7-6ZM5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div className="w-100">Send Message</div>
                        <div className="bg-white m-[0.4rem] p-[0.5rem] rounded-full ml-[4rem]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="green"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 2C4.262 2 1 4.57 1 8c0 1.86.98 3.486 2.455 4.566a3.472 3.472 0 0 1-.469 1.26.75.75 0 0 0 .713 1.14 6.961 6.961 0 0 0 3.06-1.06c.403.062.818.094 1.241.094 3.738 0 7-2.57 7-6s-3.262-6-7-6ZM5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="p-[1rem] truncate bg-white h-[3rem] rounded-b">{currNode?.message || ""}</div>
            </div>
            {/* Handle for outgoing edge */}
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#000",
                }}
            />
        </div>
    );
};

export default memo(TextNode);