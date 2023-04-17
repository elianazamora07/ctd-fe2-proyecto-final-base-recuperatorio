import { useState } from "react";

type UseToggleType = {
  isOpen: boolean;
  toggle: () => void;
};

const useToggle = (initialValue = false): UseToggleType => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, toggle };
};

export default useToggle;