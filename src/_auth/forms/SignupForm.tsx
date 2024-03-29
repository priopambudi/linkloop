import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const SignupForm = () => {
  // 1. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });
  // 2. define a submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    console.log(values);
  };
  return (
    <div>
      <Button>button</Button>
    </div>
  );
};

export default SignupForm;
