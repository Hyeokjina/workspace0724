
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, MoreHorizontal, ChevronDown, Check, Filter, Palette } from 'lucide-react';
import { User, UserRole, ScheduleEvent, ScheduleTemplate } from '../types';

// Color Palette Definitions
const EVENT_COLORS: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: '파랑' },
  green: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: '초록' },
  red: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: '빨강' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', label: '노랑' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500', label: '보라' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500', label: '회색' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500', label: '오렌지' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500', label: '분홍' },
};

interface ScheduleViewProps {
  user: User;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: ScheduleEvent[];
  onUpdateEvents: (events: ScheduleEvent[]) => void;
  templates: ScheduleTemplate[];
  onUpdateTemplates: (templates: ScheduleTemplate[]) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  user, currentDate, onDateChange, events, onUpdateEvents, templates, onUpdateTemplates 
}) => {
  const isAdmin = user.role === UserRole.ADMIN;
  
  // Filter State
  const [filter, setFilter] = useState<string>('all'); // 'all' or templateId

  // UI State
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  // Event Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    templateId: string;
    title: string;
    content: string;
    date: string;
  }>({
    templateId: 'company',
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (offset: number) => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };
  
  const goToToday = () => {
    onDateChange(new Date());
  };

  const openAddModal = (dateStr?: string, templateId?: string) => {
      let safeTemplateId = templateId || (isAdmin ? 'company' : 'personal');
      if (safeTemplateId === 'company' && !isAdmin) safeTemplateId = 'personal';

      setNewEvent(prev => ({ 
          ...prev, 
          date: dateStr || prev.date,
          templateId: safeTemplateId
      }));
      setIsModalOpen(true);
      setIsTemplateMenuOpen(false); 
      setIsOptionsMenuOpen(false);
  }

  // Event Handlers
  const handleAddEvent = () => {
    if (!newEvent.title) return alert('일정 제목을 입력해주세요.');
    if (newEvent.templateId === 'company' && !isAdmin) return alert('회사 일정은 관리자만 등록할 수 있습니다.');
    
    onUpdateEvents([
      ...events,
      {
        id: Date.now(),
        ...newEvent,
        ownerId: user.id // 현재 로그인한 사용자의 ID 저장
      }
    ]);
    setIsModalOpen(false);
    // Reset
    setNewEvent(prev => ({
      templateId: isAdmin ? templates[0].id : 'personal',
      title: '',
      content: '',
      date: prev.date
    }));
  };

  const handleDeleteEvent = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const targetEvent = events.find(evt => evt.id === id);
    if (!targetEvent) return;

    if (targetEvent.templateId === 'company' && !isAdmin) {
        alert('회사 일정은 관리자만 삭제할 수 있습니다.');
        return;
    }

    if (window.confirm('일정을 삭제하시겠습니까?')) {
      onUpdateEvents(events.filter(evt => evt.id !== id));
    }
  };

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Render Logic
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty slots for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/10 border-r border-b border-gray-200"></div>);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = new Date().toISOString().split('T')[0] === dateStr;
    
    // Filter logic
    const dayEvents = events.filter(e => {
        // 1. 날짜가 맞는지 확인
        if (e.date !== dateStr) return false;
        
        // 2. 권한 확인 (본인 일정인가? 또는 공용 회사 일정인가?)
        const isMine = e.ownerId === user.id;
        const isCompany = e.templateId === 'company';
        
        if (!isMine && !isCompany) return false;

        // 3. 상단 보기 옵션 필터 확인
        if (filter === 'all') return true;
        return e.templateId === filter;
    });

    days.push(
      <div 
        key={d} 
        className="min-h-[120px] bg-white border-r border-b border-gray-200 p-1 relative group hover:bg-gray-50/50 transition-colors cursor-pointer"
        onClick={() => openAddModal(dateStr)}
      >
        <div className="flex justify-between items-start mb-1 p-1">
            <span 
                className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-[4px]
                ${isToday ? 'bg-[#EB5757] text-white' : 'text-gray-500'}`}
            >
            {d}
            </span>
        </div>

        <div className="space-y-1 px-1">
          {dayEvents.map(evt => {
            const template = templates.find(t => t.id === evt.templateId) || templates[0];
            const colors = EVENT_COLORS[template.color] || EVENT_COLORS.gray;
            return (
                <div 
                key={evt.id} 
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={`
                    px-2 py-1 rounded-[3px] text-xs flex justify-between items-center group/item shadow-sm
                    transition-all hover:brightness-95
                    ${colors.bg} ${colors.text}
                `}
                title={evt.content}
                >
                <span className="truncate font-medium">{evt.title}</span>
                {(isAdmin || evt.templateId !== 'company') && (
                    <button 
                        onClick={(e) => handleDeleteEvent(e, evt.id)}
                        className="opacity-0 group-hover/item:opacity-100 text-gray-500 hover:text-red-500 ml-1.5"
                    >
                        <X size={10} />
                    </button>
                )}
                </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen overflow-hidden bg-white flex flex-col relative" onClick={() => { setIsTemplateMenuOpen(false); setIsOptionsMenuOpen(false); }}>
      {/* Notion-style Header */}
      <div className="px-8 py-4 flex justify-between items-center border-b border-gray-200 shrink-0 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            나의 일정
          </h1>
          <div className="flex items-center gap-1">
             <button onClick={() => changeMonth(-1)} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"><ChevronLeft size={18} /></button>
             <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
             </span>
             <button onClick={() => changeMonth(1)} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"><ChevronRight size={18} /></button>
          </div>
          <button 
            onClick={goToToday}
            className="text-xs text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-md shadow-sm transition-all"
          >
            오늘
          </button>
        </div>
        
        <div className="flex items-center gap-3">
            {filter !== 'all' && (
                <div className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                    <Filter size={12} />
                    <span>{templates.find(t => t.id === filter)?.name || '필터됨'}</span>
                    <button onClick={() => setFilter('all')} className="ml-1 hover:text-gray-900"><X size={12} /></button>
                </div>
            )}

            <div className="relative" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={() => { setIsOptionsMenuOpen(!isOptionsMenuOpen); setIsTemplateMenuOpen(false); }}
                    className={`text-gray-400 hover:bg-gray-100 p-1.5 rounded transition-colors ${isOptionsMenuOpen ? 'bg-gray-100 text-gray-600' : ''}`}
                    title="보기 옵션"
                >
                    <Filter size={18} />
                </button>
                
                {isOptionsMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-30">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">보기 옵션</div>
                        <button 
                            onClick={() => { setFilter('all'); setIsOptionsMenuOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                        >
                            <span>전체 보기</span>
                            {filter === 'all' && <Check size={14} className="text-blue-500" />}
                        </button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        {templates.map(t => (
                            <button 
                                key={t.id}
                                onClick={() => { setFilter(t.id); setIsOptionsMenuOpen(false); }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                            >
                                <span>{t.name}</span>
                                {filter === t.id && <Check size={14} className="text-blue-500" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative" onClick={e => e.stopPropagation()}>
                <div className="flex items-center rounded bg-[#2383E2] text-white shadow-sm hover:bg-blue-600 transition-colors">
                    <button 
                        onClick={() => openAddModal()}
                        className="px-3 py-1.5 text-sm font-medium border-r border-blue-400/50 hover:bg-blue-700 rounded-l transition-colors"
                    >
                        새로 만들기
                    </button>
                    <button 
                        onClick={() => { setIsTemplateMenuOpen(!isTemplateMenuOpen); setIsOptionsMenuOpen(false); }}
                        className="px-1.5 py-2 hover:bg-blue-700 rounded-r transition-colors"
                    >
                        <ChevronDown size={14} />
                    </button>
                </div>

                {isTemplateMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-30">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">템플릿 선택</div>
                        <div className="max-h-60 overflow-y-auto">
                            {templates.map(t => {
                                if (t.id === 'company' && !isAdmin) return null;
                                return (
                                    <button 
                                        key={t.id}
                                        onClick={() => openAddModal(undefined, t.id)}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <span className={`w-2 h-2 rounded-full ${EVENT_COLORS[t.color]?.dot || 'bg-gray-500'}`}></span>
                                        {t.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="flex-1 overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-[1600px] mx-auto border-l border-t border-gray-200 bg-white">
            <div className="grid grid-cols-7 border-b border-gray-200">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                <div key={day} className={`py-2 px-3 text-xs font-medium border-r border-gray-200 ${i === 0 ? 'text-red-500' : 'text-gray-400'}`}>
                {day}
                </div>
            ))}
            </div>

            <div className="grid grid-cols-7 border-b border-gray-200">
             {days}
            </div>
        </div>
      </div>

      {/* Event Add/Edit Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]"
          onClick={handleModalClose}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-200" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                 <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">일정 추가</span>
                 {(() => {
                    const t = templates.find(temp => temp.id === newEvent.templateId);
                    if (t) {
                        return <span className={`text-xs px-1.5 py-0.5 rounded ${EVENT_COLORS[t.color]?.bg || 'bg-gray-100'} ${EVENT_COLORS[t.color]?.text || 'text-gray-600'}`}>{t.name}</span>
                    }
                    return null;
                 })()}
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 p-1">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <input 
                  type="text"
                  placeholder="제목 없음"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-4">
                  <div className="flex items-start">
                      <div className="w-24 flex items-center gap-2 text-gray-500 text-sm mt-1">
                          <span>🏷️</span> 종류
                      </div>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {templates.map(t => {
                            if (t.id === 'company' && !isAdmin) return null;
                            return (
                                <button 
                                    key={t.id}
                                    type="button"
                                    onClick={() => setNewEvent({...newEvent, templateId: t.id})}
                                    className={`
                                        px-2 py-0.5 text-sm rounded hover:brightness-95 transition-colors border border-transparent
                                        ${newEvent.templateId === t.id 
                                            ? `${EVENT_COLORS[t.color]?.bg || 'bg-gray-100'} ${EVENT_COLORS[t.color]?.text || 'text-gray-600'} border-${t.color}-200` 
                                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {t.name}
                                </button>
                            );
                        })}
                      </div>
                  </div>

                  <div className="flex items-center">
                      <div className="w-24 flex items-center gap-2 text-gray-500 text-sm">
                          <span>📅</span> 날짜
                      </div>
                      <input 
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="text-sm text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none py-0.5"
                      />
                  </div>

                  <div className="flex items-start">
                      <div className="w-24 flex items-center gap-2 text-gray-500 text-sm mt-1">
                          <span>📝</span> 내용
                      </div>
                      <textarea 
                        rows={3}
                        placeholder="설명 추가..."
                        value={newEvent.content}
                        onChange={(e) => setNewEvent({...newEvent, content: e.target.value})}
                        className="flex-1 text-sm text-gray-700 border border-gray-200 rounded-md p-2 focus:border-blue-500 focus:outline-none resize-none"
                      />
                  </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-gray-50 flex justify-end">
              <button 
                onClick={handleAddEvent}
                className="px-4 py-2 bg-[#2383E2] text-white text-sm font-bold rounded-lg hover:bg-blue-600 shadow-md transition-all active:scale-95"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
