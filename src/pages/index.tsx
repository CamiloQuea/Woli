import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "../components/icons/Logo";
import { UserIcon } from "../components/icons/UserIcon";
import { PostCard } from "../components/PostCard";
import { useObserverRef } from "../hooks/useObserverRef";
import { MainContentLayout } from "../layout/MainContentLayout";
import { MainLayout } from "../layout/MainLayout";
import { CreatePost } from "../modules/CreatePost";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, refetch, fetchNextPage, hasNextPage } =
    trpc.post.getPosts.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const { lastPostElementRef } = useObserverRef({
    hasNextPage,
    onIntersect: fetchNextPage,
  });
  const { data: session } = useSession();
  const { push } = useRouter();

  // useMemo(async () => {
  //   const data = await fetch("www.google.com");

  //   const page = await data.text();

  //   const regexMeta = /<meta[^>]+>/g;
  //   const regexTittle = /(?<=(<title>))(.|\n)*?(?=<\/title>)/g;
  //   console.log(page);
  //   const matches = page.match(regexTittle);

  //   console.log(matches);
  // }, []);

  return (
    <>
      <MainLayout>
        <MainContentLayout
          leftNodes={
            session ? (
              <div className="h-96 w-full rounded-xl border-[1px] bg-white shadow">
                <div className="relative h-32 rounded-t-xl bg-gradient-to-b from-cyan-500 to-neutral-50">
                  <UserIcon className="absolute inset-x-0 -bottom-2 mx-auto scale-150" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="mt-5 w-full text-center text-lg  text-neutral-500">
                    {session?.user?.name}
                  </span>

                  <ul className="mt-2  px-4 text-center">
                    <li className="flex cursor-pointer select-none items-center justify-between border-y py-2 hover:bg-neutral-50">
                      <span
                        className=" w-full text-center "
                        onClick={() => push("/reciclaje")}
                      >
                        Peticiones
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null
          }
          centerNodes={
            <div className="flex flex-col gap-4 overflow-y-auto">
              <CreatePost onSuccess={refetch} />
              {data?.pages[0]?.items.length === 0 ? (
                <div className="h-full overflow-hidden py-10 text-center">
                  <h1 className="text-2xl font-medium">
                    Gracias por usar nuestra pagina
                  </h1>
                  <div className=" pt-4 text-neutral-500">
                    Por el momento no hay publicaciones
                  </div>
                  <Logo className="mx-auto mt-20 w-2/4 animate-spin-slow text-blue-700 duration-1000" />
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
              {data?.pages[0]?.items.length !== 0 && !hasNextPage ? (
                <div className="h-full overflow-hidden py-10 text-center">
                  <h1 className="text-2xl font-medium">
                    Gracias por usar nuestra pagina
                  </h1>
                  <div className=" pt-4 text-neutral-500">
                    No hay mas publicaciones
                  </div>
                  <Logo className="mx-auto mt-20 w-2/4 animate-spin-slow text-blue-700 duration-1000" />
                </div>
              ) : null}
            </div>
          }
        />
      </MainLayout>
    </>
  );
};

export default Home;
