'use client'

import { useState } from "react";
import { Send } from "lucide-react";
// import { getTranslations } from 'next-intl/server';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropsTypes {
  onSend?: (value: string) => void;
}

const ChatInputTools = ({ onSend }: PropsTypes) => {

  const [inputVal, setInputVal] = useState<string | undefined>('');

  const handleInputText = (e: any) => {
    const value: string = e?.target?.value ?? '';
    setInputVal(value);
  };

  const handleSend = () => {
    if(!inputVal) return;
    if(onSend && typeof onSend === 'function') {
      onSend(inputVal);
      setInputVal('');
    }
  };

  return (
    <div className='h-[202px] overflow-hidden rounded border-2 border-gray-200 relative p-2'>
      <div className='h-6 flex mb-1'>
        <Button className='w-16 h-5 text-xs'>上传图片</Button>
        <Button className='w-16 h-5 text-xs ml-2'>上传文件</Button>
      </div>
      <Textarea value={inputVal} rows={5} cols={90} maxLength={300} onChange={handleInputText} />
      <div className="text-right">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className='mt-2 w-14 h-7' onClick={handleSend}>
                <Send className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>发送</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
      </div>
    </div>
  );
};

export default ChatInputTools;
