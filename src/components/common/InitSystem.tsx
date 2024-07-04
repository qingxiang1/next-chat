'use client'

import { useEffect } from 'react';
import request from '@/utils/request';
// import { fetchSaveUser } from '@/services/basicServices';

const InitSystem = () => {

  useEffect(() => {
    void postUser();
  }, []);

  const postUser = async () => {
    try{
      const response = await request({
        url: '/api/user',
        method: 'post',
        data: {},
      });

      console.log('save success :', response);
      
    } catch(err) {
      console.log('error :', err)
    }
  };


  return (
    <div>
      初始化系统
    </div>
  )
}

export { InitSystem };
