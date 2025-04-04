import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGithubStore } from "@/context/store";
import Image from "next/image";
import AllRepos from "./AllRepos";
import Starred from "./Starred";

export default function Repos() {
  const { repos, starred } = useGithubStore();
  return (
    <Tabs defaultValue="repositories" className="w-full bg-white border-none shadow-none">
      <TabsList className="bg-white border-b border-none shadow-none" >
        <TabsTrigger
          value="repositories"
          className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#FD8C73] data-[state=inactive]:opacity-60 text-[18px] font-normal rounded-none shadow-none md:text-sm md:px-2 md:py-1 lg:text-base lg:px-3 lg:py-2 text-sm"
        >
          <Image
            src="/icons/bookRepo.svg"
            alt="Repositories"
            width={18}
            height={18}
            className="mr-2 w-3 h-3 md:w-4 md:mr-4 md:h-4 lg:w-5 lg:h-5"
          />
          Repositories 
          <span className="text-normal text-sm text-grayText px-1 md:px-3 py-1 border border-grayText rounded-full ml-2 bg-whitePaper">
            {repos?.length}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="starred"
          className="data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#FD8C73] data-[state=inactive]:opacity-60 text-[18px] font-normal rounded-none shadow-none md:text-sm md:px-2 md:py-1 lg:text-base lg:px-3 lg:py-2 text-sm"
        >
          <Image
            src="/icons/stars.svg"
            alt="Starred"
            width={18}
            height={18}
            className="mr-2 w-3 h-3 md:w-4 md:mr-4 md:h-4 lg:w-5 lg:h-5"
          />
          Starred
          <span className="text-normal text-sm text-grayText px-1 md:px-3 py-1 border border-grayText rounded-full ml-2 bg-whitePaper">
            {starred?.length}
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="repositories" className="w-full">
        <AllRepos />
      </TabsContent>
      <TabsContent value="starred">
        <Starred />
      </TabsContent>
    </Tabs>
  );
}
