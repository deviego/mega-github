import RepoRow from "../RepoRow";
import FilterRepoComponent from "../FilterRepoComponent";
import { useGithubStore } from "@/context/store";
import { useState, useMemo } from "react";

export default function Starred() {
  const { starred } = useGithubStore();
  const [filters, setFilters] = useState({
    searchText: "",
    type: "",
    language: "",
  });

  const filteredStarred = useMemo(() => {
    if (!starred) return [];

    return starred.filter((repo) => {
      const matchesSearch =
        !filters.searchText ||
        repo.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        (repo.description &&
          repo.description
            .toLowerCase()
            .includes(filters.searchText.toLowerCase()));

      let matchesType = true;
      if (filters.type === "public") matchesType = !repo.private;
      if (filters.type === "private") matchesType = repo.private;
      if (filters.type === "fork") matchesType = repo.fork;

      const matchesLanguage =
        filters.language === "none" ||
        filters.language === "" ||
        repo.language === filters.language;

      return matchesSearch && matchesType && matchesLanguage;
    });
  }, [starred, filters]);

  return (
    <div className="flex flex-col gap-10 w-full">
      <FilterRepoComponent onFilterChange={setFilters} repos={starred || []} />

      {filteredStarred.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No starred repositories match your criteria
        </div>
      ) : (
        filteredStarred.map((repo) => <RepoRow key={repo.id} repo={repo} />)
      )}
    </div>
  );
}
