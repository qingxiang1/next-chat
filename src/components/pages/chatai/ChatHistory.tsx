/**
 * 聊天历史记录
 */
'use client'

import { useState } from 'react';
import classNames from 'classnames';

export interface ChatHisItem {
  id: string;
  title: string;
  time?: string;
}

interface PropsTypes {
  list: Array<ChatHisItem>,
  onSelect?: (param: ChatHisItem) => void,
}

const ChatHistory = (params: PropsTypes) => {

  const { list, onSelect } = params;

  const [selected, setSelected] = useState<ChatHisItem | null>(null);

  const handleSelect = (item: ChatHisItem): void => {
    setSelected(item);
    if(onSelect && typeof onSelect === 'function') {
      onSelect(item);
    }
  };
  
  const handleDrawList = () => {
    return (list || []).map(item => {

      const classes = selected && selected.id === item.id ? 'bg-gray-100' : '';

      return (
        <div
          key={item.id}
          className={
            classNames(
              'h-14', 'flex', 'flex-col', 'justify-around', 'cursor-pointer', 'hover:bg-gray-100',
              'pl-3', 'border-b', 'border-dashed', classes
            )
          }
          onClick={() => handleSelect(item)}
        >
          <div className="text-sm font-medium">{item.title}</div>
          <div className="text-xs text-gray-500">{item.time}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div className='text-sm leading-7 font-bold bg-slate-200 pl-2'>
        站内文章专题
      </div>
      <div
        className='h-12 flex items-center cursor-pointer hover:bg-gray-100 pl-3'
        onClick={
          () => handleSelect({
            id: 'art-chat',
            title: 'Chat With AI',
          })
        }
      >
        站内内容检索
      </div>

      <div className='text-sm leading-7 font-bold bg-slate-200 pl-2'>
        与AI历史会话
      </div>
      <div className='h-[600px] overflow-y-auto overflow-x-hidden'>
        {handleDrawList()}
      </div>
    </>
    
  )
};

export default ChatHistory;