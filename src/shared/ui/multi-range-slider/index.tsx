import { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react';
import './style.css';
import { NumericRange } from 'shared/ui/multi-range-slider/types';

export interface MultiRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onChange: (values: NumericRange) => void;
}
const MultiRangeSlider = ({
  min,
  max,
  step = 1,
  onChange,
  maxValue,
  minValue,
}: MultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState<number>(minValue);
  const [maxVal, setMaxVal] = useState<number>(maxValue);
  const minValRef = useRef(minValue);
  const maxValRef = useRef(maxValue);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  useLayoutEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent, range.current]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        step={step}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - step);
          setMinVal(value);
          minValRef.current = value;
        }}
        className='thumb thumb--left'
        style={{ zIndex: minVal > max - 100 ? '5' : undefined }}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        step={step}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + step);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className='thumb thumb--right'
      />

      <div className='slider'>
        <div className='slider__track' />
        <div ref={range} className='slider__range' />
      </div>
    </>
  );
};

export default MultiRangeSlider;
