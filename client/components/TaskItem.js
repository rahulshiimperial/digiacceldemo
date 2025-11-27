'use client'; 
import { Trash2, Edit2, Check } from 'lucide-react';

const Checkbox = ({ checked, onClick }) => (
  <div 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`w-6 h-6 rounded flex-shrink-0 border-2 flex items-center justify-center cursor-pointer transition-colors ${
      checked 
        ? 'bg-blue-600 border-blue-600' 
        : 'border-blue-300 bg-transparent'
    }`}
  >
    {checked && <Check size={14} className="text-white" strokeWidth={3} />}
  </div>
);

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0 group active:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
      <Checkbox checked={task.status === 'Completed'} onClick={() => onToggle(task._id)} />
      
      <span className={`flex-1 font-medium text-gray-800 text-base ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
        {task.title}
      </span>

      <div className="flex gap-3">
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} 
          className="text-gray-300 hover:text-red-500 active:text-red-600 p-2 -m-2 transition-colors touch-manipulation"
        >
          <Trash2 size={20} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(task); }} 
          className="text-gray-300 hover:text-blue-500 active:text-blue-600 p-2 -m-2 transition-colors touch-manipulation"
        >
          <Edit2 size={20} />
        </button>
      </div>
    </div>
  );
}