// src/app/profile/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGithubStore } from "@/context/store";
import { Profile } from "@/components/profile";
import { fetchUserRepos } from "@/lib/api";
import { toast } from "sonner";
import { GithubRepo } from "@/types/githubAPITypes";

export default function ProfilePage() {
  const { profile, username, setRepos } = useGithubStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { isLoading: isLoadingRepos } = useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchUserRepos(username),
    enabled: !!profile,
  });

  useEffect(() => {
    if (isLoadingRepos === false) {
      const data = queryClient.getQueryData(["repos", username]);
      if (data) {
        setRepos(data as GithubRepo[]);
      }
    }
  }, [isLoadingRepos, username, setRepos, useQueryClient]);

  useEffect(() => {
    if (!profile) {
      router.push("/");
      toast.error("Usuário não encontrado");
    }
  }, [profile, router]);

  if (!profile) {
    return null;
  }

  return (
    <main className="container mx-auto p-4">
      <Profile />
    </main>
  );
}
