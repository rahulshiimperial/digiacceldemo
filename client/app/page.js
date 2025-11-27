'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Calendar as CalendarIcon, Settings, Bell, ChevronLeft } from 'lucide-react';

// Components
import WelcomeScreen from '@/components/WelcomeScreen';
import TaskItem from '@/components/TaskItem';
import TaskModal from '@/components/TaskModal';
import WeekStrip from '@/components/WeekStrip';
import WeeklyProgress from '@/components/WeeklyProgress';

// Utils
import { getTasks, createTask, updateTask, deleteTask } from '@/utils/api';
import { isSameDay } from '@/utils/dateHelpers';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Modal & Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 1. Load Data from Backend
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  // 2. Computed Data
  const todaysTasks = useMemo(() => {
    return tasks.filter(t => isSameDay(new Date(t.dueDate), selectedDate));
  }, [tasks, selectedDate]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, searchQuery]);

  // 3. Handlers
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, taskData);
        setTasks(prev => prev.map(t => t._id === updated._id ? updated : t));
      } else {
        const created = await createTask(taskData);
        setTasks(prev => [...prev, created]);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task", error);
      alert("Failed to save task. Is the backend running?");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(prev => prev.filter(t => t._id !== id));
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    const newStatus = task.status === 'Completed' ? 'Open' : 'Completed';
    
    // Optimistic Update
    setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
    
    try {
      await updateTask(id, { status: newStatus });
    } catch (error) {
      console.error("Status update failed", error);
      loadTasks(); // Revert on error
    }
  };

  // 4. Render Views

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />;
  }

  // SEARCH OVERLAY
  if (isSearching) {
    return (
      <div className="w-full h-[100dvh] bg-white sm:max-w-md sm:mx-auto sm:my-8 sm:rounded-[40px] sm:shadow-2xl overflow-hidden sm:h-[800px] border-gray-900/10 sm:border-[8px] flex flex-col relative animate-in fade-in duration-200">
        <div className="p-6 pb-2 pt-12 sm:pt-8 flex-shrink-0">
          <button onClick={() => setIsSearching(false)} className="mb-4 p-2 -ml-2 rounded-full hover:bg-gray-100">
             <ChevronLeft size={28} className="text-gray-800" />
          </button>
          
          <div className="relative">
            <input 
              autoFocus
              type="text"
              placeholder="Finish..."
              className="w-full border border-gray-200 rounded-xl py-4 pl-4 pr-12 outline-none focus:border-blue-500 text-gray-700 text-base shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="px-6 flex-1 overflow-y-auto scrollbar-hide">
          {searchResults.length > 0 ? (
            searchResults.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onToggle={handleToggleStatus} 
                onDelete={handleDeleteTask}
                onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
              />
            ))
          ) : (
            searchQuery && <div className="text-center text-gray-400 mt-10">No tasks found</div>
          )}
        </div>
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div className="w-full h-[100dvh] bg-white sm:max-w-md sm:mx-auto sm:my-8 sm:rounded-[40px] sm:shadow-2xl overflow-hidden sm:h-[800px] border-gray-900/10 sm:border-[8px] flex flex-col relative">
      
      {/* Header */}
      <div className="pt-12 sm:pt-8 pb-4 px-6 flex items-center justify-between bg-white z-10 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform cursor-pointer">
            <Settings size={20} className="text-gray-600" />
        </div>
        <div className="flex gap-4">
             <button onClick={() => setIsSearching(true)} className="p-2 -mr-2 rounded-full active:bg-gray-50 transition-colors">
                <Search size={26} className="text-gray-800" />
             </button>
             <button className="p-2 rounded-full active:bg-gray-50 transition-colors">
                 <Bell size={26} className="text-gray-800" />
             </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
        
        {/* Search Placeholder */}
        <div className="px-6 mb-6">
            <div 
                onClick={() => setIsSearching(true)}
                className="bg-white border border-gray-200 rounded-2xl py-3 px-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors shadow-sm"
            >
                <span className="text-gray-400 text-sm">Search for a task</span>
                <Search size={20} className="text-gray-400" />
            </div>
        </div>

        {/* Components */}
        <WeekStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        
        <WeeklyProgress tasks={tasks} />

        {/* Tasks Today */}
        <div className="px-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Tasks Today</h2>
                <button className="text-blue-600 text-sm font-bold active:text-blue-800 py-2">View All</button>
            </div>

            <div className="space-y-1">
                {todaysTasks.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                             <CalendarIcon className="text-gray-300" size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">No tasks for {selectedDate.toLocaleDateString()}</p>
                    </div>
                ) : (
                    todaysTasks.map(task => (
                        <TaskItem 
                            key={task._id} 
                            task={task} 
                            onToggle={handleToggleStatus} 
                            onDelete={handleDeleteTask}
                            onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                        />
                    ))
                )}
            </div>
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-20">
         <button 
            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
            className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-blue-400 pointer-events-auto hover:scale-105 active:scale-90 transition-all touch-manipulation"
         >
            <Plus size={32} />
         </button>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
}
