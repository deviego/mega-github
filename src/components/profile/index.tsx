// src/components/profile/index.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGithubStore } from '@/context/store';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Link as LinkIcon } from 'lucide-react';

export function Profile() {
  const { profile } = useGithubStore();

  if (!profile) {
    return <ProfileSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-16 w-16 rounded-full">
          <AvatarImage src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
          <AvatarFallback>{profile.login.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-2xl font-bold">{profile.name || profile.login}</h1>
          <p className="text-muted-foreground">{profile.login}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {profile.bio && (
          <p>{profile.bio}</p>
        )}
        
        <div className="flex flex-wrap gap-4">
          {/* <div className="flex items-center gap-1">
            <Users size={16} />
            <span className="font-medium">{profile.followers}</span> followers
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span className="font-medium">{profile.following}</span> following
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={16} />
            <span className="font-medium">{profile.public_repos}</span> repos
          </div> */}
        </div>
        
        {profile.location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span>{profile.location}</span>
          </div>
        )}
        
        {profile.blog && (
          <div className="flex items-center gap-2">
            <LinkIcon size={16} className="text-muted-foreground" />
            <a 
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {profile.blog}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
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