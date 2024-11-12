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

  useEffect(() => {
    updateScrollButtons();
  }, []);

  return (
    <div className="bg-box-bg rounded-3xl h-min w-full flex flex-col pl-4">
      <div className="w-full flex py-4">
        <span className="mr-auto text-lg font-bs font-light">{title}</span>
        <span className="flex flex-row gap-4 mr-2">
          <span
            onClick={scrollLeft}
            className={`${canScrollLeft ? "cursor-pointer hover:bg-gray-200" : ""}`}>
            <ArrowLeft isActiv={canScrollLeft} />
          </span>
          <span
            onClick={scrollRight}
            className={`${canScrollRight ? "cursor-pointer hover:bg-gray-200" : ""}`}>
            <ArrowRight isActiv={canScrollRight} />
          </span>
        </span>
      </div>
      <div
        onScroll={updateScrollButtons}
        ref={scrollContainerRef}
        className="flex flex-nowrap overflow-x-scroll w-full scroll-smooth">
        {children}
      </div>
    </div>
  );
}
