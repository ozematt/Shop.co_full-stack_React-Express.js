import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { tick } from "../assets";
import { type CommentProps } from "../lib/types";

const Comment = ({ rating, name, text, date }: CommentProps) => {
  //
  ////UI
  return (
    <div className="z-10 my-1 h-[187px] w-[358px] flex-shrink-0 rounded-[20px] p-6 ring-1 ring-black ring-opacity-10 sm:h-[240px] sm:w-[400px] sm:px-[32px] sm:py-[28px] dark:ring-white">
      <Rating
        value={rating}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0 }} />}
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
        readOnly
      />{" "}
      <div className="flex items-center gap-1 pb-1 sm:pb-[12px] sm:pt-1">
        {" "}
        <p className="font-satoshi text-base font-bold sm:text-xl">{name}</p>
        <img src={tick} alt="green tick" width={24} height={24} />
      </div>
      <p className="font-satoshi opacity-60 max-sm:text-[14px]">{text}</p>
      {date && (
        <p className="mt-5 font-satoshi opacity-60 max-sm:text-[14px]">
          Date: {date.slice(0, 10)}
        </p>
      )}
    </div>
  );
};

export default Comment;
