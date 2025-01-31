import { arrow } from "../assets";

type RotatingArrowProps = {
  rotateOn: boolean;
};

const RotatingArrow = ({ rotateOn }: RotatingArrowProps) => {
  return (
    <img
      src={arrow}
      width={20}
      height={20}
      alt="arrow"
      className={`${rotateOn ? "rotate-0" : "rotate-180"} cursor-pointer opacity-60 transition duration-200 ease-in-out hover:opacity-100 dark:invert`}
    />
  );
};

export default RotatingArrow;
