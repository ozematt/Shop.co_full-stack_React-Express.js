import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useMenuOpen = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = useCallback(
    (id: string) => {
      navigate("/");
      setMenuOpen(false);
      // Scrolling to element id after page load
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // delay to make sure the page has loaded
    },
    [navigate],
  );

  // Obsługa klawisza Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Obsługa gestu przesunięcia
  useEffect(() => {
    if (!menuOpen) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      // Sprawdź czy przesunięcie jest bardziej poziome niż pionowe
      if (
        Math.abs(touchCurrentX - touchStartX) >
        Math.abs(touchCurrentY - touchStartY)
      ) {
        if (touchStartX - touchCurrentX > 50) {
          // Swipe w lewo o 50px
          setMenuOpen(false);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return {
    menuOpen,
    setMenuOpen,
    toggleMenu,
    handleClick,
    menuProps: {
      onTouchStart: (e: React.TouchEvent) => {
        // Zapobiegaj bubble'owaniu eventów dotykowych
        e.stopPropagation();
      },
    },
  };
};

export default useMenuOpen;
