import { useState } from 'react';

export default function taskContentHeaderHook() {
  const [isOver, setIsOver] = useState(null);

  const handlePopoverOpen = (event) => {
    setIsOver(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setIsOver(null);
  };

  return {
    isOver,
    handlePopoverClose,
    handlePopoverOpen,
  };
}
