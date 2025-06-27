import React from 'react';
import { QuestionMarkCircleIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import type { TooltipProps } from '../types';
import { CHART_CONSTANTS } from '../constants';

export const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length && coordinate) {
    const value = payload[0].value;
    const formattedValue = `$${(value / 1000).toFixed(2)}k`;
    const percent = 4.6; // Replace with your logic
    const percentLabel = 'above target'; // Replace with your logic

    // Position the tooltip above the data point
    const style: React.CSSProperties = {
      position: 'absolute',
      left: coordinate.x - CHART_CONSTANTS.TOOLTIP_WIDTH / 2, // center horizontally
      top: coordinate.y - CHART_CONSTANTS.TOOLTIP_HEIGHT - CHART_CONSTANTS.TOOLTIP_MARGIN,
      pointerEvents: 'none',
      zIndex: 1000,
    };

    return (
      <div 
        style={style} 
        className={`w-[${CHART_CONSTANTS.TOOLTIP_WIDTH}px] h-[${CHART_CONSTANTS.TOOLTIP_HEIGHT}px] border border-[#525252] rounded-[5px] p-5 bg-[#22232433] backdrop-blur-[10px] flex flex-col gap-[10px]`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-bold text-lg">{formattedValue}</span>
          <QuestionMarkCircleIcon className="w-4 h-4 text-[#BBBBBB]" />
        </div>
        <div className="flex items-center gap-2 text-[#B6FF6C] text-sm">
          <span className="w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#D4FF3F] bg-[#232323]">
            <ArrowUpIcon className="w-4 h-4 text-[#D4FF3F]" />
          </span>
          <span>{percent}% {percentLabel}</span>
        </div>
      </div>
    );
  }
  return null;
}; 