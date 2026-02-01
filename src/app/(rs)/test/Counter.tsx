"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

type Props = {
  data: { name: string; age: number }[];
  pointer?: number;
};

export default function Counter({ data }: Props) {
  const router = useRouter();

  const posts = useMemo(() => {
    console.log("heavy process is interacting. ");
    return data.map((ls) => ({ ...ls, isActive: true }));
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refreshing the page.");
      router.refresh();
    }, 3000);

    return () => {
      console.log("clear the interval");
      clearInterval(interval);
    };
  });

  useEffect(() => {
    console.log("component mounted");

    return () => {
      console.log("component unmounted");
    };
  }, []);

  return (
    <div>
      <h1>Total Posts: {posts.length}</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
