import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useMenuOpen = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = useCallback(
    (id: string) => {
      navigate("/");
      setMenuOpen(false);
      // Scrolling to section id after page load
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // delay to make sure the page has loaded
    },
    [navigate],
  );

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    // start listening when menu is open
    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Swipe gesture support
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

      // Check if the offset is more horizontal than vertical
      if (
        Math.abs(touchCurrentX - touchStartX) >
        Math.abs(touchCurrentY - touchStartY)
      ) {
        if (touchStartX - touchCurrentX > 50) {
          // Swipe on left 50px
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
    handleMenuItemClick,
    menuProps: {
      onTouchStart: (e: React.TouchEvent) => {
        // Prevent touch events from bubbling
        e.stopPropagation();
      },
    },
  };
};

export default useMenuOpen;
