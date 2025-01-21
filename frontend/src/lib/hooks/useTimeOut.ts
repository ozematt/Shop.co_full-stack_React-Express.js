import { useEffect, useState } from "react";

const useTimeOut = (delay: number) => {
  //
  ////DATA
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  ////LOGIC
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReadyToShow(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return { isReadyToShow };
};

export default useTimeOut;
