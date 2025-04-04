// src/app/profile/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGithubStore } from "@/context/store";
import { fetchUserRepos, fetchUserStarred } from "@/lib/api";
import { toast } from "sonner";
import { GithubRepo, GithubStarred } from "@/types/githubAPITypes";
import Repos from "@/components/Repos";
import Header from "@/components/header";
import { Profile } from "@/components/ProfileComponent";

export default function ProfilePage() {
  const { profile, username, setRepos, setStarred } = useGithubStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { isLoading: isLoadingRepos } = useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchUserRepos(username),
    enabled: !!profile,
  });

  const { isLoading: isLoadingStarred } = useQuery({
    queryKey: ["starred", username],
    queryFn: () => fetchUserStarred(username),
    enabled: !!profile,
  });

  useEffect(() => {
    if (isLoadingRepos === false) {
      const data = queryClient.getQueryData(["repos", username]);
      if (data) {
        setRepos(data as GithubRepo[]);
      }
    }

    if (isLoadingStarred === false) {
      const data = queryClient.getQueryData(["starred", username]);
      if (data) {
        setStarred(data as GithubStarred[]);
      }
    }
  }, [
    isLoadingRepos,
    isLoadingStarred,
    username,
    setRepos,
    setStarred,
    useQueryClient,
  ]);

  useEffect(() => {
    if (!profile) {
      toast.error("Usuário não encontrado");
      router.push("/");
    }
  }, [profile, router]);

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 w-screen h-screen">
      <div className="hidden md:block">
        <Header />
      </div>

      <main className="p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 w-full container mx-auto lg:space-x-6">
        <div className="w-full md:w-1/3 lg:w-auto">
          <Profile />
        </div>
        <div className="w-full md:w-2/3">
          <Repos />
        </div>
      </main>
    </div>
  );
}
