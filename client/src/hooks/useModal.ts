import React from 'react';

function useModal() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return {isVisible, show, hide};
}

export default useModal;
