import type { Post, User } from "@prisma/client";
import moment from "moment";
import React from "react";
import { UserIcon } from "./icons/UserIcon";
import { useForm } from "react-hook-form";
import type { RouterInputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { momentEsp } from "../library/moment";
interface PostProps {
  post: Post & {
    user: User;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myref?: any;
}
moment.locale("es");
export const PostCard = ({ post, myref }: PostProps) => {
  const { data: session } = useSession();

  const { mutate } = trpc.comment.create.useMutation();

  const { data, fetchNextPage, hasNextPage, refetch } =
    trpc.comment.getbyPostId.useInfiniteQuery(
      {
        postId: post.id,
        limit: 4,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const { register, handleSubmit, reset } = useForm<
    RouterInputs["comment"]["create"]
  >({
    defaultValues: {
      postId: post.id,
      content: "",
    },
  });

  const onSubmitComment = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        refetch();
        reset();
      },
    });
  });
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-3 " ref={myref}>
      <div className="rounded-md border bg-white shadow">
        <div className="flex items-center p-3">
          <div className="flex items-center gap-2">
            <UserIcon
              className="mt-1.5 cursor-pointer"
              imageUrl={post.user.image || undefined}
              onClick={() => push(`/${post.userId}`)}
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">
                {post.user.name || post.user.username}
              </p>
              <p className="text-xs text-neutral-500">
                {momentEsp(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>

        <p className="whitespace-pre px-4 pb-4 text-justify text-sm text-neutral-500">
          {post.content}
        </p>
        {/* <div className="h-10 border-t">
          <button className="flex h-full w-full items-center justify-center gap-1 text-sm text-neutral-500 hover:bg-neutral-50">
            <BiCommentDetail className="h-full w-full py-2.5 " />
          </button>
        </div> */}
        {session ? (
          <div className="border-t">
            <form onSubmit={onSubmitComment}>
              <div className="flex items-center gap-2 px-4 py-2">
                <UserIcon
                  className="shrink-0"
                  imageUrl={session.user?.image || undefined}
                />
                <input
                  type="text"
                  className="h-8 grow"
                  autoComplete="off"
                  placeholder="Escribe un comentario..."
                  autoCorrect="off"
                  {...register("content")}
                />
              </div>
            </form>
          </div>
        ) : null}

        <div className="border-t">
          {data?.pages.map((page, i) => {
            if (page.items.length === 0)
              return (
                <div
                  key={i}
                  className="py-3 text-center text-sm  text-neutral-400"
                >
                  No hay comentarios
                </div>
              );

            return page.items.map((comment) => {
              return (
                <div className="flex  gap-2 px-4 py-2" key={comment.id}>
                  <UserIcon
                    className="mt-2 shrink-0 cursor-pointer"
                    imageUrl={comment.user.image || undefined}
                    onClick={() => push(`/${comment.userId}`)}
                  />
                  <div className=" rounded-xl border-[1px] bg-neutral-50  px-3 py-2">
                    <span
                      className="cursor-pointer text-sm font-medium text-neutral-800"
                      onClick={() => push(`/${comment.userId}`)}
                    >
                      {comment.user.name || comment.user.username}
                    </span>
                    <p className="text-sm text-neutral-500 ">
                      {" "}
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            });
          })}
          {hasNextPage ? (
            <div className="border-t">
              <p
                onClick={() => fetchNextPage()}
                className="cursor-pointer p-3 text-center text-sm font-medium text-neutral-500 hover:bg-neutral-50"
              >
                Ver mas comentarios
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
