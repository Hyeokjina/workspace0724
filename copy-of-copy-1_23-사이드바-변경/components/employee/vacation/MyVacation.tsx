
import React, { useState, useMemo } from 'react';
import { 
    Plane, ArrowRight, Filter, Plus, Timer, CheckCircle2, XCircle, 
    AlertCircle, MapPin, Phone, Target, ClipboardList, Stethoscope, Gift, Info, X
} from 'lucide-react';
import { VacationLog } from '../../../types';

interface MyVacationProps {
    vacationLogs: VacationLog[];
    onUpdateVacationLogs?: (logs: VacationLog[]) => void;
    userName: string;
    onOpenVacationModal?: () => void;
}

const getISODate = (date: Date) => date.toISOString().split('T')[0];

export const MyVacation: React.FC<MyVacationProps> = ({ vacationLogs, onUpdateVacationLogs, userName, onOpenVacationModal }) => {
    const today = new Date();
    // 오늘 기준 한 달 전/후 설정
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    const [startDate, setStartDate] = useState(getISODate(oneMonthAgo));
    const [endDate, setEndDate] = useState(getISODate(oneMonthLater));
    const [vacationTypeFilter, setVacationTypeFilter] = useState('All');

    // 모달 상태
    const [rejectionModalLog, setRejectionModalLog] = useState<VacationLog | null>(null);
    const [selectedDetailLog, setSelectedDetailLog] = useState<VacationLog | null>(null);

    // --- Mock Data & Filtering ---
    const mockVacations: VacationLog[] = [
        { id: 201, name: '이채연', type: '연차', applyDate: '2026-01-10', startDate: '2026-01-20', endDate: '2026-01-21', days: 2, status: '승인됨', reason: '가족 여행' },
        { id: 202, name: '이채연', type: '워케이션', applyDate: '2026-01-05', startDate: '2026-01-15', endDate: '2026-01-17', days: 3, status: '승인됨', reason: '제주도 워케이션', location: '제주 오피스', emergencyContact: '010-1111-2222', workGoals: '모바일 앱 v2.0 기획 마무리', handover: '김민재 매니저' },
        { id: 203, name: '이채연', type: '경조사', applyDate: '2026-01-25', startDate: '2026-01-28', endDate: '2026-01-28', days: 1, status: '대기중', reason: '동생 졸업식 참여', relationship: '형제/자매', eventType: '졸업' },
        { id: 204, name: '이채연', type: '경조사', applyDate: '2026-01-08', startDate: '2026-01-12', endDate: '2026-01-12', days: 1, status: '반려됨', reason: '사촌 결혼식', rejectionReason: '경조사 휴가 규정상 본인/부모/조부모/형제자매까지만 유급 지원이 가능합니다. 개인 연차를 사용해주세요.' },
        { id: 205, name: '이채연', type: '병가', applyDate: '2026-01-04', startDate: '2026-01-05', endDate: '2026-01-06', days: 2, status: '승인됨', reason: '독감 치료', symptoms: '고열 및 인후통', hospital: '강남내과' },
    ];

    const displayVacationLogs = useMemo(() => {
        const combined = [...mockVacations, ...vacationLogs.filter(v => v.name === userName)];
        return Array.from(new Map(combined.map(item => [item.id, item])).values());
    }, [vacationLogs, userName]);

    // Apply Sorting: Newest Application First
    const filteredVacations = displayVacationLogs.filter(log => {
        const isWithinDateRange = log.startDate >= startDate && log.startDate <= endDate;
        const matchesType = vacationTypeFilter === 'All' || log.type === vacationTypeFilter;
        return isWithinDateRange && matchesType;
    }).sort((a, b) => {
        // Sort by Apply Date Descending (Newest first)
        const dateA = a.applyDate ? new Date(a.applyDate).getTime() : 0;
        const dateB = b.applyDate ? new Date(b.applyDate).getTime() : 0;
        return dateB - dateA;
    });

    return (
        <div className="animate-[fadeIn_0.2s_ease-out]">
            {/* Vacation Logs Table & Filters */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-20">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mr-1">기간</span>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="text-sm bg-transparent focus:outline-none cursor-pointer" />
                            <ArrowRight size={14} className="text-gray-300 mx-1" />
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="text-sm bg-transparent focus:outline-none cursor-pointer" />
                        </div>
                        
                        <div className="relative">
                            <select 
                                value={vacationTypeFilter}
                                onChange={(e) => setVacationTypeFilter(e.target.value)}
                                className="pl-3 pr-9 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black appearance-none cursor-pointer shadow-sm min-w-[140px]"
                            >
                                <option value="All">모든 유형</option>
                                <option value="연차">연차</option>
                                <option value="반차">반차</option>
                                <option value="경조사">경조사</option>
                                <option value="병가">병가</option>
                                <option value="워케이션">워케이션</option>
                            </select>
                            <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* New: Vacation Request Button added here */}
                    {onOpenVacationModal && (
                        <button 
                            onClick={onOpenVacationModal}
                            className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                        >
                            <Plus size={14} /> 휴가 신청
                        </button>
                    )}
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">신청일</th>
                            <th className="px-6 py-4">휴가 기간</th>
                            <th className="px-6 py-4">유형</th>
                            <th className="px-6 py-4">사용 일수</th>
                            <th className="px-6 py-4">사유</th>
                            <th className="px-6 py-4 text-center">승인 상태</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredVacations.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedDetailLog(log)}>
                                <td className="px-6 py-4 text-xs text-gray-500 font-mono">{log.applyDate || '-'}</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{log.startDate} ~ {log.endDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-bold ${log.type === '반차' ? 'bg-purple-50 border-purple-100 text-purple-700' : log.type === '워케이션' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
                                        {log.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 font-bold">{log.days}일</td>
                                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[200px]">{log.reason}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        {log.status === '반려됨' ? (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setRejectionModalLog(log); }}
                                                className="text-red-500 text-[11px] font-bold flex items-center gap-1 hover:underline hover:text-red-600 transition-colors bg-red-50 px-2 py-1 rounded"
                                            >
                                                <XCircle size={12}/> 반려됨(반려 사유보기)
                                            </button>
                                        ) : log.status === '대기중' ? (
                                            <span className="text-orange-600 text-[11px] font-bold flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                                                <Timer size={12}/> 승인대기중
                                            </span>
                                        ) : (
                                            <span className="text-green-600 text-[11px] font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                                                <CheckCircle2 size={12}/> {log.status}
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 반려 사유 모달 */}
            {rejectionModalLog && (
                <div className="fixed inset-0 bg-black/30 z-[110] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setRejectionModalLog(null)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2"><AlertCircle size={18} className="text-red-500"/> 반려 사유 확인</h3>
                            <button onClick={() => setRejectionModalLog(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">신청 정보</div>
                                <div className="text-sm font-bold text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                                    {rejectionModalLog.type} | {rejectionModalLog.startDate}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">인사 운영자 반려 사유</div>
                                <div className="text-sm text-gray-700 leading-relaxed bg-red-50/50 p-4 rounded-lg border border-red-100 min-h-[80px]">
                                    {rejectionModalLog.rejectionReason}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setRejectionModalLog(null)} className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 font-bold transition-colors shadow-sm">확인</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 휴가 상세 내역 모달 */}
            {selectedDetailLog && (
                <div className="fixed inset-0 bg-black/40 z-[105] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedDetailLog(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <Plane size={20} className="text-blue-600" />
                                <h3 className="font-bold text-gray-900 text-lg">휴가 신청 상세</h3>
                            </div>
                            <button onClick={() => setSelectedDetailLog(null)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        
                        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">휴가 종류</label>
                                    <div className="text-sm font-bold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        {selectedDetailLog.type}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">신청 상태</label>
                                    <div className={`text-xs font-bold px-3 py-2 rounded-lg border flex items-center gap-2 ${
                                        selectedDetailLog.status === '승인됨' ? 'bg-green-50 text-green-700 border-green-100' :
                                        selectedDetailLog.status === '대기중' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                        'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                        {selectedDetailLog.status === '대기중' ? '승인대기중' : selectedDetailLog.status}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">신청일</label>
                                <div className="text-sm text-gray-900 font-medium ml-1 mb-3">{selectedDetailLog.applyDate || '-'}</div>

                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">휴가 기간</label>
                                <div className="text-sm font-bold text-gray-900 bg-white border border-gray-200 px-4 py-3 rounded-xl flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 mb-0.5">시작일</span>
                                        <span>{selectedDetailLog.startDate}</span>
                                    </div>
                                    <ArrowRight size={16} className="text-gray-300" />
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] text-gray-400 mb-0.5">종료일</span>
                                        <span>{selectedDetailLog.endDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">신청 사유</label>
                                <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed min-h-[60px]">
                                    {selectedDetailLog.reason || '입력된 사유가 없습니다.'}
                                </div>
                            </div>

                            {selectedDetailLog.type === '워케이션' && (
                                <div className="space-y-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <h4 className="text-xs font-bold text-blue-700 flex items-center gap-1.5"><Info size={14} /> 워케이션 상세 내역</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">근무 장소</span>
                                            <span className="font-bold text-gray-900">{selectedDetailLog.location || '-'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">비상 연락망</span>
                                            <span className="font-mono text-gray-900">{selectedDetailLog.emergencyContact || '-'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 pt-1 border-t border-blue-100/50">
                                            <span className="text-xs text-gray-500">업무 목표</span>
                                            <p className="text-xs text-gray-700 leading-relaxed">{selectedDetailLog.workGoals || '-'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 pt-1 border-t border-blue-100/50">
                                            <span className="text-xs text-gray-500">업무 인계 사항</span>
                                            <p className="text-xs text-gray-700 leading-relaxed">{selectedDetailLog.handover || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedDetailLog.type === '병가' && (
                                <div className="space-y-3 p-4 bg-green-50/50 rounded-xl border border-green-100">
                                    <h4 className="text-xs font-bold text-green-700 flex items-center gap-1.5"><Stethoscope size={14} /> 병가 상세 내역</h4>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">증상/사유</span>
                                        <span className="font-bold text-gray-900">{selectedDetailLog.symptoms || '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">진료 병원</span>
                                        <span className="font-bold text-gray-900">{selectedDetailLog.hospital || '-'}</span>
                                    </div>
                                </div>
                            )}

                            {selectedDetailLog.type === '경조사' && (
                                <div className="space-y-3 p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                                    <h4 className="text-xs font-bold text-purple-700 flex items-center gap-1.5"><Gift size={14} /> 경조사 상세 내역</h4>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">대상(관계)</span>
                                        <span className="font-bold text-gray-900">{selectedDetailLog.relationship || '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">경조 내용</span>
                                        <span className="font-bold text-gray-900">{selectedDetailLog.eventType || '-'}</span>
                                    </div>
                                </div>
                            )}

                            {selectedDetailLog.status === '반려됨' && selectedDetailLog.rejectionReason && (
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <h4 className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1.5"><AlertCircle size={14} /> 관리자 반려 사유</h4>
                                    <p className="text-xs text-red-800 leading-relaxed font-medium">
                                        {selectedDetailLog.rejectionReason}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={() => setSelectedDetailLog(null)} 
                                className="px-6 py-2.5 text-sm bg-black text-white rounded-xl hover:bg-gray-800 font-bold transition-all shadow-md active:scale-95"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
