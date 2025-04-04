import { GithubRepo } from "@/types/githubAPITypes";
import Image from "next/image";

export default function RepoRow({ repo }: { repo: GithubRepo }) {
  const handleClick = () => {
    window.open(repo.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-2 w-full container mx-auto mb-4 border-b pb-4 cursor-pointer" onClick={handleClick}>
      <div className="flex text-lg">
        {" "}
        <p className="font-light ">
          {repo.owner.login} /{" "}
          <span className="text-blueAcendent font-bold ">{repo.name} </span>
        </p>
      </div>
      <div className="flex gap-2 text-sm text-grayText font-light">
        {repo.description}
      </div>
      <div className="flex gap-11 text-sm font-normal">
        <div className="flex gap-2">
          <Image
            src="/icons/starFull.svg"
            alt="bookRepo"
            width={16}
            height={16}
          />
          {repo.stargazers_count}
        </div>
        <div className="flex gap-2">
          <Image src="/icons/fork.svg" alt="bookRepo" width={16} height={16} />
          {repo.forks_count}
        </div>
      </div>
    </div>
  );
}
