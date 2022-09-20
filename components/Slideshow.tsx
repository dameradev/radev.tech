
import React, { useState } from "react";
import Image from "next/image";
function SlideShow({ slideshowData, className }) {
  const [index, setIndex] = useState(0);

  const length = slideshowData.length;
  console.log(index);
  console.log(length);
  const handleNext = () => {
    index === length - 1 ? setIndex(0) : setIndex(index + 1);
  };
  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1);

  return (
    <div className={`relative h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh] w-[80%] ${className}`}>
      {slideshowData[index] ? <Image
        layout='fill'
        src={slideshowData[index]}
      // alt={slideshowData[index]?.alt}
      />
      :  ""}

      <div className="absolute left-[10px] bottom-[-30px] flex justify-between w-[100%] ">
        <button className='btn text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 p-3 rounded-full uppercase' onClick={() => handlePrevious()}>Previous</button>
        <button className='btn mr-4 text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 p-3 rounded-full uppercase'onClick={() => handleNext()}>Next</button>
      </div>
    </div>
  );
}
export default SlideShow;
