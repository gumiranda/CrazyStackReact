import { useEffect } from "react";
import { useAuth, useUi } from "../contexts";

export const useInfiniteFullList = ({ fetchNextPage, hasNextPage, isFetching }) => {
  const { user = null } = useAuth() || {};
  const { setLoading } = useUi() || {};
  useEffect(() => {
    if (user?.role === "owner" && hasNextPage === true && !isFetching) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hasNextPage, isFetching]);
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
};
