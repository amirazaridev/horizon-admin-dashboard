import { useSearchParams } from "react-router";
import { useRef, useLayoutEffect, useEffect } from "react";

/**
 * Modern pill-style filter with a sliding indicator.
 *
 * A gradient "pill" div smoothly translates to whichever button is
 * currently active. Position is measured via JS (offsetLeft / offsetWidth)
 * so the indicator animates with a CSS transition.
 *
 * Fully backward-compatible — still reads / writes searchParams via
 * react-router and resets pagination.
 */
function Filter({ options = [], filterField }) {
  const [searchParam] = useSearchParams();
  const currentFilter = searchParam.get(filterField) || options[0].value;

  const trackRef = useRef(null);
  const indicatorRef = useRef(null);

  /* Position on first paint (before browser paints, so no flash) */
  useLayoutEffect(() => {
    positionIndicator(trackRef.current, indicatorRef.current);
  }, []);

  /* Re-position whenever a button toggles its `on` class
     OR the track resizes (e.g. language change). */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sync = () => positionIndicator(track, indicatorRef.current);

    // Watch for class changes on buttons (.on toggled)
    const classObserver = new MutationObserver(sync);
    classObserver.observe(track, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    // Watch for size changes (language switch, window resize, etc.)
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(track);

    return () => {
      classObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="relative inline-flex items-center rounded-[11px] border border-border bg-card-2 p-1"
      role="tablist"
    >
      <div
        ref={trackRef}
        className="relative inline-flex items-center gap-[3px]"
      >
        {/* Sliding indicator — lives INSIDE the track so offsetLeft is
            measured relative to the track (its offsetParent). */}
        <div
          ref={indicatorRef}
          className="pointer-events-none absolute top-0 left-0 h-full rounded-lg bg-primary opacity-0 shadow-[0_4px_12px_-4px_rgba(63,39,199,.55)] transition-[transform,width,opacity] duration-250 ease-in-out"
          aria-hidden="true"
        />
        {options.map((option) => (
          <FilterButton
            key={option.value}
            field={filterField}
            value={option.value}
            active={option.value === currentFilter}
          >
            {option.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}

function FilterButton({ children, value, field, active }) {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleClick = () => {
    if (active) return;
    searchParam.set(field, value);
    if (searchParam.get("page")) searchParam.set("page", 1);
    setSearchParam(searchParam);
  };

  return (
    <button
      role="tab"
      aria-selected={active}
      className={`on-filter relative z-10 cursor-pointer whitespace-nowrap rounded-lg border-none bg-transparent px-3.5 py-1.5 font-semibold text-[12.5px] transition-colors duration-200 ${
        active
          ? "on text-white"
          : "text-text-muted hover:text-text"
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

/* ---------- helpers ---------- */

function positionIndicator(track, indicator) {
  if (!track || !indicator) return;
  const active = track.querySelector(".on");
  if (!active) {
    indicator.style.opacity = "0";
    return;
  }
  indicator.style.opacity = "1";
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  indicator.style.width = `${active.offsetWidth}px`;
}

export default Filter;
