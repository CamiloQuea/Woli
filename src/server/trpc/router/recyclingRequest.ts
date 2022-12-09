import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const recyclingRequestRouter = router({
  getAllMine: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.recyclingRequest.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.recyclingRequest.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        avgMaterialWeight: z.number(),
        material: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.recyclingRequest.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
          avgMaterialWeight: input.avgMaterialWeight,
          material: input.material,
        },
      });
    }),
});
