

import React, { useState } from 'react';
import { User, UserRole, Employee } from '../types';
import { AdminCreatorView } from './AdminCreatorView';
import { EmployeeCreatorView } from './EmployeeCreatorView';
import { 
    Creator, HealthRecord, IssueLog, CreatorEvent, CreatorCalendar, CreatorHealthView, Task, INITIAL_TASKS 
} from './CreatorShared';
import { CalendarIcon, Activity, CheckSquare } from 'lucide-react';

interface CreatorManagerViewProps {
    user: User;
    creators: Creator[];
    onUpdateCreators: (creators: Creator[]) => void;
    // New Props for Health Sync
    healthRecords: HealthRecord[];
    onUpdateHealthRecords: (records: HealthRecord[]) => void;
    issueLogs: IssueLog[];
    onUpdateIssueLogs: (logs: IssueLog[]) => void;
    employees: Employee[];
    // Event Props
    events: CreatorEvent[];
    onUpdateEvents: (events: CreatorEvent[]) => void;
    // Support Props
    onAddSupportRequest?: (request: any) => void;
    currentView?: string;
}

// --- New Component for Creator Self View ---
const CreatorSelfView = ({
    user,
    creators,
    events,
    healthRecords,
    onUpdateHealthRecords,
    issueLogs,
    onUpdateIssueLogs,
    currentView
}: {
    user: User,
    creators: Creator[],
    events: CreatorEvent[],
    healthRecords: HealthRecord[],
    onUpdateHealthRecords: (records: HealthRecord[]) => void,
    issueLogs: IssueLog[],
    onUpdateIssueLogs: (logs: IssueLog[]) => void,
    currentView?: string
}) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

    // Identify the creator based on logged-in user ID matching the initial creators ID or some link
    // Assuming user.id corresponds to Creator.id in this simple system, or finding by name.
    // For "gamedol", user.id is '5', which matches '겜돌이' id '5'.
    const myCreator = creators.find(c => c.id === user.id);
    const myEvents = myCreator ? events.filter(e => e.creatorId === myCreator.id) : [];
    const creatorsMap = myCreator ? { [myCreator.id]: myCreator } : {};
    
    // Mock Tasks for Self View - in a real app, this would be passed down
    const myTasks = myCreator && INITIAL_TASKS[myCreator.id] ? INITIAL_TASKS[myCreator.id] : [];

    const isHealthView = currentView === 'creator-health';

    if (!myCreator) {
        return (
            <div className="flex-1 h-screen flex items-center justify-center text-gray-500">
                연결된 크리에이터 정보를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="flex-1 h-screen overflow-hidden flex flex-col bg-white relative">
             <div className="px-8 pt-8 pb-6 shrink-0 border-b border-gray-100">
                 <div className="max-w-[1600px] mx-auto">
                     <div className="flex justify-between items-end">
                        <div>
                             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                {isHealthView ? <Activity className="text-[#00C471]" size={32}/> : <CalendarIcon className="text-gray-800" size={32}/>}
                                {isHealthView ? '건강 관리' : '나의 일정'}
                             </h1>
                             <p className="text-sm text-gray-500 mt-2">
                                {isHealthView 
                                    ? '나의 건강 상태와 검진 기록을 확인하세요.' 
                                    : `반가워요, ${myCreator.name}님! 오늘 일정을 확인해보세요.`
                                }
                             </p>
                        </div>
                     </div>
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto p-8 bg-white">
                <div className="max-w-[1600px] mx-auto">
                    {!isHealthView && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-[fadeIn_0.2s_ease-out]">
                            <div className="lg:col-span-2">
                                <CreatorCalendar 
                                    events={myEvents}
                                    creatorsMap={creatorsMap}
                                    currentDate={currentDate}
                                    onDateChange={setCurrentDate}
                                    onAddEvent={() => {}} // Creators cannot add events in this view
                                    onEventClick={() => {}} 
                                    readOnly={true}
                                />
                            </div>
                            <div>
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <CheckSquare size={20} className="text-gray-700"/>
                                        업무 현황
                                    </h3>
                                    {myTasks.length > 0 ? (
                                        <div className="space-y-3">
                                            {myTasks.map(task => (
                                                <div key={task.id} className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
                                                    <span className={task.status === '완료됨' ? 'text-gray-400 line-through' : 'text-gray-800'}>{task.title}</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                                        task.status === '완료됨' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                    }`}>{task.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400 text-sm">
                                            등록된 업무가 없습니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {isHealthView && (
                        <div className="animate-[fadeIn_0.2s_ease-out]">
                            <CreatorHealthView 
                                creators={[myCreator]}
                                records={healthRecords}
                                onUpdateRecords={onUpdateHealthRecords}
                                logs={issueLogs}
                                onUpdateLogs={onUpdateIssueLogs}
                                readOnly={true}
                                isCreator={true} // Enable Self-Survey
                            />
                        </div>
                    )}
                </div>
             </div>
        </div>
    );
};

export const CreatorManagerView = ({ 
    user, 
    creators, 
    onUpdateCreators,
    healthRecords,
    onUpdateHealthRecords,
    issueLogs,
    onUpdateIssueLogs,
    employees,
    events,
    onUpdateEvents,
    onAddSupportRequest,
    currentView
}: CreatorManagerViewProps) => {
  if (user.role === UserRole.CREATOR) {
      return <CreatorSelfView 
          user={user}
          creators={creators}
          events={events}
          healthRecords={healthRecords}
          onUpdateHealthRecords={onUpdateHealthRecords}
          issueLogs={issueLogs}
          onUpdateIssueLogs={onUpdateIssueLogs}
          currentView={currentView}
      />;
  }

  return user.role === UserRole.ADMIN 
    ? <AdminCreatorView 
        user={user} 
        creators={creators} 
        onUpdateCreators={onUpdateCreators}
        healthRecords={healthRecords}
        onUpdateHealthRecords={onUpdateHealthRecords}
        issueLogs={issueLogs}
        onUpdateIssueLogs={onUpdateIssueLogs}
        employees={employees}
      />
    : <EmployeeCreatorView 
        user={user} 
        creators={creators} 
        onUpdateCreators={onUpdateCreators}
        healthRecords={healthRecords}
        onUpdateHealthRecords={onUpdateHealthRecords}
        issueLogs={issueLogs}
        onUpdateIssueLogs={onUpdateIssueLogs}
        events={events}
        onUpdateEvents={onUpdateEvents}
        onAddSupportRequest={onAddSupportRequest}
      />;
};