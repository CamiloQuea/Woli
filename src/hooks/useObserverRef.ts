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
   
        if (entries[0]?.isIntersecting && hasNextPage) {
         
          onIntersect();
        }
      });
      if (node) intObserver.current.observe(node);
    },
    [hasNextPage, onIntersect]
  );

  return { lastPostElementRef };
};
