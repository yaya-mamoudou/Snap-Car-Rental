"use client";
import { useEffect } from "react";
import { useGlobalStore } from "~/store/globalStore";
import { api } from "~/trpc/react";
import { ProfileType } from "~/types";

export default function GetUser() {
  const setUser = useGlobalStore((state) => state.setUser);
  const { isFetching, refetch, data } = api.users.me.useQuery(undefined, {
    enabled: false,
  });
  useEffect(() => {
    refetch().then((res) => {
      setUser(res.data as ProfileType);
    });
  }, []);

  //   useGlobalStore.setState({ state: { me: user as ProfileType } });
  return null;
}
