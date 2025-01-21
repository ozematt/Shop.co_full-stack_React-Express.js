import { brands } from "../constants";

const BrandBar = () => {
  //
  ////UI
  return (
    <section className="flex h-[122px] items-center justify-center gap-10 bg-black px-4 sm:px-[100px] dark:bg-grayBG">
      {brands.map((brand) => (
        <img
          src={brand.img}
          alt={brand.name}
          key={brand.name}
          className="aspect-[3/2] h-[50%] w-[15%] object-contain contrast-200 grayscale invert filter max-[974px]:last:hidden max-md:first:hidden dark:invert-0"
        />
      ))}
    </section>
  );
};

export default BrandBar;
