import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "../../helpers/classNames";

const colors: string[] = [
  'bg-gray-600',
  'bg-red-600',
  'bg-orange-600',
  'bg-amber-600',
  'bg-green-600',
  'bg-cyan-600',
  'bg-blue-600',
  'bg-blue-600',
  'bg-fuchsia-600',
  'bg-pink-600',
  'bg-rose-600',
];
const breakpoints: number[] = [
  500,
  600,
  700,
  800,
  900,
  1000,
  1100,
  1200,
  1300,
  1400,
  1500,
];

export const ColorResponsive = () => {
  const debounceId = useRef(0);
  const [color, setColor] = useState('bg-white-600');

  const alteraCor = useCallback(() => {
    const width = window.innerWidth;
    const index = breakpoints.findIndex(breakpoint => width < breakpoint);
    const breakpointIndex = index === -1 ? 0 : index;
    setColor(colors[breakpointIndex]);
  }, []);

  useEffect(() => {
    const debounceColor = () => {
      clearTimeout(debounceId.current);
      debounceId.current = window.setTimeout(alteraCor, 500);
    }
    window.addEventListener('resize', debounceColor);
    return () => {
      window.removeEventListener('resize', debounceColor);
    }
  }, [alteraCor]);


  console.log('==== re-render')
  return (
    <div className={
      classNames(
        color,
        'flex items-center justify-center w-screen h-screen bg-'
      )
    }>
      <p className="text-5xl text-white md:text-7xl lg:text-9xl">
        { color.replace('bg-', '').replace('-600', '') }
      </p>
    </div>
  );
}