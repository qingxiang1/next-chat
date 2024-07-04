/**
 * 路由处理程序
 */
import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers'
import { auth, clerkClient } from "@clerk/nextjs/server";

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';

export const POST = async () => {

  // const userAuth = await currentUser();
  const { userId } = auth();

  if(!userId) {
    return NextResponse.json('获取用户失败', { status: 500 });
  }

  const user = await clerkClient.users.getUser(userId);

  logger.info('user auth >>>>>> :', user);

  const headersInstance = headers();
  const ip = headersInstance?.get('Host') ?? '';
  const sysType = headersInstance?.get('User-Agent') ?? '';

  if(!user) {
    return NextResponse.json('获取用户失败', { status: 500 });
  }

  const { username } = user;

  try {
    const user = await db.user.create({
      data: {
        user_id: userId, 
        username: username || userId,
        password: '',
        ip,
        sys_type: sysType,
      }
    });

    return NextResponse.json({
      id: user?.id,
      userId,
      username: user?.username,
      creationTime: user?.created,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    }, { status: 500 });
  }
};

// export const PUT = async (request: Request) => {
//   const json = await request.json();
//   const parse = EditUserValidation.safeParse(json);

//   const headersInstance = headers();
//   const ip = headersInstance?.get('Host') ?? '';
//   const sysType = headersInstance?.get('User-Agent') ?? '';

//   if (!parse.success) {
//     return NextResponse.json(parse.error.format(), { status: 422 });
//   }

//   const { data } = parse;

//   try {
//     const user = await db.user.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         username: data.username,
//         password: data.password,
//         ip,
//         sys_type: sysType,
//       },
//     });

//     return NextResponse.json({...user});
//   } catch (error) {

//     return NextResponse.json({
//       success: false,
//     }, { status: 500 });
//   }
// };

// export const DELETE = async (request: Request) => {
//   const json = await request.json();
//   const parse = DeleteUserValidation.safeParse(json);

//   // const headersInstance = headers();
//   // const ip = headersInstance?.get('Host') ?? '';
//   // const sysType = headersInstance?.get('User-Agent') ?? '';

//   if (!parse.success) {
//     return NextResponse.json(parse.error.format(), { status: 422 });
//   }

//   const { id } = parse.data;

//   try {
//     await db.user.delete({
//       where: {
//         id,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//     });
//   } catch (error) {

//     return NextResponse.json({
//       success: false,
//     }, { status: 500 });
//   }
// };
