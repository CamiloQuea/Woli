import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Logo from "../components/icons/Logo";
import { PostCard } from "../components/PostCard";
import { useObserverRef } from "../hooks/useObserverRef";
import { MainContentLayout } from "../layout/MainContentLayout";
import { MainLayout } from "../layout/MainLayout";
import { CreatePost } from "../modules/CreatePost";
import { trpc } from "../utils/trpc";

interface ItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  name: string;
}

const Item = ({ icon, name, ...props }: ItemProps) => {
  return (
    <button
      className="relative flex items-center p-3 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
      {...props}
    >
      <div className="absolute flex h-6 w-6 items-center justify-center">
        {icon}
      </div>

      <span className="ml-12 font-bold uppercase ">{name}</span>
    </button>
  );
};

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

  return (
    <>
      <MainLayout>
        <MainContentLayout
          leftNodes={
            session ? (
              <div className="flex w-full flex-col divide-y-[1px]">
                <span className="p-2 text-xl font-bold">Acceso rápido</span>
                <Item
                  icon={<AiOutlineUnorderedList className="h-full w-full" />}
                  name={"peticiones"}
                  onClick={() => push("/reciclaje")}
                />
                
                {/* <div className="flex ">
                  <UserIcon className="" />
                  <span className=" text-lg  text-neutral-500">
                    {session?.user?.name}
                  </span>
                </div> */}
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
