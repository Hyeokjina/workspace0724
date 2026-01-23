
import React, { useState } from 'react';
import { User, UserRole, Employee, SupportRequest } from '../types';
import { AdminCreatorView } from './AdminCreatorView';
import { EmployeeCreatorView } from './EmployeeCreatorView';
import { 
    Creator, HealthRecord, IssueLog, CreatorEvent, Task, PhqSurveyModal, getCreatorColorStyles 
} from './CreatorShared';
import { CalendarIcon, Activity, CheckSquare, ClipboardList, X, Trash2, Plus, Search, Check, Users } from 'lucide-react';
import { CreatorSchedule } from './creator/schedule/CreatorSchedule';
import { CreatorHealth } from './creator/health/CreatorHealth';

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
    supportRequests?: SupportRequest[];
    onAddSupportRequest?: (request: SupportRequest) => void;
    currentView?: string;
    // Task Props
    allTasks: Task[];
    onAddTask: (title: string, creatorId: string) => void;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

// --- Creator Self View (Refactored) ---
const CreatorSelfView = ({
    user,
    creators,
    events,
    onUpdateEvents,
    healthRecords,
    onUpdateHealthRecords,
    issueLogs,
    onUpdateIssueLogs,
    currentView
}: {
    user: User,
    creators: Creator[],
    events: CreatorEvent[],
    onUpdateEvents: (events: CreatorEvent[]) => void,
    healthRecords: HealthRecord[],
    onUpdateHealthRecords: (records: HealthRecord[]) => void,
    issueLogs: IssueLog[],
    onUpdateIssueLogs: (logs: IssueLog[]) => void,
    currentView?: string
}) => {
    // Identify the creator based on logged-in user ID
    const myCreator = creators.find(c => c.id === user.id);
    const isHealthView = currentView === 'creator-health';

    if (!myCreator) {
        return (
            <div className="flex-1 h-screen flex items-center justify-center text-gray-500">
                연결된 크리에이터 정보를 찾을 수 없습니다.
            </div>
        );
    }

    if (isHealthView) {
        return (
            <CreatorHealth 
                creator={myCreator}
                creators={creators}
                healthRecords={healthRecords}
                onUpdateHealthRecords={onUpdateHealthRecords}
                issueLogs={issueLogs}
                onUpdateIssueLogs={onUpdateIssueLogs}
            />
        );
    }

    return (
        <CreatorSchedule 
            creator={myCreator}
            creators={creators}
            events={events}
            onUpdateEvents={onUpdateEvents}
        />
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
    supportRequests,
    onAddSupportRequest,
    currentView,
    allTasks,
    onAddTask,
    onToggleTask,
    onDeleteTask
}: CreatorManagerViewProps) => {
  if (user.role === UserRole.CREATOR) {
      return <CreatorSelfView 
          user={user}
          creators={creators}
          events={events}
          onUpdateEvents={onUpdateEvents}
          healthRecords={healthRecords}
          onUpdateHealthRecords={onUpdateHealthRecords}
          issueLogs={issueLogs}
          onUpdateIssueLogs={onUpdateIssueLogs}
          currentView={currentView}
      />;
  }

  // Admin Tab Mapping
  if (user.role === UserRole.ADMIN) {
      const adminTab = 
        currentView === 'hr-creator-contract' ? 'contract' :
        currentView === 'hr-creator-health' ? 'health' : 'list';

      return <AdminCreatorView 
        user={user} 
        creators={creators} 
        onUpdateCreators={onUpdateCreators}
        healthRecords={healthRecords}
        onUpdateHealthRecords={onUpdateHealthRecords}
        issueLogs={issueLogs}
        onUpdateIssueLogs={onUpdateIssueLogs}
        employees={employees}
        activeTab={adminTab as any}
      />;
  }

  // Employee Tab Mapping
  const employeeTab = 
    currentView === 'creator-calendar' ? 'calendar' :
    currentView === 'creator-list' ? 'list' :
    currentView === 'creator-ads' ? 'ads' :
    currentView === 'creator-health' ? 'health' :
    currentView === 'creator-support' ? 'support' : 'calendar';

  return <EmployeeCreatorView 
    user={user} 
    creators={creators} 
    onUpdateCreators={onUpdateCreators}
    healthRecords={healthRecords}
    onUpdateHealthRecords={onUpdateHealthRecords}
    issueLogs={issueLogs}
    onUpdateIssueLogs={onUpdateIssueLogs}
    events={events}
    onUpdateEvents={onUpdateEvents}
    supportRequests={supportRequests}
    onAddSupportRequest={onAddSupportRequest}
    allTasks={allTasks}
    onAddTask={onAddTask}
    onToggleTask={onToggleTask}
    onDeleteTask={onDeleteTask}
    activeTab={employeeTab as any}
  />;
};
