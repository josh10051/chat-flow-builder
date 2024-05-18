'use client'

import React, { FC, useEffect } from "react";
import _ from "lodash";
import NodesPanel from "../../components/NodesPanel";
import SettingsPanel from "../../components/SettingsPanel";
import Flow from "../../components/Flow";
import { useStore } from "../../store";

interface ChatProps { }

const Chat: FC<ChatProps> = () => {
    const { showNodesPanel, setShowNodesPanel, nodes, edges, setError, error } = useStore();
    const isNodeSeected = _.some(nodes, node => node.selected === true)

    useEffect(() => {
        if (isNodeSeected) {
            setShowNodesPanel(false)
        } else {
            setShowNodesPanel(true)
        }
    }, [isNodeSeected])

    const handleSave = (): void => {
        const allNodesIds: string[] = _.map(nodes, "id");
        const allSourceEdges: string[] = _.map(edges, "source");
        if (allNodesIds.length === 0) return;
        let count: number = 0;
        for (let i = 0; i < allNodesIds.length; i++) {
            if (!_.includes(allSourceEdges, allNodesIds[i])) count++;
        }
        if (count >= 2) {
            setError("Cannot save flow");
            return;
        }
        setError("Successfully saved!");
        return;
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row items-center justify-end h-20 bg-gray-200">
                {error && (
                    <div className="bg-red-200 rounded-lg text-center p-[1rem] mr-[10rem]">
                        <p>{error}</p>
                    </div>
                )}
                <button
                    className="rounded border border-blue-700 bg-white py-2 px-[2rem] text-blue-700 mr-[10rem]"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            </div>

            {/* Main content */}
            <div className="flex flex-1">
                <div className="flex w-3/4">
                    <Flow />
                </div>
                <aside className="flex w-1/4 border-[2px] border-l-gray-300">
                    {!showNodesPanel && <SettingsPanel />}
                    {showNodesPanel && <NodesPanel />}
                </aside>
            </div>
        </div>
    );
};

export default Chat;