'use client';
import { useMemo } from 'react';
import { getDaysOfWeek, isSameDay } from '@/utils/dateHelpers';

export default function WeekStrip({ selectedDate, onSelectDate }) {
  const weekDates = useMemo(() => getDaysOfWeek(new Date()), []);

  return (
    <div className="mb-8 overflow-x-auto px-6 scrollbar-hide">
      <div className="flex justify-between min-w-full gap-3">
        {weekDates.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          return (
            <div 
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={`flex flex-col items-center justify-center min-w-[3.8rem] py-4 rounded-3xl cursor-pointer transition-all ${
                isSelected 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                    : 'bg-transparent text-gray-400 active:bg-gray-50'
              }`}
            >
              <span className="text-xs mb-1 font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                {date.getDate()}
              </span>
              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
