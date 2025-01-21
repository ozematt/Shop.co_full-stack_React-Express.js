import { useEffect, useState } from "react";
import { type UsePanelOpenProps } from "../types";

const usePanelOpen = ({ refValue }: UsePanelOpenProps) => {
  //
  ////DATA
  const [open, setOpen] = useState(false);

  ////LOGIC
  // close panel when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refValue.current &&
        !refValue.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // clearing event after component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { open, setOpen };
};

export default usePanelOpen;
