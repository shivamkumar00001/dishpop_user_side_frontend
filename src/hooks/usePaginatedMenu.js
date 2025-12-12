import { useState, useRef, useEffect, useCallback } from "react";
import api from "../lib/api";   // ⭐ use Vite env-based API instance

export default function usePaginatedMenu(restaurantId, category, search, LIMIT = 20) {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const abortRef = useRef(null);

  // ⭐ FETCH PAGE
  const fetchPage = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    setNetworkError(false);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await api.get(`/api/menu/${restaurantId}`, {
        params: { limit: LIMIT, skip, category, search },
        signal: controller.signal,
      });

      const data = res.data?.data || [];

      // No items for this restaurant
      if (skip === 0 && data.length === 0) {
        setNetworkError(true);
        setInitialLoading(false);
        return;
      }

      // ⭐ Load categories once
      if (categories.length === 0) {
        if (res.data.categories?.length > 0) {
          setCategories(["All", ...res.data.categories]);
        } else if (res.data.allItems) {
          const allCats = new Set(
            res.data.allItems.map(i => i.category?.trim()).filter(Boolean)
          );
          setCategories(["All", ...allCats]);
        }
      }

      setItems(prev => [...prev, ...data]);
      setSkip(prev => prev + data.length);

      if (data.length < LIMIT) setHasMore(false);

    } catch (err) {
      if (!api.isCancel?.(err)) {
        console.log("Fetch error:", err);
        setNetworkError(true);
      }

    } finally {
      setIsFetching(false);
      setInitialLoading(false);
    }
  }, [restaurantId, category, search, skip, isFetching, hasMore, categories.length]);

  // Reset items when category or search changes
  useEffect(() => {
    setItems([]);
    setSkip(0);
    setHasMore(true);
    setInitialLoading(false);
  }, [category, search]);

  // Reset everything when restaurant changes
  useEffect(() => {
    setItems([]);
    setCategories([]);
    setSkip(0);
    setHasMore(true);
    setInitialLoading(true);
    setNetworkError(false);
  }, [restaurantId]);

  // Auto-fetch on mount & changes
  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const retry = () => {
    setItems([]);
    setSkip(0);
    setHasMore(true);
    fetchPage();
  };

  return {
    items,
    categories,
    fetchPage,
    hasMore,
    initialLoading,
    isFetching,
    networkError,
    retry,
  };
}
