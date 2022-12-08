import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { UserIcon } from "../components/icons/UserIcon";
import { PostCard } from "../components/PostCard";
import { useObserverRef } from "../hooks/useObserverRef";
import { MainContentLayout } from "../layout/MainContentLayout";
import { MainLayout } from "../layout/MainLayout";
import { CreatePost } from "../modules/CreatePost";
import { trpc } from "../utils/trpc";

const Profile = () => {
  const { query } = useRouter();

  const { data, refetch, fetchNextPage, hasNextPage } =
    trpc.post.getByUserId.useInfiniteQuery(
      {
        limit: 10,
        userId: query.id as string,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const { data: userInfo } = trpc.user.getById.useQuery(
    {
      id: query.id as string,
    },
    {}
  );

  const { lastPostElementRef } = useObserverRef({
    hasNextPage,
    onIntersect: fetchNextPage,
  });

  return (
    <MainLayout>
      <MainContentLayout
        centerNodes={
          <>
            <div className="flex h-40 items-center justify-center gap-4 rounded-md border bg-white">
              <>
                <UserIcon
                  className="shrink-0 rounded-full"
                  imageUrl={userInfo?.image || undefined}
                />
                <div className="flex flex-col">
                  {
                    <span className="font-medium text-neutral-500">
                      {userInfo?.name ? userInfo?.name : userInfo?.username}
                    </span>
                  }
                  <span className="text-sm text-neutral-400">
                    {userInfo?.email}
                  </span>
                </div>
              </>
            </div>
            <>
              <CreatePost onSuccess={refetch} />
              {data?.pages[0]?.items.length === 0 ? (
                <div className="w-full border bg-white p-5 text-center text-sm  text-neutral-500">
                  No hay publicaciones
                </div>
              ) : null}
              {data?.pages.map((page) =>
                page.items.map((post, j) => {
                  if (page.items.length === j + 1) {
                    return (
                      <PostCard
                        key={post.id}
                        post={post}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        myref={lastPostElementRef as any}
                      />
                    );
                  }
                  return <PostCard key={post.id} post={post} />;
                })
              )}
            </>
          </>
        }
      />
    </MainLayout>
  );
};

export default Profile;
