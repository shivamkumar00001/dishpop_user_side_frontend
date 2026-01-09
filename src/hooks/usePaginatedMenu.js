// import { useEffect, useState, useCallback, useRef } from "react";
// import api from "../lib/api";

// export default function usePaginatedMenu(
//   username,
//   search,
//   tags = [],
//   LIMIT = 4,
//   category = null
// ) {
//   const [menu, setMenu] = useState([]);
//   const [items, setItems] = useState([]);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [initialLoading, setInitialLoading] = useState(true);
//   const [isFetching, setIsFetching] = useState(false);

//   const [notSubscribed, setNotSubscribed] = useState(false);
//   const [subscriptionReason, setSubscriptionReason] = useState(null);

//   const firstLoadDoneRef = useRef(false);
//   const silentResetRef = useRef(false);

//   /* ================= FETCH PAGE ================= */
//   const fetchPage = useCallback(async () => {
//     if (!username || isFetching || !hasMore || notSubscribed) return;

//     setIsFetching(true);

//     try {
//       const endpoint = category
//         ? `/api/user/${username}/menu/category/${category}`
//         : `/api/user/${username}/menu`;

//       const res = await api.get(endpoint, {
//         params: {
//           page,
//           limit: LIMIT,
//           ...(search && { search }),
//           ...(tags.length > 0 && { tags: tags.join(",") }),
//         },
//       });

//       const newMenu = res.data.menu || [];
//       const more = Boolean(res.data.pagination?.hasMore);

//       /* ===== IMMUTABLE CATEGORY MERGE ===== */
//       setMenu((prev) => {
//         if (page === 1 || silentResetRef.current) {
//           silentResetRef.current = false;
//           return newMenu;
//         }

//         const map = new Map();

//         [...prev, ...newMenu].forEach((cat) => {
//          const id = cat._id || cat.id;

//           const existing = map.get(id);

//           map.set(id, {
//             ...cat,
//             dishes: existing
//               ? [...existing.dishes, ...cat.dishes]
//               : [...cat.dishes],
//           });
//         });

//         return Array.from(map.values());
//       });

//       const newItems = newMenu.flatMap((cat) => cat.dishes);

//       setItems((prev) =>
//         page === 1 || silentResetRef.current
//           ? newItems
//           : [...prev, ...newItems]
//       );

//       setHasMore(more);
//       setPage((p) => p + 1);
//     } catch (err) {
//       if (err?.response?.status === 403) {
//         setNotSubscribed(true);
//         setHasMore(false);
//         setSubscriptionReason(err.response?.data?.reason || "DEFAULT");
//       }
//     } finally {
//       setIsFetching(false);

//       if (!firstLoadDoneRef.current) {
//         setInitialLoading(false);
//         firstLoadDoneRef.current = true;
//       }
//     }
//   }, [
//     username,
//     search,
//     tags,
//     page,
//     hasMore,
//     isFetching,
//     LIMIT,
//     notSubscribed,
//     category,
//   ]);

//   /* ================= RESET ON FILTER CHANGE ================= */
//   useEffect(() => {
//     if (!username) return;

//     silentResetRef.current = true;
//     setPage(1);
//     setHasMore(true);
//     setNotSubscribed(false);
//     setSubscriptionReason(null);
//     firstLoadDoneRef.current = false;
//   }, [username, search, tags, category]);

//   /* ================= FIRST PAGE FETCH ================= */
//   useEffect(() => {
//     if (page === 1) {
//       fetchPage();
//     }
//   }, [page, fetchPage]);

//   return {
//     menu,
//     items,
//     fetchPage,
//     hasMore,
//     initialLoading,
//     isFetching,
//     notSubscribed,
//     subscriptionReason,
//   };
// }



import { useEffect, useState, useCallback, useRef } from "react";
import api from "../lib/api";

export default function usePaginatedMenu(
  username,
  search,
  tags = [],
  LIMIT = 4,
  category = null
) {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [notSubscribed, setNotSubscribed] = useState(false);
  const [subscriptionReason, setSubscriptionReason] = useState(null);

  const firstLoadDoneRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Create a stable filter key to detect changes
  const filterKey = `${username}|${search}|${tags.join(',')}|${category}`;
  const prevFilterKeyRef = useRef(filterKey);

  /* ================= FETCH PAGE ================= */
  const fetchPage = useCallback(async (pageToFetch, isReset = false) => {
    if (!username || notSubscribed) return;

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsFetching(true);

    try {
      const endpoint = category
        ? `/api/user/${username}/menu/category/${category}`
        : `/api/user/${username}/menu`;

      const res = await api.get(endpoint, {
        params: {
          page: pageToFetch,
          limit: LIMIT,
          ...(search && { search }),
          ...(tags.length > 0 && { tags: tags.join(",") }),
        },
        signal: abortControllerRef.current.signal,
      });

      const newMenu = res.data.menu || [];
      const more = Boolean(res.data.pagination?.hasMore);

      /* ===== CATEGORY MERGE ===== */
      setMenu((prev) => {
        if (isReset || pageToFetch === 1) {
          return newMenu;
        }

        const map = new Map();

        [...prev, ...newMenu].forEach((cat) => {
          const id = cat._id || cat.id;
          const existing = map.get(id);

          map.set(id, {
            ...cat,
            dishes: existing
              ? [...existing.dishes, ...cat.dishes]
              : [...cat.dishes],
          });
        });

        return Array.from(map.values());
      });

      const newItems = newMenu.flatMap((cat) => cat.dishes);

      setItems((prev) =>
        isReset || pageToFetch === 1 ? newItems : [...prev, ...newItems]
      );

      setHasMore(more);
      setPage(pageToFetch + 1);

      if (!firstLoadDoneRef.current) {
        setInitialLoading(false);
        firstLoadDoneRef.current = true;
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was cancelled, ignore
        return;
      }

      if (err?.response?.status === 403) {
        setNotSubscribed(true);
        setHasMore(false);
        setSubscriptionReason(err.response?.data?.reason || "DEFAULT");
      }
    } finally {
      setIsFetching(false);
    }
  }, [username, search, tags, LIMIT, notSubscribed, category]);

  /* ================= HANDLE FILTER CHANGES ================= */
  useEffect(() => {
    if (filterKey !== prevFilterKeyRef.current) {
      prevFilterKeyRef.current = filterKey;
      
      // Reset state
      setMenu([]);
      setItems([]);
      setPage(1);
      setHasMore(true);
      setNotSubscribed(false);
      setSubscriptionReason(null);
      firstLoadDoneRef.current = false;
      
      // Fetch first page with reset flag
      if (username) {
        fetchPage(1, true);
      }
    }
  }, [filterKey, username, fetchPage]);

  /* ================= LOAD MORE ================= */
  const loadMore = useCallback(() => {
    if (!isFetching && hasMore && username) {
      fetchPage(page, false);
    }
  }, [isFetching, hasMore, page, username, fetchPage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    menu,
    items,
    fetchPage: loadMore, // Rename for clarity
    hasMore,
    initialLoading,
    isFetching,
    notSubscribed,
    subscriptionReason,
  };
}