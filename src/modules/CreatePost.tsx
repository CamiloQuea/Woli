import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { UserIcon } from "../components/icons/UserIcon";
import { Modal } from "../components/utils/Modal";
import { useControl } from "../hooks/useControl";
import { trpc } from "../utils/trpc";

interface CreatePostProps {
  onSuccess?: () => void;
}

export const CreatePost = ({ onSuccess }: CreatePostProps) => {
  const { data: session } = useSession();

  const create = trpc.post.create.useMutation();

  const { isOpen, onClose, onOpen } = useControl();
  const { register, handleSubmit, reset } = useForm<{
    content: string;
  }>();

  const onSubmit = handleSubmit((data) => {
    create.mutate(
      {
        content: data.content,
      },
      {
        onSuccess: () => {
          onSuccess?.();
          onClose();
          reset();
        },
      }
    );
  });

  return (
    <>
      {session ? (
        <div className="flex items-center rounded-md border bg-white p-3 ">
          <div className="flex  grow gap-2 ">
            <UserIcon className="mt-1.5 shrink-0" />
            <div className="flex w-full flex-col justify-center gap-3">
              <div
                onClick={onOpen}
                className="peer  w-full resize-none rounded-md border bg-neutral-50 p-2 text-sm text-neutral-500 outline-none cursor-pointer"
              >
                Crea una publicación...
              </div>
            </div>
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                reset();
              }}
              tittle="Crear publicación"
              showCloseButton
              className="w-[500px]"
            >
              <form
                className="flex  flex-col justify-center gap-3 p-3 "
                onSubmit={onSubmit}
              >
                <textarea
                  {...register("content")}
                  placeholder="Contenido..."
                  className="h-48 w-full resize-none border-transparent bg-transparent p-2 text-sm text-neutral-500 outline-none ring-0"
                />
                <button
                  className="ml-auto  rounded-xl bg-red-600 px-3 py-2 text-white focus:outline-transparent focus:ring-transparent"
                  type="submit"
                >
                  Publicar
                </button>
              </form>
            </Modal>
          </div>
          <div></div>
        </div>
      ) : null}
    </>
  );
};
