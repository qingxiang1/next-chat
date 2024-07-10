'use client'

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import ChatHistory, { type ChatHisItem } from '@/components/pages/chatai/ChatHistory';
import ChatInputTools from '@/components/pages/chatai/ChatInputTools';
import { getUuid } from '@/utils/utils';
import request, { type ApiResponse } from '@/utils/request'


interface msgType {
  id: string,
  type: string,
  content: string,
  time: string,
}

const msgList: Array<msgType> = [
    {
      id: '1',
      content: '你是谁',
      time: '2024-07-05 10:30:30',
      type: 'ai',
    },
    {
      id: '2',
      content: '哈哈哈',
      time: '2024-07-05 10:31:30',
      type: 'user',
    },
    {
      id: '3',
      content: '请问问题',
      time: '2024-07-05 10:32:30',
      type: 'ai',
    },
    {
      id: '3-1',
      content: '哈哈哈',
      time: '2024-07-05 10:31:30',
      type: 'user',
    },
    {
      id: '4',
      content: '阿德随机发货',
      time: '2024-07-05 10:33:30',
      type: 'user',
    },
    {
      id: '5',
      content: '好的哈代发好的哈代发看电视剧好的哈代发好的哈代发看电视剧看电视剧看电视剧好的哈代发好的哈代发看电视剧看电视剧好的哈代发好的哈代发看电视剧看电视剧好的哈代发好的哈代发看电视剧看电视剧',
      time: '2024-07-05 10:34:30',
      type: 'ai',
    },
    {
      id: '6',
      content: '哈哈哈',
      time: '2024-07-05 10:31:30',
      type: 'user',
    },
    {
      id: '7',
      content: '请问问题',
      time: '2024-07-05 10:32:30',
      type: 'ai',
    },
    {
      id: '8',
      content: '阿德随机发货',
      time: '2024-07-05 10:33:30',
      type: 'user',
    },
    {
      id: '9',
      content: '好的哈代发看电视剧',
      time: '2024-07-05 10:34:30',
      type: 'ai',
    },
    {
      id: '10',
      content: '请问问题',
      time: '2024-07-05 10:32:30',
      type: 'ai',
    },
    {
      id: '6-1',
      content: '哈哈哈',
      time: '2024-07-05 10:31:30',
      type: 'user',
    },
    {
      id: '7-1',
      content: '请问问题',
      time: '2024-07-05 10:32:30',
      type: 'ai',
    },
    {
      id: '8-1',
      content: '阿德随机发货',
      time: '2024-07-05 10:33:30',
      type: 'user',
    },
    {
      id: '9-1',
      content: '好的哈代发看电视剧',
      time: '2024-07-05 10:34:30',
      type: 'ai',
    },
    {
      id: '10-1',
      content: '请问问题',
      time: '2024-07-05 10:32:30',
      type: 'ai',
    },
  ];

const Dashboard = () => {

  const [selected, setSelected] = useState<ChatHisItem | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { user } = useUser();

  // console.log('user msg :', user);

  useEffect(() => {
    const dom = document?.getElementById('chat-window-list') ?? '';
    if(dom) {
      setTimeout(() => {
        dom.scrollTop = dom.scrollHeight;
      }, 200);
    }
  }, []);

  useEffect(() => {
    if(refresh) {
      setRefresh(false);
    }
  }, [refresh]);
  

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

  const handleRefresh = () => {
    setRefresh(true);

    const dom = document?.getElementById('chat-window-list') ?? '';
    if(dom) {
      setTimeout(() => {
        dom.scrollTop = dom.scrollHeight;
      }, 200);
    }
  };

  const handleSendMsg = async (msg: string) => {
    msgList.push({
      id: getUuid(),
      content: msg,
      time: '2024-07-05 10:32:30',
      type: 'user',
    });
    handleRefresh();
    
    try{
      const result = await request({
        url: '/api/chat',
        method: 'post',
        data: {
          message: msg,
          sessionId: 'test-chat'
        },
      });

      console.log(' response :', result);

      if((result as unknown as ApiResponse)?.success) {
        msgList.push({
          id: getUuid(),
          content: result.data,
          time: '2024-07-05 10:32:30',
          type: 'ai',
        });

        handleRefresh();
      }
      
    } catch(err) {
      console.log('error :', err)
    }

  };
  

  return (
    <div className="flex h-full rounded">
      <div className="w-3/12 min-w-52 border border-gray-200">
        <ChatHistory list={list} onSelect={handleSelected} />
      </div>
      <div className="flex-auto ml-1 border border-gray-200 flex flex-col">
        <div id='chat-window-list' className='h-[500px] p-4 border-b-2 border-gray-200 overflow-y-scroll snap-none'>
          {
            msgList.map(item => {
              const classes = item.type === 'ai'
                              ? classNames('flex', 'mb-2', 'flex-row')
                              : classNames('flex', 'mb-2', 'flex-row-reverse');

              const popCommon = classNames(`
                px-3 py-1 mx-3 max-w-[600px] border border-gray-400 rounded relative
                after:content-[''] after:w-0 after:h-0 after:border-y-[5px] after:border-y-transparent
              `);

              const leftPop = classNames(popCommon, `
                after:border-l-[5px] after:border-l-transparent after:border-r-[5px] after:border-r-gray-500
                after:absolute after:-left-[11px] after:top-[10px]
              `);

              const rightPop = classNames(popCommon, `
                after:border-r-[5px] after:border-r-transparent after:border-l-[5px] after:border-l-gray-500
                after:absolute after:-right-[11px] after:top-[10px]
              `);

              const nameClass = classNames(item.type === 'ai' ? 'text-left' : 'text-right', 'font-medium', 'px-3')

              return (
                <div key={item.id} className={classes}>
                  <Avatar>
                    <AvatarImage
                      src={item.type === 'ai' ? 'https://github.com/shadcn.png' : user?.imageUrl}
                      alt="avatar" 
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className={nameClass}>{item.type}</div>
                    <div
                      className={item.type === 'ai' ? leftPop : rightPop}
                    >
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })
          }
          <div></div>
        </div>
        <div className='flex-auto p-2'>
          <ChatInputTools onSend={handleSendMsg} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
