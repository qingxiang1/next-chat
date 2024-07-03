/**
 * 服务端内部接口调用
 */

'use server'

import request from '@/utils/request'
// import { logger } from '@/libs/Logger';

const headers: Record<string, string> = {
  // 'Content-Type': 'application/json',
};

// const options: RequestInit = {
//   // 'cache': "no-cache", 
//   next: { revalidate: 10 }, // 缓存 10 秒
// };

export async function fetchSaveDate(params: { username: string; password: string; }) {
  return request({
    headers: {
      ...headers,
    },
    url: '/api/basic',
    method: 'post',
    data: params,
  });
};
