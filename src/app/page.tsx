'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGithubStore } from '@/context/store';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const searchSchema = z.object({
  username: z.string().min(1, 'Nome de usuário é obrigatório')
});

type SearchForm = z.infer<typeof searchSchema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUsername, fetchProfile } = useGithubStore();

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      username: ''
    }
  });

  const handleSearch = async (data: SearchForm) => {
    setIsLoading(true);
    
    try {
      setUsername(data.username);
      await fetchProfile();
      router.push(`/profile`);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Usuário não encontrado ou erro ao buscar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">GitHub Profile Finder</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Digite um usuário do GitHub..." 
                        disabled={isLoading} 
                        {...field} 
                      />
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Buscando...' : 'Buscar'}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {isLoading && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
      </div>
    </main>
  );
}