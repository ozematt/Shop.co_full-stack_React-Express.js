import { useState } from "react";

const useFilterWindow = () => {
  const [filterWindowOpen, setFilterWindowOpen] = useState(false);

  const handleFilterOpen = () => {
    setFilterWindowOpen((prev) => !prev);
  };

  return { filterWindowOpen, handleFilterOpen };
};

export default useFilterWindow;
