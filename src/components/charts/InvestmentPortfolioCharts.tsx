import React from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Clock, Target, Activity,
} from 'lucide-react';

// Mock data for portfolio performance - Trading chart format
export const portfolioData = [
  {
    date: 'Jan 1', value: 10000, open: 9800, high: 10200, low: 9700, close: 10000, volume: 150,
  },
  {
    date: 'Jan 15', value: 12500, open: 10000, high: 12800, low: 9950, close: 12500, volume: 280,
  },
  {
    date: 'Feb 1', value: 11800, open: 12500, high: 12600, low: 11500, close: 11800, volume: 190,
  },
  {
    date: 'Feb 15', value: 15200, open: 11800, high: 15400, low: 11600, close: 15200, volume: 340,
  },
  {
    date: 'Mar 1', value: 18700, open: 15200, high: 19000, low: 15100, close: 18700, volume: 420,
  },
  {
    date: 'Mar 15', value: 22100, open: 18700, high: 22500, low: 18500, close: 22100, volume: 390,
  },
  {
    date: 'Apr 1', value: 25800, open: 22100, high: 26000, low: 21800, close: 25800, volume: 480,
  },
];

// Support and Resistance levels
export const supportResistance = [
  { value: 12000, type: 'support' },
  { value: 20000, type: 'resistance' },
  { value: 16000, type: 'support' },
];

export function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-600 rounded p-3 shadow-lg">
        <p className="text-gray-300 mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">Open:</span>
            <span className="text-white">
              $
              {data.open.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">High:</span>
            <span className="text-green-400">
              $
              {data.high.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">Low:</span>
            <span className="text-red-400">
              $
              {data.low.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">Close:</span>
            <span className={data.close >= data.open ? 'text-green-400' : 'text-red-400'}>
              $
              {data.close.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-6 pt-2 border-t border-gray-600">
            <span className="text-gray-400">Change:</span>
            <span className={data.close >= data.open ? 'text-green-400' : 'text-red-400'}>
              {data.close >= data.open ? '+' : ''}
              $
              {(data.close - data.open).toLocaleString()}
              (
              {(((data.close - data.open) / data.open) * 100).toFixed(2)}
              %)
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function CustomBarShape(props: any) {
  const {
    payload, x, y, width, height,
  } = props;
  if (!payload) return null;

  const {
    open, high, low, close,
  } = payload;
  const isGreen = close >= open;
  const color = isGreen ? '#10B981' : '#EF4444';

  // Calculate chart scale
  const dataMin = Math.min(...portfolioData.map((d) => d.low)) - 1000;
  const dataMax = Math.max(...portfolioData.map((d) => d.high)) + 1000;
  const range = dataMax - dataMin;

  // Convert prices to pixel positions
  const yScale = (value: number) => y + height - (((value - dataMin) / range) * height);

  const highY = yScale(high);
  const lowY = yScale(low);
  const openY = yScale(open);
  const closeY = yScale(close);

  const wickX = x + width / 2;
  const bodyTop = Math.min(openY, closeY);
  const bodyHeight = Math.abs(openY - closeY);

  return (
    <g>
      {/* High-Low Wick */}
      <line
        x1={wickX}
        y1={highY}
        x2={wickX}
        y2={lowY}
        stroke={color}
        strokeWidth={1}
        opacity={0.8}
      />
      {/* Open-Close Body */}
      <rect
        x={x + width * 0.2}
        y={bodyTop}
        width={width * 0.6}
        height={Math.max(bodyHeight, 2)}
        fill={isGreen ? 'transparent' : color}
        stroke={color}
        strokeWidth={1.5}
        fillOpacity={isGreen ? 0 : 1}
      />
    </g>
  );
}
