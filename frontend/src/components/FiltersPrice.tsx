import { useEffect, useState } from "react";
import { FilterHeader } from ".";

type FiltersPriceProps = {
  toggle: boolean;
};

const FiltersPrice = ({ toggle }: FiltersPriceProps) => {
  const [open, setOpen] = useState(true); //price filter open/close

  const [priceRange, setPriceRange] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    if (toggle) return setOpen(true);
    setOpen(false);
  }, [toggle]);

  return (
    <>
      <FilterHeader title="Price" onClick={() => setOpen(!open)} state={open} />
      {open && (
        <div className="mt-4 flex gap-2">
          <input
            value={priceRange.from}
            name="from"
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="h-7 w-full max-w-[120px] rounded-sm pl-2 ring-1 ring-black ring-opacity-20 placeholder:text-sm focus:outline-none focus:ring-black dark:bg-zinc-700"
            placeholder="from:"
          />
          <input
            value={priceRange.to}
            name="to"
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="h-7 w-full max-w-[120px] rounded-sm pl-2 ring-1 ring-black ring-opacity-20 placeholder:text-sm focus:outline-none focus:ring-black dark:bg-zinc-700"
            placeholder="to:"
          />
        </div>
      )}
    </>
  );
};

export default FiltersPrice;
