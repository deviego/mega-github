import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { GithubRepo } from "@/types/githubAPITypes";

export default function FilterRepoComponent({
  onFilterChange,
  repos,
}: {
  onFilterChange: (filters: {
    searchText: string;
    type: string;
    language: string;
  }) => void;
  repos: GithubRepo[];
}) {
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const languages = Array.from(
    new Set(repos?.map((repo: GithubRepo) => repo.language).filter(Boolean))
  );

  useEffect(() => {
    onFilterChange({ searchText, type, language });
  }, [searchText, type, language, onFilterChange]);

  return (
    <div className="flex flex-col gap-4 my-4 md:my-10 lg:my-10 w-full lg:gap-[104px] md:gap-4 lg:flex-row ">
      <div className="flex gap-2  order-2  lg:order-1">
        <Image src="/icons/search.svg" alt="search" width={20} height={20} />
        <Input
          type="text"
          placeholder="Search Here"
          className="bg-transparent border-none border-b border-grayText focus:border-grayText rounded-none lg:pb-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex gap-2 text-white order-2 md:order-1">
        <Select onValueChange={setType} value={type}>
          <SelectTrigger className="w-[180px] bg-gradient-to-r from-[#0056A6] to-[#0587FF] text-white [&_*]:text-white">
            <SelectValue placeholder="Type" className="text-white" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="none">All</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="fork">Forks</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={setLanguage} value={language}>
          <SelectTrigger className="w-[180px] bg-gradient-to-r from-[#0056A6] to-[#0587FF] text-white [&_*]:text-white">
            <SelectValue placeholder="Language" className="text-white" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              <SelectItem value="none">All</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang as string}>
                  {lang as string}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
