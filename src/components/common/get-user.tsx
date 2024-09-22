"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { authRouter } from "~/helpers";
import { useGlobalStore } from "~/store/globalStore";
import { api } from "~/trpc/react";
import { ProfileType } from "~/types";

export default function GetUser() {
  const setUser = useGlobalStore((state) => state.setUser);
  const pathname = usePathname();
  const router = useRouter();

  const { error, data } = api.users.me.useQuery(undefined, {
    retry: 0,
  });

  useEffect(() => {
    data && setUser(data as ProfileType);
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.data?.code === "UNAUTHORIZED") {
        if (!pathname.startsWith("/login") && !pathname.startsWith("/register"))
          authRouter(router, "/login");
      }
    }
  }, [error]);

  return null;
}
