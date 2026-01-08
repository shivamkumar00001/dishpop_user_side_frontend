// import { useState, useEffect, useCallback, useRef } from "react";
// import api from "../lib/api";

// export default function usePaginatedMenu(
//   username,
//   search,
//   LIMIT = 15
// ) {
//   const [menu, setMenu] = useState([]);
//   const [items, setItems] = useState([]);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [initialLoading, setInitialLoading] = useState(true);
//   const [isFetching, setIsFetching] = useState(false);

//   // 🔥 NEW
//   const [notSubscribed, setNotSubscribed] = useState(false);

//   const firstLoadDoneRef = useRef(false);
//   const silentResetRef = useRef(false);

//   const fetchPage = useCallback(async () => {
//     if (!username || isFetching || !hasMore || notSubscribed) return;

//     setIsFetching(true);

//     try {
//       const res = await api.get(
//         `/api/user/${username}/menu`,
//         {
//           params: {
//             page,
//             limit: LIMIT,
//             ...(search && { search }),
//           },
//         }
//       );

//       const newMenu = res.data.menu || [];
//       const { hasMore: more } = res.data.pagination || {};

//       setMenu((prev) => {
//         if (page === 1 || silentResetRef.current) {
//           silentResetRef.current = false;
//           return newMenu;
//         }

//         const map = new Map();
//         [...prev, ...newMenu].forEach((cat) => {
//           if (!map.has(cat.id)) map.set(cat.id, { ...cat });
//           else map.get(cat.id).dishes.push(...cat.dishes);
//         });
//         return Array.from(map.values());
//       });

//       const newItems = newMenu.flatMap((cat) => cat.dishes);

//       setItems((prev) =>
//         page === 1 || silentResetRef.current
//           ? newItems
//           : [...prev, ...newItems]
//       );

//       setHasMore(Boolean(more));
//       setPage((p) => p + 1);
//     } catch (err) {
//       // 🔥 HANDLE NOT SUBSCRIBED
//       if (err?.response?.status === 403) {
//         setNotSubscribed(true);
//         setHasMore(false);
//       }
//     } finally {
//       setIsFetching(false);

//       if (!firstLoadDoneRef.current) {
//         setInitialLoading(false);
//         firstLoadDoneRef.current = true;
//       }
//     }
//   }, [username, search, page, hasMore, isFetching, LIMIT, notSubscribed]);

//   // 🔥 SILENT RESET ON SEARCH / USER CHANGE
//   useEffect(() => {
//     if (!username) return;

//     silentResetRef.current = true;
//     setPage(1);
//     setHasMore(true);
//     setNotSubscribed(false); // 🔥 reset
//     firstLoadDoneRef.current = false;
//   }, [username, search]);

//   useEffect(() => {
//     if (page === 1) fetchPage();
//   }, [fetchPage, page]);

//   return {
//     menu,
//     items,
//     fetchPage,
//     hasMore,
//     initialLoading,
//     isFetching,
//     notSubscribed, // 🔥 expose
//   };
// }







// import { useState, useEffect, useCallback, useRef } from "react";
// import api from "../lib/api";

// export default function usePaginatedMenu(
//   username,
//   search,
//   tags = [],
//   LIMIT = 15,
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

//   const fetchingRef = useRef(false);
//   const pageRef = useRef(1);

//   // 🔹 RESET when inputs change
//   useEffect(() => {
//     if (!username) return;

//     setMenu([]);
//     setItems([]);
//     setPage(1);
//     pageRef.current = 1;
//     setHasMore(true);
//     setInitialLoading(true);
//     setNotSubscribed(false);
//     setSubscriptionReason(null);
//   }, [username, search, tags, category]);

//   useEffect(() => {
//   if (!username) return;

//   // 🔥 FIRST PAGE AUTO LOAD
//   fetchPage();
// }, [username, search, tags, category]);


//   const fetchPage = useCallback(async () => {
//     if (!username || fetchingRef.current || !hasMore || notSubscribed) return;

//     fetchingRef.current = true;
//     setIsFetching(true);

//     try {
//       const endpoint = category
//         ? `/api/user/${username}/menu/category/${category}`
//         : `/api/user/${username}/menu`;

//       const res = await api.get(endpoint, {
//         params: {
//           page: pageRef.current,
//           limit: LIMIT,
//           ...(search && { search }),
//           ...(tags.length > 0 && { tags: tags.join(",") }),
//         },
//       });

//       const newMenu = res.data.menu || [];
//       const more = Boolean(res.data.pagination?.hasMore);

//       // ✅ SAFE category merge (NO mutation)
//       setMenu((prev) => {
//         const map = new Map();

//         [...prev, ...newMenu].forEach((cat) => {
//           const id = cat.id || cat.categoryId;

//           if (!map.has(id)) {
//             map.set(id, { ...cat, dishes: [...cat.dishes] });
//           } else {
//             const existing = map.get(id);
//             map.set(id, {
//               ...existing,
//               dishes: [...existing.dishes, ...cat.dishes],
//             });
//           }
//         });

//         return Array.from(map.values());
//       });

//       const newItems = newMenu.flatMap((c) => c.dishes);

//       setItems((prev) => [...prev, ...newItems]);

//       setHasMore(more);
//       pageRef.current += 1;
//       setPage(pageRef.current);
//     } catch (err) {
//       if (err?.response?.status === 403) {
//         setNotSubscribed(true);
//         setHasMore(false);
//         setSubscriptionReason(err.response?.data?.reason || "DEFAULT");
//       }
//     } finally {
//       fetchingRef.current = false;
//       setIsFetching(false);
//       setInitialLoading(false);
//     }
//   }, [username, search, tags, LIMIT, hasMore, notSubscribed, category]);

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






// import { useState, useEffect, useCallback, useRef } from "react";
// import api from "../lib/api";

// export default function usePaginatedMenu(
//   username,
//   search,
//   tags = [],
//   LIMIT = 15,
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
//       const { hasMore: more } = res.data.pagination || {};

//       setMenu((prev) => {
//         if (page === 1 || silentResetRef.current) {
//           silentResetRef.current = false;
//           return newMenu;
//         }

//         const map = new Map();
//         [...prev, ...newMenu].forEach((cat) => {
//           if (!map.has(cat.id)) map.set(cat.id, { ...cat });
//           else map.get(cat.id).dishes.push(...cat.dishes);
//         });
//         return Array.from(map.values());
//       });

//       const newItems = newMenu.flatMap((cat) => cat.dishes);

//       setItems((prev) =>
//         page === 1 || silentResetRef.current
//           ? newItems
//           : [...prev, ...newItems]
//       );

//       setHasMore(Boolean(more));
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

//   useEffect(() => {
//     if (!username) return;

//     silentResetRef.current = true;
//     setPage(1);
//     setHasMore(true);
//     setNotSubscribed(false);
//     setSubscriptionReason(null);
//     firstLoadDoneRef.current = false;
//   }, [username, search, tags, category]);

//   useEffect(() => {
//     if (page === 1) fetchPage();
//   }, [fetchPage, page]);

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
//           const id = cat.id;
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
  const silentResetRef = useRef(false);

  /* ================= FETCH PAGE ================= */
  const fetchPage = useCallback(async () => {
    if (!username || isFetching || !hasMore || notSubscribed) return;

    setIsFetching(true);

    try {
      const endpoint = category
        ? `/api/user/${username}/menu/category/${category}`
        : `/api/user/${username}/menu`;

      const res = await api.get(endpoint, {
        params: {
          page,
          limit: LIMIT,
          ...(search && { search }),
          ...(tags.length > 0 && { tags: tags.join(",") }),
        },
      });

      const newMenu = res.data.menu || [];
      const more = Boolean(res.data.pagination?.hasMore);

      /* ===== IMMUTABLE CATEGORY MERGE ===== */
      setMenu((prev) => {
        if (page === 1 || silentResetRef.current) {
          silentResetRef.current = false;
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
        page === 1 || silentResetRef.current
          ? newItems
          : [...prev, ...newItems]
      );

      setHasMore(more);
      setPage((p) => p + 1);
    } catch (err) {
      if (err?.response?.status === 403) {
        setNotSubscribed(true);
        setHasMore(false);
        setSubscriptionReason(err.response?.data?.reason || "DEFAULT");
      }
    } finally {
      setIsFetching(false);

      if (!firstLoadDoneRef.current) {
        setInitialLoading(false);
        firstLoadDoneRef.current = true;
      }
    }
  }, [
    username,
    search,
    tags,
    page,
    hasMore,
    isFetching,
    LIMIT,
    notSubscribed,
    category,
  ]);

  /* ================= RESET ON FILTER CHANGE ================= */
  useEffect(() => {
    if (!username) return;

    silentResetRef.current = true;
    setPage(1);
    setHasMore(true);
    setNotSubscribed(false);
    setSubscriptionReason(null);
    firstLoadDoneRef.current = false;
  }, [username, search, tags, category]);

  /* ================= FIRST PAGE FETCH ================= */
  useEffect(() => {
    // if (page === 1) {
      fetchPage();
    // }
  }, [page, fetchPage]);

  return {
    menu,
    items,
    fetchPage,
    hasMore,
    initialLoading,
    isFetching,
    notSubscribed,
    subscriptionReason,
  };
}
