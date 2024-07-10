import {useState} from 'react';

function useButton() {
  const [isPress, setPress] = useState(false);

  const handlePressIn = () => {
    setPress(true);
  };

  const handlePressOut = () => {
    setPress(false);
  };

  return {isPress, handlePressIn, handlePressOut};
}

export default useButton;
