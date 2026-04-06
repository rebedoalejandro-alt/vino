"use client";

import { useCallback, useState } from "react";
import { debounce } from "@/lib/utils";
import type { SearchResult, SearchState } from "@/types";

interface UseSearchOptions {
  debounceDelay?: number;
  minChars?: number;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const { debounceDelay = 300, minChars = 2 } = options;

  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    hasSearched: false,
  });

  /**
   * Perform search request
   */
  const performSearch = useCallback(async (query: string) => {
    if (query.length < minChars) {
      setState({
        query: "",
        results: [],
        isLoading: false,
        hasSearched: false,
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      query,
      isLoading: true,
      hasSearched: true,
    }));

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error("Error en la búsqueda");
      }

      const data = await response.json();

      setState((prev) => ({
        ...prev,
        results: data.results || [],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error searching:", error);
      setState((prev) => ({
        ...prev,
        results: [],
        isLoading: false,
      }));
    }
  }, [minChars]);

  /**
   * Debounced search function
   */
  const debouncedSearch = useCallback(debounce(performSearch as (...args: unknown[]) => unknown, debounceDelay), [performSearch, debounceDelay]);

  /**
   * Handle query change
   */
  const handleSearch = useCallback(
    (query: string) => {
      setState((prev) => ({
        ...prev,
        query,
      }));
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  /**
   * Clear search
   */
  const clearSearch = useCallback(() => {
    setState({
      query: "",
      results: [],
      isLoading: false,
      hasSearched: false,
    });
  }, []);

  /**
   * Set results manually (for custom implementations)
   */
  const setResults = useCallback((results: SearchResult[]) => {
    setState((prev) => ({
      ...prev,
      results,
    }));
  }, []);

  return {
    ...state,
    handleSearch,
    clearSearch,
    setResults,
  };
};

/**
 * Hook for category-specific search
 */
export const useCategorySearch = (category: "productos" | "bodegas" | "regiones", options: UseSearchOptions = {}) => {
  const { debounceDelay = 300, minChars = 2 } = options;

  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    hasSearched: false,
  });

  /**
   * Perform category search
   */
  const performCategorySearch = useCallback(
    async (query: string) => {
      if (query.length < minChars) {
        setState({
          query: "",
          results: [],
          isLoading: false,
          hasSearched: false,
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        query,
        isLoading: true,
        hasSearched: true,
      }));

      try {
        const response = await fetch(`/api/search/${category}?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error("Error en la búsqueda");
        }

        const data = await response.json();

        setState((prev) => ({
          ...prev,
          results: data.results || [],
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error searching:", error);
        setState((prev) => ({
          ...prev,
          results: [],
          isLoading: false,
        }));
      }
    },
    [category, minChars]
  );

  const debouncedSearch = useCallback(debounce(performCategorySearch as (...args: unknown[]) => unknown, debounceDelay), [performCategorySearch, debounceDelay]);

  const handleSearch = useCallback(
    (query: string) => {
      setState((prev) => ({
        ...prev,
        query,
      }));
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setState({
      query: "",
      results: [],
      isLoading: false,
      hasSearched: false,
    });
  }, []);

  return {
    ...state,
    handleSearch,
    clearSearch,
  };
};

/**
 * Hook for advanced product search with filters
 */
export const useProductSearch = (options: UseSearchOptions & { filters?: Record<string, unknown> } = {}) => {
  const { debounceDelay = 300, minChars = 1, filters = {} } = options;

  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    hasSearched: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  /**
   * Perform filtered product search
   */
  const performProductSearch = useCallback(
    async (query: string, searchFilters: Record<string, unknown> = {}) => {
      if (query.length < minChars && Object.keys(searchFilters).length === 0) {
        setState({
          query: "",
          results: [],
          isLoading: false,
          hasSearched: false,
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        query,
        isLoading: true,
        hasSearched: true,
      }));

      try {
        const params = new URLSearchParams();
        if (query) params.append("q", query);

        // Add filter parameters
        Object.entries(searchFilters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(`${key}[]`, v));
          } else if (value !== null && value !== undefined && value !== "") {
            params.append(key, String(value));
          }
        });

        const response = await fetch(`/api/search/productos?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Error en la búsqueda");
        }

        const data = await response.json();

        setState((prev) => ({
          ...prev,
          results: data.results || [],
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error searching:", error);
        setState((prev) => ({
          ...prev,
          results: [],
          isLoading: false,
        }));
      }
    },
    [minChars]
  );

  const debouncedSearch = useCallback(debounce(performProductSearch as (...args: unknown[]) => unknown, debounceDelay), [performProductSearch, debounceDelay]);

  const handleSearch = useCallback(
    (query: string) => {
      setState((prev) => ({
        ...prev,
        query,
      }));
      debouncedSearch(query, appliedFilters);
    },
    [debouncedSearch, appliedFilters]
  );

  const handleFilterChange = useCallback(
    (filters: Record<string, unknown>) => {
      setAppliedFilters(filters);
      debouncedSearch(state.query, filters);
    },
    [debouncedSearch, state.query]
  );

  const clearSearch = useCallback(() => {
    setState({
      query: "",
      results: [],
      isLoading: false,
      hasSearched: false,
    });
    setAppliedFilters({});
  }, []);

  return {
    ...state,
    appliedFilters,
    handleSearch,
    handleFilterChange,
    clearSearch,
  };
};
