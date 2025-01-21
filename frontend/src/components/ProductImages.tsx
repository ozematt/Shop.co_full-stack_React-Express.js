import { useEffect, useState } from "react";
import { type ProductImagesProps } from "../lib/types";

const ProductImages = ({ images }: ProductImagesProps) => {
  //
  ///DATA
  const [bigImg, setBigImg] = useState<string>("");

  ////LOGIC
  useEffect(() => {
    if (images) {
      setBigImg(images[0]);
      return;
    }
  }, [images]);

  ////UI
  return (
    <div className="mx-auto flex w-full max-w-[610px] gap-[14px] max-[1430px]:flex-col-reverse">
      {" "}
      <div className="flex justify-between gap-[14px] min-[1430px]:flex-col">
        {images.slice(0, 3).map((img) => (
          <img
            key={img}
            src={img}
            alt="image"
            onClick={() => setBigImg(img)}
            className="h-full max-h-[106px] max-w-[111px] rounded-[20px] bg-grayBG object-contain ring-black hover:ring-1 md:max-h-[167px] md:max-w-[152px] dark:bg-zinc-900 dark:ring-white"
          />
        ))}
      </div>
      {/* main IMG */}
      <img
        src={bigImg}
        alt="main image"
        className="w-full rounded-[20px] bg-grayBG object-contain min-[1430px]:max-w-[444px] dark:bg-zinc-900"
      />
    </div>
  );
};

export default ProductImages;
