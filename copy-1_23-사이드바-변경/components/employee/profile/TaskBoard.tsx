
import React, { useState } from 'react';
import { CheckSquare, Trash2, Plus } from 'lucide-react';
import { Task } from '../../CreatorShared';

interface TaskBoardProps {
    tasks: Task[];
    onAddTask?: (title: string) => void;
    onToggleTask?: (id: string) => void;
    onDeleteTask?: (id: string) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleTaskSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTaskTitle.trim() && onAddTask) {
            onAddTask(newTaskTitle.trim());
            setNewTaskTitle('');
            setIsAddingTask(false);
        }
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-100 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <CheckSquare size={20} className="text-gray-700"/>
                    업무 현황
                    <span className="text-sm font-normal text-gray-500 ml-1">({tasks.length})</span>
                </h3>
                <div className="flex gap-4 text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        진행중 <span className="font-bold text-gray-900 ml-1">{tasks.filter(t => t.status === '진행중').length}</span>
                    </span>
                    <span className="text-gray-600 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        완료됨 <span className="font-bold text-gray-900 ml-1">{tasks.filter(t => t.status === '완료됨').length}</span>
                    </span>
                </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500">
                    <div className="flex-1">이름</div>
                    <div className="w-24">상태</div>
                    <div className="w-24 text-right pr-2">관리</div>
                </div>
                <div className="divide-y divide-gray-100">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group cursor-pointer text-sm">
                            <div className="flex-1 text-gray-800 flex items-center gap-2">
                                <button 
                                    onClick={() => onToggleTask && onToggleTask(task.id)}
                                    className={`${task.status === '완료됨' ? 'text-[#00C471]' : 'text-gray-300 hover:text-gray-500'}`}
                                >
                                    <CheckSquare size={16} />
                                </button>
                                <span className={task.status === '완료됨' ? 'text-gray-400 line-through' : 'font-medium'}>
                                    {task.title}
                                </span>
                            </div>
                            <div className="w-24">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                    task.status === '진행중' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    'bg-green-50 text-green-700 border-green-200'
                                }`}>
                                    {task.status}
                                </span>
                            </div>
                            <div className="w-24 flex items-center justify-end">
                                <button 
                                    onClick={() => onDeleteTask && onDeleteTask(task.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="업무 삭제"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {!isAddingTask ? (
                        <div 
                            onClick={() => setIsAddingTask(true)}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer text-gray-400 text-sm group"
                        >
                            <Plus size={14} className="mr-2 group-hover:text-gray-600" /> 
                            <span className="group-hover:text-gray-600">새로 만들기...</span>
                        </div>
                    ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50/50">
                            <div className="flex-1 flex items-center gap-2">
                                <div className="text-gray-400"><CheckSquare size={16} /></div>
                                <input 
                                    autoFocus
                                    className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-900 placeholder-gray-400"
                                    placeholder="업무 내용을 입력하고 Enter를 누르세요"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    onKeyDown={handleTaskSubmit}
                                    onBlur={() => {
                                        if (!newTaskTitle.trim()) setIsAddingTask(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
