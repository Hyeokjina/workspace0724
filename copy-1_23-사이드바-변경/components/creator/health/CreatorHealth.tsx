
import React, { useState } from 'react';
import { Activity, ClipboardList } from 'lucide-react';
import { Creator, HealthRecord, IssueLog, CreatorHealthView, PhqSurveyModal } from '../../CreatorShared';

interface CreatorHealthProps {
    creator: Creator;
    creators: Creator[];
    healthRecords: HealthRecord[];
    onUpdateHealthRecords: (records: HealthRecord[]) => void;
    issueLogs: IssueLog[];
    onUpdateIssueLogs: (logs: IssueLog[]) => void;
}

export const CreatorHealth: React.FC<CreatorHealthProps> = ({
    creator,
    creators,
    healthRecords,
    onUpdateHealthRecords,
    issueLogs,
    onUpdateIssueLogs
}) => {
    const [isPhqModalOpen, setIsPhqModalOpen] = useState(false);

    const handlePhqSubmit = (result: { score: number, category: string, description: string }) => {
        const newLog: IssueLog = {
            id: Date.now(),
            creator: creator.name,
            date: new Date().toISOString().split('T')[0],
            category: result.category, // Just '심각', '주의' etc.
            description: `[PHQ-9 자가진단] 총점 ${result.score}점\n${result.description}`,
            status: '확인완료'
        };
        onUpdateIssueLogs([newLog, ...issueLogs]);
        setIsPhqModalOpen(false);
    };

    return (
        <div className="flex-1 h-screen overflow-hidden flex flex-col bg-white relative">
             <div className="px-8 pt-8 pb-6 shrink-0 border-b border-gray-100">
                 <div className="max-w-[1600px] mx-auto">
                     <div className="flex justify-between items-end">
                        <div>
                             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <Activity className="text-[#00C471]" size={32}/>
                                건강 관리
                             </h1>
                             <p className="text-sm text-gray-500 mt-2">
                                나의 건강 상태와 검진 기록을 확인하세요.
                             </p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsPhqModalOpen(true)}
                                className="flex items-center gap-2 bg-[#00C471] hover:bg-[#00b065] text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95"
                            >
                                <ClipboardList size={20} />
                                자가진단 설문 시작
                            </button>
                        </div>
                     </div>
                 </div>
             </div>

             <div className="flex-1 overflow-y-auto p-8 bg-white">
                <div className="max-w-[1600px] mx-auto">
                    <div className="animate-[fadeIn_0.2s_ease-out]">
                        <CreatorHealthView 
                            creators={[creator]}
                            records={healthRecords}
                            onUpdateRecords={onUpdateHealthRecords}
                            logs={issueLogs}
                            onUpdateLogs={onUpdateIssueLogs}
                            readOnly={false}
                            isCreator={true} 
                        />
                    </div>
                </div>
             </div>

             {isPhqModalOpen && (
                 <PhqSurveyModal 
                    onClose={() => setIsPhqModalOpen(false)} 
                    onSubmit={handlePhqSubmit} 
                 />
             )}
        </div>
    );
};
