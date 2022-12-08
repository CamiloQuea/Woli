import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = router({
  getPosts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
        include: {
          user: true,
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
  getByWord: publicProcedure
    .input(
      z.object({
        q: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!input.q) return [];

      return ctx.prisma.post.findMany({
        where: {
          content: {
            contains: input.q,
            mode: "insensitive",
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        cursor: z.string().nullish(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
        include: {
          user: true,
        },
        where: {
          userId: input.userId,
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
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.post.create({
        data: {
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
      });

      console.log({ post });

      if (!post) return null;

      console.log(
        "USER",
        ctx.session.user.id !== post.userId,
        ctx.session.user.id,
        post.userId
      );
      if (ctx.session.user.id !== post.userId) return null;

      return await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
