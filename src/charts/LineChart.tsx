import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import type { ChartDataPoint, TooltipProps } from '../types';
import { CHART_CONSTANTS } from '../constants';
import { CustomTooltip } from './CustomTooltip';

interface LineChartProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
  isResponsive?: boolean;
  showGrid?: boolean;
  showReferenceLine?: boolean;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = CHART_CONSTANTS.CHART_HEIGHT,
  isResponsive = false,
  showGrid = true,
  showReferenceLine = true,
  className = '',
}) => {
  const margin = isResponsive ? CHART_CONSTANTS.RESPONSIVE_MARGIN : CHART_CONSTANTS.CHART_MARGIN;
  const xPadding = isResponsive ? CHART_CONSTANTS.AXIS_CONFIG.RESPONSIVE_X_PADDING : CHART_CONSTANTS.AXIS_CONFIG.X_PADDING;
  const yWidth = isResponsive ? CHART_CONSTANTS.AXIS_CONFIG.RESPONSIVE_Y_WIDTH : CHART_CONSTANTS.AXIS_CONFIG.Y_WIDTH;
  const fontSize = isResponsive ? CHART_CONSTANTS.AXIS_CONFIG.RESPONSIVE_FONT_SIZE : CHART_CONSTANTS.AXIS_CONFIG.FONT_SIZE;
  const dotRadius = isResponsive ? CHART_CONSTANTS.DOT_CONFIG.RESPONSIVE_RADIUS : CHART_CONSTANTS.DOT_CONFIG.RADIUS;
  const activeDotRadius = isResponsive ? CHART_CONSTANTS.DOT_CONFIG.RESPONSIVE_ACTIVE_RADIUS : CHART_CONSTANTS.DOT_CONFIG.ACTIVE_RADIUS;
  const strokeWidth = isResponsive ? CHART_CONSTANTS.LINE_CONFIG.RESPONSIVE_STROKE_WIDTH : CHART_CONSTANTS.LINE_CONFIG.STROKE_WIDTH;

  return (
    <div className={`border border-[#525252] rounded-[5px] bg-[#222324] shadow-[0_4px_4px_0_#00000040] flex flex-col w-full ${className}`}
      style={{
        height: isResponsive ? CHART_CONSTANTS.CHART_MIN_HEIGHT : height,
        minHeight: CHART_CONSTANTS.CHART_MIN_HEIGHT,
        maxHeight: CHART_CONSTANTS.CHART_MAX_HEIGHT,
        padding: 0,
        paddingRight: isResponsive ? 20 : CHART_CONSTANTS.CHART_PADDING_RIGHT,
        margin: 0,
      }}
    >
      {title && (
        <div className="flex items-center justify-between px-3 pt-4 lg:pt-6 pb-2">
          <span className="text-xl lg:text-2xl font-bold text-white">{title}</span>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center pb-4 lg:pb-6 px-3 lg:px-6">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={margin}
          >
            {showGrid && <CartesianGrid stroke={CHART_CONSTANTS.COLORS.GRID} strokeDasharray="3 3" />}
            <XAxis
              dataKey="month"
              padding={xPadding}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text fill={CHART_CONSTANTS.COLORS.WHITE} fontSize={fontSize} textAnchor="middle" dy={20}>
                    {payload.value}
                  </text>
                  {payload.value === 'May' && (
                    <text fill={CHART_CONSTANTS.COLORS.GRAY} fontSize={fontSize - 3} textAnchor="middle" dy={36}>
                      Now
                    </text>
                  )}
                </g>
              )}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              domain={[0, 100000]}
              ticks={[20000, 40000, 60000, 80000, 100000]}
              allowDataOverflow={true}
              tickFormatter={v => `$${v / 1000}K`}
              tick={{ fill: CHART_CONSTANTS.COLORS.WHITE, fontSize }}
              axisLine={false}
              tickLine={false}
              width={yWidth}
            />
            <Tooltip
              content={(props: TooltipProps) => <CustomTooltip {...props} />}
              cursor={{ stroke: CHART_CONSTANTS.COLORS.PRIMARY, strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={CHART_CONSTANTS.COLORS.PRIMARY}
              strokeWidth={strokeWidth}
              dot={{ 
                r: dotRadius, 
                stroke: CHART_CONSTANTS.COLORS.PRIMARY, 
                strokeWidth: CHART_CONSTANTS.DOT_CONFIG.STROKE_WIDTH, 
                fill: CHART_CONSTANTS.COLORS.BACKGROUND 
              }}
              activeDot={{ 
                r: activeDotRadius, 
                fill: CHART_CONSTANTS.COLORS.PRIMARY, 
                stroke: CHART_CONSTANTS.COLORS.WHITE, 
                strokeWidth: CHART_CONSTANTS.DOT_CONFIG.STROKE_WIDTH 
              }}
            />
            {showReferenceLine && (
              <ReferenceLine
                stroke={CHART_CONSTANTS.COLORS.PRIMARY}
                strokeDasharray={CHART_CONSTANTS.REFERENCE_LINE.STROKE_DASHARRAY}
                strokeWidth={CHART_CONSTANTS.REFERENCE_LINE.STROKE_WIDTH}
              />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 