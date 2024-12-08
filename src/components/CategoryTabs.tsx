import { ReactElement, useState, useEffect, useRef } from "react";

interface CategoryTabsProps<T extends string> {
  activeTab: T;
  tabs: Record<string, T>;
  onTabSelect: (tab: T) => void;
}

export default function CategoryTabs<T extends string>({
  activeTab,
  tabs,
  onTabSelect,
}: CategoryTabsProps<T>): ReactElement {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(
        `button[data-tab="${activeTab}"]`,
      ) as HTMLElement;

      if (activeButton) {
        const { offsetWidth, offsetLeft } = activeButton;
        setUnderlineStyle({
          width: offsetWidth,
          left: offsetLeft,
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (tab: T) => {
    onTabSelect(tab);
  };

  return (
    <div className="relative w-full">
      <div ref={tabsRef} className="w-full flex border-b border-gray-300">
        {Object.entries(tabs).map(([key, tab]) => (
          <button
            key={key}
            data-tab={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 text-sm font-medium truncate ${
              activeTab === tab ? "text-orange-500" : "text-gray-500 hover:text-orange-500"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <span
        className="absolute rounded-md bottom-0 h-[2px] bg-orange-500 transition-all duration-100"
        style={{ width: underlineStyle.width, left: underlineStyle.left }}
      />
    </div>
  );
}
