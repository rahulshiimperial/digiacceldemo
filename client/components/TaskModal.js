'use client';
import { useState, useEffect } from 'react';
import { X, Clock, Calendar as CalendarIcon } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    startTime: '09:00',
    endTime: '11:00',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        date: new Date(editingTask.dueDate).toISOString().slice(0, 10),
        startTime: editingTask.startTime || '09:00',
        endTime: editingTask.endTime || '10:00',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 10),
        startTime: '09:00',
        endTime: '11:00',
      });
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullDate = new Date(formData.date);
    onSave({
      ...formData,
      status: editingTask ? editingTask.status : 'Open',
      dueDate: fullDate.toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white w-full sm:max-w-md max-h-[90dvh] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-gray-100 rounded-full active:bg-gray-200">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-6 pb-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Task title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 font-medium placeholder-gray-400 text-base"
                placeholder="Doing Homework"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={e => setFormData({...formData, startTime: e.target.value})}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 font-medium text-base"
                    />
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">End Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={e => setFormData({...formData, endTime: e.target.value})}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 font-medium text-base"
                    />
                  </div>
               </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Set Date</label>
              <div className="relative">
                 <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                 <input
                   type="date"
                   value={formData.date}
                   onChange={e => setFormData({...formData, date: e.target.value})}
                   className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 font-medium text-base"
                 />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none placeholder-gray-400 text-base"
                placeholder="Add Description"
              />
            </div>
          </div>
          
          <div className="pt-2 sticky bottom-0 bg-white pb-2">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 touch-manipulation"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
