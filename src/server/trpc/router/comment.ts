import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = router({
  getbyPostId: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.string().nullish(),
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.postHasComment.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
        include: {
          user: true,
        },
        where: {
          postId: input.postId,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        postId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.postHasComment.create({
        data: {
          comment: input.content,
          userId: ctx.session.user.id,
          postId: input.postId,
        },
      });
    }),
});
