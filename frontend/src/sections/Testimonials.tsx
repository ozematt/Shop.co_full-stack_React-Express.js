import { useMediaQuery } from "@mui/material";
import { comments } from "../constants";
import { useCallback, useState } from "react";
import { arrowRight, arrowLeft } from "../assets";
import { Comment } from "../components";

const Testimonials = () => {
  //
  ////DATA
  const [currentIndex, setCurrentIndex] = useState(0);

  const smallDevices = useMediaQuery("(max-width:640px)");

  ////LOGIC
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < comments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, []);

  ////UI
  return (
    <>
      <section className="relative overflow-hidden px-4 sm:px-[100px]">
        <div className="flex items-end justify-between pb-[40px] pt-[80px]">
          {" "}
          <h2 className="font-integralCFBold text-[32px] max-sm:leading-9 sm:text-5xl">
            Our happy customers
          </h2>
          <div className="flex-shrink-0">
            {" "}
            <button onClick={handlePrev}>
              <img src={arrowLeft} alt="" width={24} height={24} />
            </button>
            <button className="pl-4" onClick={handleNext}>
              <img src={arrowRight} alt="" width={24} height={24} />
            </button>
          </div>
        </div>

        <div
          className="flex gap-1 transition-transform duration-300 ease-in-out sm:gap-5"
          style={{
            transform: `translateX(-${
              currentIndex * (smallDevices ? 362 : 420)
            }px)`,
          }}
        >
          {comments.map((comment) => (
            <Comment key={comment.name} {...comment} />
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full backdrop-blur-[2px] sm:w-[100px]"></div>
        <div className="absolute right-0 top-0 h-full backdrop-blur-[2px] sm:w-[100px]"></div>
      </section>
    </>
  );
};

export default Testimonials;
