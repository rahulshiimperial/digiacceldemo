'use client';
import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

export default function WeeklyProgress({ tasks }) {
  const weeklyStats = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = tasks.filter(t => t.status === 'Open').length;
    const total = completed + pending;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, pending, percentage };
  }, [tasks]);

  return (
    <div className="px-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Progress</h2>
      
      <div className="flex gap-4 mb-5">
          {/* Completed Card */}
          <div className="flex-1 bg-blue-50/50 p-4 rounded-[20px] relative overflow-hidden active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-3">
                  <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                     <Check size={22} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold bg-white px-2 py-1 rounded-full shadow-sm">This Week</span>
              </div>
              <div>
                  <span className="text-xs text-gray-500 font-bold block mb-1">Task Complete</span>
                  <span className="text-3xl font-extrabold text-gray-800">{weeklyStats.completed}</span>
              </div>
          </div>

          {/* Pending Card */}
          <div className="flex-1 bg-red-50/50 p-4 rounded-[20px] relative overflow-hidden active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-3">
                  <div className="bg-red-100 p-2.5 rounded-xl text-red-500">
                     <X size={22} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold bg-white px-2 py-1 rounded-full shadow-sm">This Week</span>
              </div>
              <div>
                  <span className="text-xs text-gray-500 font-bold block mb-1">Task Pending</span>
                  <span className="text-3xl font-extrabold text-gray-800">{weeklyStats.pending}</span>
              </div>
          </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-blue-100 h-6 rounded-xl overflow-hidden flex relative">
          <div 
              className="bg-blue-600 h-full transition-all duration-700 ease-out" 
              style={{ width: `${weeklyStats.percentage}%` }}
          ></div>
      </div>
    </div>
  );
}