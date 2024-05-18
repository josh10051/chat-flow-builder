'use client'

import React, { FC, ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../store';
import _ from 'lodash';

interface SettingsPanelProps { }

const SettingsPanel: FC<SettingsPanelProps> = () => {
    const [input, setInput] = useState<string>('');
    const { nodes, updateNode, setShowNodesPanel, setError } = useStore();
    const activeNode = _.find(nodes, (node: any) => node.selected === true);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
        setError('');
    };

    useEffect(() => {
        updateNode(
            nodes.map((node) => {
                if (node.id === activeNode?.id) {
                    return { ...activeNode, message: input };
                }
                return node;
            })
        );
    }, [input]);

    return (
        <div className="w-full bg-white">
            <div
                className="flex items-center py-[1rem] px-[0.5rem]"
                onClick={() => {
                    setShowNodesPanel(true);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </div>
            <hr />
            <div className="py-[0.3rem] px-[1rem]">
                <p>Text</p>
            </div>
            <div className="flex justify-center items-center p-[1rem]">
                <textarea
                    className="border rounded w-full p-[0.5rem]"
                    rows={4}
                    value={input}
                    onChange={onChange}
                />
            </div>
            <hr />
        </div>
    );
};

export default SettingsPanel;