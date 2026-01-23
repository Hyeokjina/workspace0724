
import React, { useState, useMemo } from 'react';
import { Calendar, ArrowRight, RotateCcw, FileText, Download, BellRing, Upload } from 'lucide-react';
import { UserProfile } from '../../../types';

interface HealthDashboardProps {
    profile: UserProfile;
    onOpenUploadModal: () => void;
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({ profile, onOpenUploadModal }) => {
    // Local History (Mock Data)
    const [checkupHistory] = useState([
        { id: 1, year: '2023', type: '일반 건강검진', date: '2023. 10. 15', result: '정상 (양호)' },
        { id: 2, year: '2022', type: '채용 건강검진', date: '2022. 01. 05', result: '정상 (경미)' },
    ]);

    // Helper for ISO Date calculation
    const getInitialDates = () => {
        const today = new Date();
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(today.getFullYear() - 5);
        return {
            today: today.toISOString().split('T')[0],
            fiveYearsAgo: fiveYearsAgo.toISOString().split('T')[0]
        };
    };

    const initialDates = getInitialDates();

    // History Filter State
    const [historyStartDate, setHistoryStartDate] = useState(initialDates.fiveYearsAgo);
    const [historyEndDate, setHistoryEndDate] = useState(initialDates.today);

    // Filtered History Logic
    const filteredHistory = useMemo(() => {
        return checkupHistory.filter(item => {
            if (!historyStartDate && !historyEndDate) return true;
            
            // Convert "2023. 10. 15" to "2023-10-15" for comparison
            const formattedDate = item.date.replace(/\. /g, '-').replace(/\.$/, '');
            
            if (historyStartDate && formattedDate < historyStartDate) return false;
            if (historyEndDate && formattedDate > historyEndDate) return false;
            
            return true;
        });
    }, [checkupHistory, historyStartDate, historyEndDate]);

    return (
        <div className="space-y-8 animate-[fadeIn_0.2s_ease-in-out]">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded inline-block mb-3">
                            대상자 알림
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            <span className="text-blue-600">{profile.name}</span>님, <br/>
                            2024년 정기 건강검진 대상자입니다.
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            올해 12월 31일까지 일반 건강검진을 완료해야 합니다.<br/>
                            검진 후 결과를 업로드하여 DB에 저장해주세요.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-1"
                                onClick={onOpenUploadModal}
                            >
                                <Upload size={16} /> 결과 제출하기
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:block p-4 bg-white/50 rounded-full border border-blue-100">
                        <BellRing className="text-blue-500" size={48} />
                    </div>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 px-1">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500"/> 지난 검진 이력
                    </h3>
                    
                    {/* Date Filter for Health History */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mr-1">기간</span>
                            <input 
                                type="date" 
                                value={historyStartDate} 
                                onChange={(e) => setHistoryStartDate(e.target.value)} 
                                className="text-xs bg-transparent focus:outline-none cursor-pointer text-gray-600" 
                            />
                            <ArrowRight size={14} className="text-gray-300 mx-1" />
                            <input 
                                type="date" 
                                value={historyEndDate} 
                                onChange={(e) => setHistoryEndDate(e.target.value)} 
                                className="text-xs bg-transparent focus:outline-none cursor-pointer text-gray-600" 
                            />
                            {(historyStartDate !== initialDates.fiveYearsAgo || historyEndDate !== initialDates.today) && (
                                <button 
                                    onClick={() => { 
                                        setHistoryStartDate(initialDates.fiveYearsAgo); 
                                        setHistoryEndDate(initialDates.today); 
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                    title="필터 초기화"
                                >
                                    <RotateCcw size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredHistory.length > 0 ? filteredHistory.map((checkup) => (
                        <div key={checkup.id} className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow bg-white group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-gray-900">{checkup.year}년 {checkup.type}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${checkup.result.includes('정상') || checkup.result.includes('양호') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                                        {checkup.result}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                    <span>{checkup.date}</span>
                                </div>
                            </div>
                            <button className="text-gray-300 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors" title="결과지 다운로드">
                                <Download size={18} />
                            </button>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <FileText className="mx-auto text-gray-300 mb-3" size={40} />
                            <p className="text-sm text-gray-400">선택한 기간 내 검진 이력이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
