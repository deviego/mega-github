// src/components/profile/index.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGithubStore } from "@/context/store";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

export function Profile() {
  const { profile } = useGithubStore();

  if (!profile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex flex-col w-80">
      <CardHeader className="flex gap-6 items-center mb-8 p-0">
        <div className="relative">
          <Avatar className="h-36 w-36 rounded-full">
            <AvatarImage
              src={profile.avatar_url}
              alt={`${profile.login}'s avatar`}
            />
            <AvatarFallback>
              {profile.login.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {profile.status?.emoji && (
            <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 border-2 border-white">
              <span className="text-xl">{profile.status.emoji}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2  items-center justify-center">
          <h1 className="text-2xl font-bold">
            {profile.name || profile.login}
          </h1>
          <p className="text-grayText">{profile.bio}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-blueAcendent">
        {profile.company && (
          <div className="flex items-center gap-[10px] ">
            <Image
              src="/icons/carbon_enterprise.svg"
              alt={profile.company}
              width={16}
              height={16}
            />
            <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="flex items-center gap-[10px] ">
            <MapPin size={16} className="text-blueAcendent" />
            <span>{profile.location}</span>
          </div>
        )}

        {profile.blog && (
          <div className="flex items-center gap-[10px]">
            <LinkIcon size={16} className="text-blueAcendent" />
            <a
              href={
                profile.blog.startsWith("http")
                  ? profile.blog
                  : `https://${profile.blog}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate max-w-[180px] block"
            >
              {profile.blog}
            </a>
          </div>
        )}

        {profile.twitter_username && (
          <div className="flex items-center gap-[10px]">
            <Image
              src="/icons/social-icon.svg"
              alt={profile.twitter_username}
              width={16}
              height={16}
            />
            <span>{profile.twitter_username}</span>
          </div>
        )}
      </CardContent>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[120px]" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full" />

        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>

        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  );
}
