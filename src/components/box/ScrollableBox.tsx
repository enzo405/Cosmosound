import React, { ReactElement, useEffect, useRef, useState } from "react";
import ArrowLeft from "components/icons/ArrowLeft";
import ArrowRight from "components/icons/ArrowRight";
import { titleStyle } from "./styles";

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

  useEffect(() => {
    updateScrollButtons();
  }, []);

  return (
    <div className="bg-box-bg rounded-3xl h-min w-full flex flex-col pl-4">
      <div className="w-full flex py-4">
        <span className={titleStyle}>{title}</span>
      </div>
      <div
        onScroll={updateScrollButtons}
        ref={scrollContainerRef}
        className="relative flex flex-nowrap overflow-x-scroll w-full scroll-smooth items-center">
        <span
          onClick={scrollLeft}
          className={`sticky left-0 flex items-center h-1/2 p-3 rounded-full ${canScrollLeft ? "cursor-pointer bg-gray-200" : ""}`}>
          <ArrowLeft isActiv={canScrollLeft} />
        </span>
        {children}
        <span
          onClick={scrollRight}
          className={`sticky right-0 flex items-center h-1/2 p-3 rounded-full ${canScrollRight ? "cursor-pointer bg-gray-200" : ""}`}>
          <ArrowRight isActiv={canScrollRight} />
        </span>
      </div>
    </div>
  );
}
