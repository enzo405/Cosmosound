import React, { ReactElement, useEffect, useRef, useState } from "react";
import ArrowLeft from "components/icons/ArrowLeft";
import ArrowRight from "components/icons/ArrowRight";

interface ScrollableBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function ScrollableBox({ title, children }: ScrollableBoxProps): ReactElement {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const onWheelHandler = (event: React.WheelEvent<HTMLDivElement>) => {
    // Vertical Mouse Wheel
    let scrollBy;
    if (event.deltaY !== 0) {
      scrollBy = event.deltaY < 0 ? -40 : 40;
    }
    // Horizontal Mouse Wheel
    else if (event.deltaX) {
      scrollBy = event.deltaX < 0 ? -40 : 40;
    }
    scrollContainerRef.current?.scrollBy({ left: scrollBy, behavior: "instant" });
  };

  // On component load
  useEffect(() => {
    updateScrollButtons();
  }, []);

  return (
    <div className="bg-box-bg rounded-3xl h-full w-full flex flex-col pb-4">
      <div className="w-full h-min flex py-4 pl-4">
        <span className="mr-auto text-2xl font-bs font-light">{title}</span>
        <span className="flex flex-row gap-3 mr-4">
          <span
            onClick={scrollLeft}
            className={`rounded-full flex justify-center items-center w-7 h-7 ${canScrollLeft ? "cursor-pointer hover:bg-gray-200" : ""} `}>
            <ArrowLeft isActiv={canScrollLeft} />
          </span>
          <span
            onClick={scrollRight}
            className={`rounded-full flex justify-center items-center w-7 h-7 ${canScrollRight ? "cursor-pointer hover:bg-gray-200" : ""}`}>
            <ArrowRight isActiv={canScrollRight} />
          </span>
        </span>
      </div>
      <div
        onScroll={updateScrollButtons}
        onWheel={onWheelHandler}
        ref={scrollContainerRef}
        className="scrollbar-thin flex flex-nowrap overflow-x-scroll w-full h-full scroll-smooth pl-4 gap-2">
        {children}
      </div>
    </div>
  );
}
