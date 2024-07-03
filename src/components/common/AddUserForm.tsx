'use client';

import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddUserValidation } from '@/validations/UserValidation';
// import { fetchSaveDate } from '@/services/basicServices';
import request from '@/utils/request'

const AddUserForm = () => {
  const form = useForm<z.infer<typeof AddUserValidation>>({
    resolver: zodResolver(AddUserValidation),
    defaultValues: {
      username: "",
      password: ''
    },
  });

  async function onSubmit(values: z.infer<typeof AddUserValidation>) {    
    try{
      const response = await request({
        url: '/api/basic',
        method: 'post',
        data: values,
      });

      console.log('save success :', response);
      
    } catch(err) {
      console.log('error :', err)
    }
  }

  function onError(msg: any) {
    console.log('submit error', msg)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" required {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" required {...field} />
              </FormControl>
              <FormDescription>
                This is your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export { AddUserForm };
