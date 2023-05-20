import FsLightbox from "fslightbox-react";
import { useState } from "react";
export default function ({ images, thumbnail }) {
  const [toggler, setToggler] = useState(false);
  return (
    <div className="h-72  flex items-center">
      <img
        src={thumbnail}
        onClick={() => setToggler(!toggler)}
        className="w-full max-h-full object-contain"
        alt="random"
      />
      <FsLightbox toggler={toggler} sources={[...images]} />
    </div>
  );
}
