import { useCallback, useRef } from "react";

export const useObserverRef = ({
  onIntersect,
  hasNextPage,
}: {
  onIntersect: () => void;
  hasNextPage?: boolean;
}) => {
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback<(node: HTMLDivElement) => void>(
    (node) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        // console.log(hasNextPage);
        if (entries[0]?.isIntersecting && hasNextPage) {
          console.log("Cargando mas posts");
          onIntersect();
        }
      });
      if (node) intObserver.current.observe(node);
    },
    [hasNextPage, onIntersect]
  );

  return { lastPostElementRef };
};
