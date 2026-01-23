
import React, { useState, useEffect } from 'react';
import { 
  User, CalendarIcon, Users, Plus, User as UserIcon, X, Search, CheckCircle2, ChevronDown, Hash, FileText, ImageIcon, Monitor, Smartphone, ChevronLeft, CheckSquare, Megaphone, DollarSign, Ban, AlertCircle, Link as LinkIcon, Trash2, Activity, Scale, FileSpreadsheet, ShieldCheck, Send, Check, Clock
} from 'lucide-react';
import { User as UserType, UserRole, SupportRequest } from '../types';
import { 
    Creator, Task, CreatorEvent, AdProposal, INITIAL_TASKS, INITIAL_EVENTS, INITIAL_AD_PROPOSALS,
    renderPlatformIcon, CreatorCalendar, CreatorHealthView, HealthRecord, IssueLog, getCreatorColorStyles
} from './CreatorShared';

// --- Sub-component: Creator Detail View ---
const CreatorDetailView = ({ 
    creator, 
    tasks, 
    events, 
    onBack, 
    onAddEvent, 
    onEventClick,
    onAddTask,
    onToggleTask,
    onDeleteTask
}: { 
    creator: Creator, 
    tasks: Task[], 
    events: CreatorEvent[], 
    onBack: () => void,
    onAddEvent: (date: string) => void,
    onEventClick: (event: CreatorEvent) => void,
    onAddTask: (title: string) => void,
    onToggleTask: (taskId: string) => void,
    onDeleteTask: (taskId: string) => void
}) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    
    const handleTaskSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTaskTitle.trim()) {
            onAddTask(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    };

    return (
        <div className="bg-white relative animate-[fadeIn_0.2s_ease-out]">
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-600">목록으로 돌아가기</span>
                </div>
            </div>

            {/* Cover & Avatar Wrapper - Fixed Clipping Issue */}
            <div className="relative mb-12">
                {/* Cover Image Container */}
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden shadow-sm">
                    {creator.coverUrl ? (
                        <img src={creator.coverUrl} alt="cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-gray-300 flex flex-col items-center">
                            <ImageIcon size={32} />
                            <span className="text-xs mt-2">커버 이미지 없음</span>
                        </div>
                    )}
                </div>
                
                {/* Avatar - Outside overflow-hidden but within relative wrapper */}
                <div className="absolute -bottom-10 left-8 z-10">
                     <div className="w-24 h-24 rounded-lg border-4 border-white shadow-md overflow-hidden bg-white">
                        {creator.avatarUrl ? (
                            <img src={creator.avatarUrl} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-5 flex items-center justify-center text-gray-400">
                                <UserIcon size={40} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

             {/* Header Info */}
             <div className="pl-36 mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{creator.name}</h1>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Monitor size={14}/> {creator.platform}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><Users size={14}/> {creator.subscribers}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className={`text-xs font-bold ${creator.status === '활동중' ? 'text-[#00C471]' : 'text-gray-500'}`}>
                            {creator.status}
                        </span>
                        {creator.contactInfo && (
                            <>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-gray-500 flex items-center gap-1"><Smartphone size={12}/> {creator.contactInfo}</span>
                            </>
                        )}
                    </div>
                </div>
             </div>

             <div className="h-px bg-gray-200 w-full mb-8"></div>

             {/* Tasks Section */}
             <div className="animate-[fadeIn_0.2s_ease-out]">
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
                
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                   <div className="flex items-center bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500">
                      <div className="flex-1">이름</div>
                      <div className="w-24">상태</div>
                      <div className="w-24">담당자</div>
                   </div>
                   <div className="divide-y divide-gray-100">
                      {tasks.map(task => (
                         <div key={task.id} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group cursor-pointer text-sm">
                            <div className="flex-1 text-gray-800 flex items-center gap-2">
                               <button 
                                    onClick={() => onToggleTask(task.id)}
                                    className={`${task.status === '완료됨' ? 'text-[#00C471]' : 'text-gray-300 hover:text-gray-500'}`}
                               >
                                   <CheckSquare size={16} />
                               </button>
                               <span className={task.status === '완료됨' ? 'text-gray-400 line-through' : ''}>
                                   {task.title}
                               </span>
                            </div>
                            <div className="w-24">
                               <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium border ${
                                   task.status === '진행중' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                   'bg-green-50 text-green-700 border-green-200'
                               }`}>
                                  {task.status}
                               </span>
                            </div>
                            <div className="w-24 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-orange-400 text-white flex items-center justify-center text-[9px] font-bold">
                                    {task.assignee.charAt(0)}
                                    </div>
                                    <span className="text-gray-600 text-xs">{task.assignee}</span>
                                </div>
                                <button 
                                    onClick={() => onDeleteTask(task.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="삭제"
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
        </div>
    );
}

// --- Main Employee Component ---
interface EmployeeCreatorViewProps {
    user: UserType;
    creators: Creator[];
    onUpdateCreators: (creators: Creator[]) => void;
    // Health Props
    healthRecords: HealthRecord[];
    onUpdateHealthRecords: (records: HealthRecord[]) => void;
    issueLogs: IssueLog[];
    onUpdateIssueLogs: (logs: IssueLog[]) => void;
    // Event Props
    events: CreatorEvent[];
    onUpdateEvents: (events: CreatorEvent[]) => void;
    // Support Props
    supportRequests?: SupportRequest[];
    onAddSupportRequest?: (request: SupportRequest) => void;
    // Task Props
    allTasks: Task[];
    onAddTask: (title: string, creatorId: string) => void;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    activeTab?: 'calendar' | 'list' | 'ads' | 'health' | 'support';
}

export const EmployeeCreatorView = ({ 
    user, 
    creators, 
    onUpdateCreators,
    healthRecords,
    onUpdateHealthRecords,
    issueLogs,
    onUpdateIssueLogs,
    events,
    onUpdateEvents,
    supportRequests = [],
    onAddSupportRequest,
    allTasks,
    onAddTask,
    onToggleTask,
    onDeleteTask,
    activeTab = 'calendar'
}: EmployeeCreatorViewProps) => {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [adProposals, setAdProposals] = useState<AdProposal[]>(INITIAL_AD_PROPOSALS);
  const [adFilter, setAdFilter] = useState<'all' | 'pending' | 'history'>('pending');

  // Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });

  // Modal States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false); 
  const [supportModal, setSupportModal] = useState<{ open: boolean, type: 'legal' | 'tax' }>({ open: false, type: 'legal' });
  
  const [selectedEvent, setSelectedEvent] = useState<CreatorEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');

  // Support Modal Form
  const [supportForm, setSupportForm] = useState<{ creatorId: string, title: string, content: string }>({ creatorId: '', title: '', content: '' });

  const [newEventData, setNewEventData] = useState<{
      creatorId: string;
      title: string;
      date: string;
      type: 'live' | 'content' | 'meeting' | 'other' | 'joint';
      content: string;
      partnerCreators: string[];
  }>({
      creatorId: '',
      title: '',
      date: '',
      type: 'content',
      content: '',
      partnerCreators: []
  });

  const [newAdData, setNewAdData] = useState<{
      brandName: string;
      campaignTitle: string;
      budget: string;
      creatorId: string;
      description: string;
      targetDate: string;
  }>({
      brandName: '',
      campaignTitle: '',
      budget: '',
      creatorId: '',
      description: '',
      targetDate: new Date().toISOString().split('T')[0]
  });

  const selectedCreator = creators.find(c => c.id === selectedCreatorId);
  const creatorEvents = selectedCreatorId ? events.filter(e => e.creatorId === selectedCreatorId) : [];

  const myCreators = creators.filter(c => c.manager === user.name || user.role === UserRole.ADMIN);
  const creatorsMap = creators.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<string, Creator>);
  const myCreatorsMap = myCreators.reduce((acc, c) => ({...acc, [c.id]: c}), {} as Record<string, Creator>);
  const allMyEvents = events.filter(e => myCreatorsMap[e.creatorId]);
  const hasCreators = myCreators.length > 0;

  const potentialPartners = creators.filter(c => c.id !== newEventData.creatorId && c.name.includes(partnerSearchQuery));
  const mySupportRequests = supportRequests.filter(req => myCreatorsMap[req.creatorId]);

  const handleBack = () => setSelectedCreatorId(null);
  const handleEventClick = (event: CreatorEvent) => setSelectedEvent(event);

  const handleDeleteEvent = (eventId: string) => {
      if (window.confirm('이 일정을 삭제하시겠습니까?')) {
          onUpdateEvents(events.filter(e => e.id !== eventId));
          setSelectedEvent(null);
          showToastMessage('일정이 삭제되었습니다.');
      }
  };

  const handleOpenEventModal = (date?: string) => {
      if (myCreators.length === 0) return;
      setNewEventData({
          creatorId: selectedCreatorId || (myCreators[0] ? myCreators[0].id : ''),
          title: '',
          date: date || new Date().toISOString().split('T')[0],
          type: 'content',
          content: '',
          partnerCreators: []
      });
      setPartnerSearchQuery('');
      setIsEventModalOpen(true);
  };

  const togglePartnerCreator = (creatorId: string) => {
      setNewEventData(prev => {
          const exists = prev.partnerCreators.includes(creatorId);
          return {
              ...prev,
              partnerCreators: exists 
                  ? prev.partnerCreators.filter(id => id !== creatorId)
                  : [...prev.partnerCreators, creatorId]
          };
      });
  };

  const handleSaveEvent = () => {
      if (!newEventData.title || !newEventData.creatorId) {
          alert('제목과 내용을 모두 입력해주세요.');
          return;
      }
      const newEvent: CreatorEvent = {
          id: Date.now().toString(),
          creatorId: newEventData.creatorId,
          title: newEventData.title,
          date: newEventData.date,
          type: newEventData.type,
          content: newEventData.content,
          partnerCreators: newEventData.type === 'joint' ? newEventData.partnerCreators : []
      };
      onUpdateEvents([...events, newEvent]);
      setIsEventModalOpen(false);
  };

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ show: true, message, type });
      setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
      }, 3000);
  };

  const handleAdDecision = (id: string, decision: 'accepted' | 'rejected') => {
      const ad = adProposals.find(a => a.id === id);
      setAdProposals(prev => prev.map(p => p.id === id ? { ...p, status: decision } : p));
      if (decision === 'accepted' && ad) {
          const newEvent: CreatorEvent = {
              id: Date.now().toString(),
              creatorId: ad.creatorId,
              title: `[광고] ${ad.campaignTitle}`,
              date: ad.targetDate || new Date().toISOString().split('T')[0],
              type: 'content',
              content: `광고주: ${ad.brandName}\n예산: ${ad.budget}\n내용: ${ad.description}`
          };
          onUpdateEvents([...events, newEvent]);
          showToastMessage('제안이 수락되어 일정에 등록되었습니다.');
      } else {
          showToastMessage('제안이 거절되었습니다.', 'error');
      }
  };

  const handleAddAd = () => {
      if (!newAdData.brandName || !newAdData.campaignTitle || !newAdData.budget || !newAdData.creatorId || !newAdData.targetDate) {
          alert('필수 정보를 모두 입력해주세요.');
          return;
      }
      const newAd: AdProposal = {
          id: Date.now().toString(),
          creatorId: newAdData.creatorId,
          brandName: newAdData.brandName,
          campaignTitle: newAdData.campaignTitle,
          budget: newAdData.budget,
          status: 'pending',
          requestDate: new Date().toISOString().split('T')[0],
          description: newAdData.description || '내용 없음',
          targetDate: newAdData.targetDate
      };
      setAdProposals([newAd, ...adProposals]);
      setIsAdModalOpen(false);
      setNewAdData({ brandName: '', campaignTitle: '', budget: '', creatorId: '', description: '', targetDate: new Date().toISOString().split('T')[0] });
      showToastMessage('새로운 캠페인이 등록되었습니다.');
  };

  const handleSupportRequest = () => {
      if (!supportForm.creatorId || !supportForm.title || !supportForm.content) {
          alert('필수 정보를 입력해주세요.');
          return;
      }
      const selectedCreator = creators.find(c => c.id === supportForm.creatorId);
      if (onAddSupportRequest && selectedCreator) {
          const newRequest: SupportRequest = {
              id: Date.now().toString(),
              creatorId: selectedCreator.id,
              creatorName: selectedCreator.name,
              type: supportModal.type,
              title: supportForm.title,
              content: supportForm.content,
              requestDate: new Date().toISOString().split('T')[0],
              status: '접수'
          };
          onAddSupportRequest(newRequest);
      }
      showToastMessage(`${supportModal.type === 'legal' ? '법률' : '세무'} 상담 신청이 완료되었습니다.`);
      setSupportModal({ ...supportModal, open: false });
      setSupportForm({ creatorId: '', title: '', content: '' });
  };

  const myCreatorIds = myCreators.map(c => c.id);
  const myAdProposals = adProposals.filter(ad => myCreatorIds.includes(ad.creatorId));
  const filteredAds = myAdProposals.filter(ad => {
      if (adFilter === 'all') return true;
      if (adFilter === 'pending') return ad.status === 'pending';
      if (adFilter === 'history') return ad.status !== 'pending';
      return true;
  });

  const EVENT_TYPES = [
      { id: 'content', label: '콘텐츠' }, { id: 'live', label: '라이브' },
      { id: 'meeting', label: '미팅' }, { id: 'joint', label: '합방' }, { id: 'other', label: '기타' },
  ];

  const getPageTitle = () => {
      switch(activeTab) {
          case 'calendar': return '일정 캘린더';
          case 'list': return '내 담당 크리에이터';
          case 'ads': return '광고 캠페인 관리';
          case 'health': return '크리에이터 건강관리';
          case 'support': return '법률/세무 연결';
          default: return '크리에이터 관리';
      }
  };

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-white relative">
        <div className="px-8 pt-8 pb-6 shrink-0 border-b border-gray-100">
             <div className="max-w-[1600px] mx-auto">
                 <div className="text-xs text-gray-500 mb-2">크리에이터 관리 / {getPageTitle()}</div>
                 <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {getPageTitle()}
                 </h1>
             </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-white">
            <div className="max-w-[1600px] mx-auto min-h-full">
                {activeTab === 'calendar' && (
                    <div className="animate-[fadeIn_0.2s_ease-out]">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">전체 일정</h2>
                                <p className="text-sm text-gray-500">모든 담당 크리에이터의 일정을 통합 확인합니다.</p>
                            </div>
                            <button 
                                onClick={() => handleOpenEventModal()} 
                                className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                                disabled={myCreators.length === 0}
                            >
                                <Plus size={16} /> 일정 추가
                            </button>
                        </div>
                        <CreatorCalendar 
                            events={allMyEvents} 
                            creatorsMap={creatorsMap}
                            currentDate={currentDate}
                            onDateChange={setCurrentDate}
                            onAddEvent={handleOpenEventModal}
                            onEventClick={handleEventClick}
                            legendCreators={myCreators}
                        />
                    </div>
                )}

                {activeTab === 'list' && (
                     <div className="animate-[fadeIn_0.2s_ease-out]">
                        {selectedCreator ? (
                            <CreatorDetailView 
                                creator={selectedCreator}
                                tasks={allTasks.filter(t => t.creatorId === selectedCreator.id)}
                                events={creatorEvents}
                                onBack={handleBack}
                                onAddEvent={handleOpenEventModal}
                                onEventClick={handleEventClick}
                                onAddTask={(title) => onAddTask(title, selectedCreator.id)}
                                onToggleTask={onToggleTask}
                                onDeleteTask={onDeleteTask}
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                 {myCreators.map(creator => (
                                   <div 
                                     key={creator.id}
                                     onClick={() => setSelectedCreatorId(creator.id)}
                                     className="group border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 bg-white relative"
                                   >
                                     <div className="aspect-video bg-gray-100 relative flex items-center justify-center">
                                        {creator.coverUrl ? <img src={creator.coverUrl} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-gray-300"/>}
                                     </div>
                                     <div className="p-5 relative">
                                        <div className="w-16 h-16 rounded-lg border-4 border-white shadow-sm overflow-hidden absolute -top-10 left-5 bg-white">
                                           {creator.avatarUrl ? <img src={creator.avatarUrl} className="w-full h-full object-cover" /> : <UserIcon size={32} className="m-auto text-gray-400"/>}
                                        </div>
                                        <div className="mt-6">
                                           <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">{creator.name} {renderPlatformIcon(creator.platform, 16)}</h3>
                                           <p className="text-sm text-gray-500 mb-3">{creator.subscribers}</p>
                                           <span className={`text-[10px] font-bold ${creator.status === '활동중' ? 'text-[#00C471]' : 'text-gray-500'}`}>{creator.status}</span>
                                        </div>
                                     </div>
                                   </div>
                                 ))}
                            </div>
                        )}
                     </div>
                )}

                {activeTab === 'ads' && (
                    <div className="animate-[fadeIn_0.2s_ease-out]">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">광고 캠페인 제안</h2>
                                <p className="text-sm text-gray-500">담당 크리에이터 광고 제안 관리</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setAdFilter('pending')} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${adFilter === 'pending' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>대기중 ({myAdProposals.filter(a => a.status === 'pending').length})</button>
                                <button onClick={() => setAdFilter('history')} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${adFilter === 'history' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>처리 내역</button>
                                <button onClick={() => setIsAdModalOpen(true)} className="ml-2 flex items-center gap-1 bg-[#00C471] text-white px-3 py-1.5 rounded-md text-xs font-medium"><Plus size={14} /> 캠페인 등록</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAds.map(ad => {
                                const creator = creators.find(c => c.id === ad.creatorId);
                                return (
                                    <div key={ad.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-3"><div className="text-xs font-bold text-gray-500">{ad.brandName}</div><div className="text-[10px] text-gray-400">{ad.requestDate}</div></div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{ad.campaignTitle}</h3>
                                        <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 overflow-hidden shrink-0">{creator?.avatarUrl ? <img src={creator.avatarUrl} className="w-full h-full object-cover"/> : <UserIcon className="p-1 text-gray-400"/>}</div>
                                            <div className="text-xs font-bold text-gray-800">{creator?.name}</div>
                                        </div>
                                        <div className="mb-4 flex-1">
                                            <div className="text-xl font-bold text-[#00C471] flex items-center gap-1"><DollarSign size={18} /> {ad.budget}</div>
                                            <div className="mt-2 text-xs text-blue-600 font-medium">목표 일정: {ad.targetDate || '미정'}</div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 mt-auto">
                                            {ad.status === 'pending' ? (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleAdDecision(ad.id, 'rejected')} className="flex-1 py-2 text-xs font-medium text-red-600 border border-red-200 rounded-lg">거절</button>
                                                    <button onClick={() => handleAdDecision(ad.id, 'accepted')} className="flex-1 py-2 text-xs font-medium text-white bg-black rounded-lg">수락</button>
                                                </div>
                                            ) : <div className={`text-center py-2 text-xs font-bold ${ad.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>{ad.status === 'accepted' ? '수락됨' : '거절됨'}</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'health' && (
                    <div className="animate-[fadeIn_0.2s_ease-out]">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">크리에이터 건강 관리</h2>
                        <CreatorHealthView 
                            creators={myCreators}
                            records={healthRecords}
                            onUpdateRecords={onUpdateHealthRecords}
                            logs={issueLogs}
                            onUpdateLogs={onUpdateIssueLogs}
                            readOnly={true} 
                        />
                    </div>
                )}

                {activeTab === 'support' && (
                    <div className="animate-[fadeIn_0.2s_ease-out] space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                                <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Scale size={24} /></div><h3 className="font-bold text-lg text-gray-900">법률 자문 연결</h3></div>
                                <button onClick={() => setSupportModal({ open: true, type: 'legal' })} className="w-full py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 mt-auto">법률 상담 신청하기</button>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                                <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-green-50 text-green-600 rounded-lg"><FileSpreadsheet size={24} /></div><h3 className="font-bold text-lg text-gray-900">세무/회계 지원</h3></div>
                                <button onClick={() => setSupportModal({ open: true, type: 'tax' })} className="w-full py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 mt-auto">세무 상담 신청하기</button>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Clock size={22} className="text-gray-400" /> 나의 신청 내역</h3>
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                                        <tr><th className="px-6 py-4">신청일</th><th className="px-6 py-4">유형</th><th className="px-6 py-4">대상 크리에이터</th><th className="px-6 py-4">제목</th><th className="px-6 py-4 text-center">상태</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {mySupportRequests.reverse().map(req => (
                                            <tr key={req.id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{req.requestDate}</td>
                                                <td className="px-6 py-4"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${req.type === 'legal' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-green-50 text-green-700 border-green-100'}`}>{req.type === 'legal' ? '법률' : '세무'}</span></td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{req.creatorName}</td>
                                                <td className="px-6 py-4 text-gray-700 font-medium truncate max-w-[300px]">{req.title}</td>
                                                <td className="px-6 py-4 text-center">{req.status === '완료' ? <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">완료</span> : <span className="text-orange-600 font-bold text-xs bg-orange-50 px-2 py-1 rounded">진행중</span>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Modal Logic remains the same, removed local activeMainTab logic */}
        {isEventModalOpen && (
            <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsEventModalOpen(false)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-2"><CalendarIcon size={20} className="text-blue-600" /><h3 className="font-bold text-gray-900 text-lg">새 일정 추가</h3></div>
                        <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                    </div>
                    <div className="p-8 space-y-6">
                        <input className="w-full text-lg font-bold border-b-2 border-gray-100 focus:border-blue-500 py-1 focus:outline-none" placeholder="제목을 입력하세요" value={newEventData.title} onChange={e => setNewEventData({...newEventData, title: e.target.value})} />
                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white" value={newEventData.creatorId} onChange={e => setNewEventData({...newEventData, creatorId: e.target.value})}>
                            <option value="">크리에이터 선택</option>
                            {myCreators.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" value={newEventData.date} onChange={e => setNewEventData({...newEventData, date: e.target.value})} />
                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" value={newEventData.type} onChange={e => setNewEventData({...newEventData, type: e.target.value as any})} >{EVENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}</select>
                        </div>
                        <textarea rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white resize-none" placeholder="일정 상세 내용" value={newEventData.content} onChange={e => setNewEventData({...newEventData, content: e.target.value})} />
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button onClick={() => setIsEventModalOpen(false)} className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-200 rounded-xl font-medium">취소</button>
                        <button onClick={handleSaveEvent} className="px-8 py-2.5 text-sm bg-black text-white rounded-xl font-bold shadow-lg">등록 완료</button>
                    </div>
                </div>
            </div>
        )}

        {selectedEvent && (
            <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                    <div className={`h-2 w-full ${getCreatorColorStyles(selectedEvent.creatorId).dot}`}></div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 inline-block ${selectedEvent.type === 'joint' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{EVENT_TYPES.find(t => t.id === selectedEvent.type)?.label || '일정'}</span>
                                <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1"><CalendarIcon size={14} /> {selectedEvent.date}</p>
                            </div>
                            <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0">{creatorsMap[selectedEvent.creatorId]?.avatarUrl ? <img src={creatorsMap[selectedEvent.creatorId].avatarUrl} className="w-full h-full object-cover" /> : <UserIcon className="p-2 text-gray-400"/>}</div>
                                <div className="text-sm font-bold text-gray-800">{creatorsMap[selectedEvent.creatorId]?.name || '알 수 없음'}</div>
                            </div>
                            <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 text-sm text-gray-600 whitespace-pre-wrap">{selectedEvent.content}</div>
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => handleDeleteEvent(selectedEvent.id)} className="flex-1 py-2.5 text-sm text-red-500 hover:bg-red-50 border border-red-100 rounded-xl font-bold">삭제하기</button>
                             <button onClick={() => setSelectedEvent(null)} className="flex-[2] py-2.5 text-sm bg-black text-white rounded-xl font-bold">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isAdModalOpen && (
            <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsAdModalOpen(false)}>
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-gray-900">광고 캠페인 등록</h3><button onClick={() => setIsAdModalOpen(false)}><X size={20}/></button></div>
                    <div className="p-6 space-y-4">
                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="광고주" value={newAdData.brandName} onChange={e => setNewAdData({...newAdData, brandName: e.target.value})} />
                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="캠페인명" value={newAdData.campaignTitle} onChange={e => setNewAdData({...newAdData, campaignTitle: e.target.value})} />
                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="제안 단가" value={newAdData.budget} onChange={e => setNewAdData({...newAdData, budget: e.target.value})} />
                        <div className="grid grid-cols-2 gap-4">
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={newAdData.creatorId} onChange={e => setNewAdData({...newAdData, creatorId: e.target.value})}><option value="">크리에이터 선택</option>{myCreators.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={newAdData.targetDate} onChange={e => setNewAdData({...newAdData, targetDate: e.target.value})} />
                        </div>
                        <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none" rows={3} placeholder="상세 내용" value={newAdData.description} onChange={e => setNewAdData({...newAdData, description: e.target.value})} />
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2"><button onClick={() => setIsAdModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-medium">취소</button><button onClick={handleAddAd} className="px-4 py-2 text-sm bg-black text-white rounded-lg font-medium">등록하기</button></div>
                </div>
            </div>
        )}

        {supportModal.open && (
            <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSupportModal({ ...supportModal, open: false })}>
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-gray-900">{supportModal.type === 'legal' ? '법률 자문 신청' : '세무 상담 신청'}</h3><button onClick={() => setSupportModal({ ...supportModal, open: false })}><X size={20}/></button></div>
                    <div className="p-6 space-y-4">
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={supportForm.creatorId} onChange={e => setSupportForm({ ...supportForm, creatorId: e.target.value })}><option value="">크리에이터 선택</option>{myCreators.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="제목" value={supportForm.title} onChange={e => setSupportForm({...supportForm, title: e.target.value})} />
                        <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none h-32" placeholder="상담 내용" value={supportForm.content} onChange={e => setSupportForm({...supportForm, content: e.target.value})} />
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2"><button onClick={() => setSupportModal({ ...supportModal, open: false })} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-medium">취소</button><button onClick={handleSupportRequest} className="px-4 py-2 text-sm bg-black text-white rounded-lg font-medium flex items-center gap-1"><Send size={14} /> 신청하기</button></div>
                </div>
            </div>
        )}

        {toast.show && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-[fadeIn_0.2s_ease-out]">
                {toast.type === 'success' ? <CheckCircle2 size={20} className="text-[#00C471]" /> : <AlertCircle size={20} className="text-red-400" />}
                <span className="text-sm font-medium">{toast.message}</span>
            </div>
        )}
    </div>
  );
};
