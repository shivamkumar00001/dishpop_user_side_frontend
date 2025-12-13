import { useState, useRef, useEffect, useCallback } from "react";
import api from "../lib/api";
import axios from "axios";

export default function usePaginatedMenu(
  restaurantId,
  category,
  search,
  LIMIT = 20
) {
  const isSearching = Boolean(search);

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [initialLoadError, setInitialLoadError] = useState(false);
  const [hasResolvedOnce, setHasResolvedOnce] = useState(false);

  const abortRef = useRef(null);
  const firstLoadDoneRef = useRef(false);

  const fetchPage = useCallback(async () => {
    if (isFetching || !hasMore || !restaurantId) return;

    setIsFetching(true);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await api.get(`/api/menu/${restaurantId}`, {
        params: {
          limit: LIMIT,
          skip,
          category,
          search: search || undefined,
        },
        signal: controller.signal,
      });

      const data = res.data?.data || [];

      // ✅ ALWAYS replace items on first page (even empty)
      if (skip === 0) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }

      setSkip((prev) => prev + data.length);
      setHasResolvedOnce(true);

      setHasMore(data.length === LIMIT);

      if (!categories.length && res.data?.categories?.length) {
        setCategories(["All", ...res.data.categories]);
      }

      setInitialLoadError(false);
    } catch (err) {
      if (
        err.code === "ERR_CANCELED" ||
        err.name === "CanceledError" ||
        axios.isCancel(err)
      ) {
        return;
      }

      setHasResolvedOnce(true);

      if (!isSearching && !firstLoadDoneRef.current) {
        setInitialLoadError(true);
      }
    } finally {
      setIsFetching(false);

      if (!firstLoadDoneRef.current) {
        setInitialLoading(false);
        firstLoadDoneRef.current = true;
      }
    }
  }, [
    restaurantId,
    category,
    search,
    skip,
    hasMore,
    isFetching,
    categories.length,
    LIMIT,
    isSearching,
  ]);

  // 🔥 IMPORTANT FIX: clear items on search/category change
  useEffect(() => {
    if (!restaurantId) return;

    if (abortRef.current) abortRef.current.abort();

    setItems([]);                // ✅ clear stale items
    setSkip(0);
    setHasMore(true);
    setHasResolvedOnce(false);   // allow empty state
  }, [category, search, restaurantId]);

  // 🔁 Hard reset on restaurant change
  useEffect(() => {
    if (!restaurantId) return;

    firstLoadDoneRef.current = false;
    setItems([]);
    setCategories([]);
    setSkip(0);
    setHasMore(true);
    setHasResolvedOnce(false);
    setInitialLoadError(false);
    setInitialLoading(true);
  }, [restaurantId]);

  useEffect(() => {
    if (skip === 0) fetchPage();
  }, [fetchPage, skip]);

  const retry = () => {
    firstLoadDoneRef.current = false;
    setItems([]);
    setSkip(0);
    setHasMore(true);
    setHasResolvedOnce(false);
    setInitialLoadError(false);
    setInitialLoading(true);
  };

  return {
    items,
    categories,
    fetchPage,
    hasMore,
    initialLoading,
    isFetching,
    initialLoadError,
    hasResolvedOnce,
    retry,
  };
}
