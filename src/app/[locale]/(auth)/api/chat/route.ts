/**
 * 路由处理程序
 */
import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers'
import { auth } from "@clerk/nextjs/server";

// import { db } from '@/libs/DB';
import {
  AIChatValidation,
} from '@/validations/ChatValidation';
import { logger } from '@/libs/Logger';
import { getRagChain } from '@/chatai/chat';



export const POST = async (request: NextRequest) => {

  // const userAuth = await currentUser();
  // const userAuth = auth();

  const json = await request.json();

  const headersInstance = headers();
  const ip = headersInstance?.get('Host') ?? '';
  const sysType = headersInstance?.get('User-Agent') ?? '';

  const parse = AIChatValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  const { message, sessionId } = parse.data;

  const ragChain = await getRagChain();

  const result = await ragChain.stream(
    {
      question: message,
    },
    { configurable: { sessionId } }
  );

  console.log(' message : ', message, sessionId, result);

  try {
    

    let msg = '';

    for await (const chunk of result) {
      msg += chunk.toString();
    }

    logger.info(' msg : ', msg)

    return NextResponse.json({ answer: msg });
  } catch (error) {
    return NextResponse.json({
      success: false,
    }, { status: 500 });
  }
};

