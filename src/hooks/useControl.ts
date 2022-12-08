import { useCallback, useState } from 'react';

interface useControlProps {
  state: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const initialState: useControlProps = {
  state: false,
};

export const useControl = ({ state }: useControlProps = initialState) => {
  const [isOpen, SetIsOpen] = useState(state);

  const toggle = () => {
    SetIsOpen((value) => !value);
  };

  const onClose = useCallback(() => {
    SetIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    SetIsOpen(true);
  }, []);

  return {
    isOpen,
    toggle,
    onClose,
    onOpen,
  };
};
