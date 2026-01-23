
import React, { useState } from 'react';
import { UserProfile, VacationLog, HealthRecord } from '../types';
import { Task } from './CreatorShared';
import { ProfileHeader } from './employee/profile/ProfileHeader';
import { BasicInfo } from './employee/profile/BasicInfo';
import { TaskBoard } from './employee/profile/TaskBoard';
import { HealthDashboard } from './employee/profile/HealthDashboard';
import { VacationStatus } from './employee/profile/VacationStatus';
import { ImageModal, PasswordModal, HealthUploadModal } from './employee/profile/ProfileModals';

interface ProfileViewProps {
    profile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
    readOnly?: boolean;
    onBack?: () => void;
    vacationLogs?: VacationLog[];
    onAddHealthRecord?: (record: HealthRecord) => void;
    isCreator?: boolean;
    hideVacationWidget?: boolean;
    tasks?: Task[];
    onOpenPhqModal?: () => void;
    onAddTask?: (title: string) => void;
    onToggleTask?: (id: string) => void;
    onDeleteTask?: (id: string) => void;
    hideTasks?: boolean;
    onOpenVacationModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ 
    profile, 
    onUpdateProfile, 
    readOnly = false, 
    onBack, 
    vacationLogs = [], 
    onAddHealthRecord,
    isCreator = false,
    hideVacationWidget = false,
    tasks = [],
    onOpenPhqModal,
    onAddTask,
    onToggleTask,
    onDeleteTask,
    hideTasks = false,
    onOpenVacationModal
}) => {
  const [activeTab, setActiveTab] = useState('정보');
  const [imageModalState, setImageModalState] = useState<{ isOpen: boolean; type: 'avatar' | 'cover' }>({ isOpen: false, type: 'cover' });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const tabs = (readOnly || isCreator) ? ['정보'] : ['정보', '건강'];

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-white relative animate-[fadeIn_0.3s_ease-out]">
      <ProfileHeader 
          profile={profile} 
          readOnly={readOnly} 
          onBack={onBack} 
          onOpenImageModal={(type) => setImageModalState({ isOpen: true, type })}
      />

      <div className="px-12 pb-20 max-w-[1600px] mx-auto">
        {!isCreator && (
            <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <div 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm cursor-pointer transition-colors ${
                            activeTab === tab 
                            ? 'font-bold text-black border-b-2 border-black' 
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
           <div className="flex-1 space-y-10 min-h-[400px]">
              {activeTab === '정보' && (
                 <>
                    <BasicInfo 
                        profile={profile}
                        onUpdateProfile={onUpdateProfile}
                        readOnly={readOnly}
                        isCreator={isCreator}
                        onPasswordChangeClick={() => setIsPasswordModalOpen(true)}
                    />

                    {isCreator && !hideTasks && (
                        <TaskBoard 
                            tasks={tasks}
                            onAddTask={onAddTask}
                            onToggleTask={onToggleTask}
                            onDeleteTask={onDeleteTask}
                        />
                    )}
                 </>
              )}

              {activeTab === '건강' && !isCreator && (
                 <HealthDashboard 
                    profile={profile}
                    onOpenUploadModal={() => setIsResultModalOpen(true)}
                 />
              )}
           </div>

           <div className="w-full lg:w-[320px] space-y-4 shrink-0">
              {!hideVacationWidget && !isCreator && (
                  <VacationStatus 
                    onOpenVacationModal={onOpenVacationModal}
                    readOnly={readOnly}
                  />
              )}
           </div>
        </div>
      </div>

      <ImageModal 
          isOpen={imageModalState.isOpen}
          onClose={() => setImageModalState({ ...imageModalState, isOpen: false })}
          type={imageModalState.type}
          profile={profile}
          onUpdateProfile={onUpdateProfile}
      />

      <PasswordModal 
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
      />

      <HealthUploadModal 
          isOpen={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          profile={profile}
          onAddHealthRecord={onAddHealthRecord}
      />
    </div>
  );
};
