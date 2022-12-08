import { router } from "../trpc";
import { authRouter } from "./auth";
import { commentRouter } from "./comment";
import { postRouter } from "./post";
import { recyclingRequestRouter } from "./recyclingRequest";
import { userRouter } from "./user";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  comment: commentRouter,
  user: userRouter,
  recyclingRequest: recyclingRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
