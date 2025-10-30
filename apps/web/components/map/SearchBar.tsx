import { useEffect, useState } from "react";
import { InputField } from "../ui/base/InputField";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [debounced, setDebounced] = useState("");

  useEffect(
    function debounceSearchQuery() {
      const ID = setTimeout(() => setDebounced(searchQuery), 600);
      return () => clearTimeout(ID);
    },
    [searchQuery]
  );

  useEffect(
    function callToPlacesAPI() {
      if (!debounced.trim()) return;
      // TODO: 검색 API 호출
    },
    [debounced]
  );

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // TODO: 검색 API 호출
    }
  };

  const handleCancelSearch = () => {
    setSearchQuery("");
    setDebounced("");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-xl rounded-full bg-white shadow-lg ring-1 ring-black/5">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="flex-1">
            <InputField
              placeholder="대여소를 검색해보세요."
              value={searchQuery}
              onChange={handleSearchQuery}
              onKeyDown={handleKeyDown}
              variant="unstyled"
              className="px-0 py-2 text-sm placeholder:text-gray-400"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={handleCancelSearch}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              aria-label="검색어 지우기"
              title="검색어 지우기"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {!searchResult && (
        <div className="pointer-events-auto absolute left-1/2 top-16 w-full max-w-xl -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5">
          <h2 className="text-sm font-semibold text-gray-900">
            오목교역 3번 출구
          </h2>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
            <span>580m</span>
            <span>·</span>
            <p>서울특별시 양천구 목동동로 270</p>
          </div>
        </div>
      )}
    </header>
  );
}
