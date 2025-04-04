import { useGithubStore } from "@/context/store";
import RepoRow from "../RepoRow";
import FilterRepoComponent from "../FilterRepoComponent";
import { useState, useMemo } from "react";

export default function AllRepos() {
  const { repos } = useGithubStore();
  const [filters, setFilters] = useState({
    searchText: "",
    type: "",
    language: "",
  });

  const filteredRepos = useMemo(() => {
    if (!repos) return [];

    return repos.filter((repo) => {
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
  }, [repos, filters]);

  return (
    <div className="flex flex-col gap-10 w-full">
      <FilterRepoComponent onFilterChange={setFilters} repos={repos || []} />

      {filteredRepos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No repositories match your criteria
        </div>
      ) : (
        filteredRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />)
      )}
    </div>
  );
}
