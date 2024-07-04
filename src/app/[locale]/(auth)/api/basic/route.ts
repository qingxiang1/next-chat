/**
 * 路由处理程序
 */
import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers'
import { auth } from "@clerk/nextjs/server";

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import {
  AddUserValidation,
  EditUserValidation,
  DeleteUserValidation,
} from '@/validations/UserValidation';

export const POST = async (request: NextRequest) => {

  // const userAuth = await currentUser();
  const userAuth = auth();

  logger.info('user auth >>>>>> :', userAuth);

  const json = await request.json();
  const parse = AddUserValidation.safeParse(json);

  const headersInstance = headers();
  const ip = headersInstance?.get('Host') ?? '';
  const sysType = headersInstance?.get('User-Agent') ?? '';

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  const { username, password } = parse.data;

  try {
    const user = await db.user.create({
      data: {
        username,
        password,
        ip,
        sys_type: sysType,
      }
    });

    return NextResponse.json({
      id: user?.id,
      username: user?.username,
      creationTime: user?.created,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    }, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditUserValidation.safeParse(json);

  const headersInstance = headers();
  const ip = headersInstance?.get('Host') ?? '';
  const sysType = headersInstance?.get('User-Agent') ?? '';

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  const { data } = parse;

  try {
    const user = await db.user.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        password: data.password,
        ip,
        sys_type: sysType,
      },
    });

    return NextResponse.json({...user});
  } catch (error) {

    return NextResponse.json({
      success: false,
    }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteUserValidation.safeParse(json);

  // const headersInstance = headers();
  // const ip = headersInstance?.get('Host') ?? '';
  // const sysType = headersInstance?.get('User-Agent') ?? '';

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  const { id } = parse.data;

  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {

    return NextResponse.json({
      success: false,
    }, { status: 500 });
  }
};
