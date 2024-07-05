'use client'

import { useState } from 'react';
// import { getTranslations } from 'next-intl/server';

import ChatHistory, { type ChatHisItem } from '@/components/pages/chatai/ChatHistory';
import ChatInputTools from '@/components/pages/chatai/ChatInputTools';

const Dashboard = () => {

  const [selected, setSelected] = useState<ChatHisItem | null>(null);

  const list = [
    {
      id: '1',
      title: '第一次对话',
      time: '2024-07-05 10:20:20',
    },
    {
      id: '2',
      title: '第二次对话',
      time: '2024-07-05 10:25:25',
    },
  ];

  const handleSelected = (item: ChatHisItem) => {
    setSelected(item);
  };

  return (
    <div className="flex h-full rounded">
      <div className="w-3/12 min-w-52 border border-gray-200">
        <ChatHistory list={list} onSelect={handleSelected} />
      </div>
      <div className="flex-auto ml-1 border border-gray-200 flex flex-col">
        <div className='h-[500px] p-1 border-b-2 border-gray-200'>
          message window
        </div>
        <div className='flex-auto p-2'>
          <ChatInputTools />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
