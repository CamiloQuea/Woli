import { useRouter } from "next/router";
import React from "react";
import { PostCard } from "../components/PostCard";
import { MainLayout } from "../layout/MainLayout";
import { trpc } from "../utils/trpc";

const Search = () => {
  const { query } = useRouter();

  const { data } = trpc.post.getByWord.useQuery({
    q: (query.q as string) || undefined,
  });
  return (
    <MainLayout>
      <div className="flex h-full justify-between">
        <div className=" left-0  top-16 h-full w-1/4 ">
          OPCIONES PARA INTERACTUAR
        </div>
        <div className="flex h-full w-1/3 flex-col gap-3 py-3">
          {data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className=" right-0 top-16 h-full w-1/4">
          ESPACIO PUBLICITARIO????
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
