
import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, AlertCircle, BrainCircuit, Stethoscope, Plus, Activity, User, Calendar, FileText, Download, Trash2, Edit3, Upload, RefreshCw } from 'lucide-react';
import { Creator, HealthRecord, IssueLog } from './types';

// PHQ-9 Survey Modal Component with Scoring Logic
export const PhqSurveyModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (result: { score: number, category: string, description: string }) => void }) => {
    const [step, setStep] = useState(0);
    const questions = [
        "기분이 가라앉거나, 우울하거나, 희망이 없다고 느꼈다.",
        "평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못했다.",
        "잠들기가 어렵거나 자주 깼다/혹은 너무 많이 잤다.",
        "평소보다 식욕이 줄었다/혹은 평소보다 많이 먹었다.",
        "다른 사람들이 눈치 챌 정도로 평소보다 말과 행동이 느려졌다.",
        "피곤하고 기운이 없었다.",
        "내가 잘못 했거나, 실패했다는 생각이 들었다.",
        "신문을 읽거나 TV를 보는 것과 같은 일상적인 일에도 집중 할 수가 없었다.",
        "차라리 죽는 것이 더 낮겠다고 생각했다."
    ];
    const options = ["없음", "2-6일", "7-12일", "거의 매일"];
    const [answers, setAnswers] = useState<number[]>(new Array(9).fill(0));

    // Scoring result state
    const [scoreResult, setScoreResult] = useState<{ score: number, category: string, description: string, color: string } | null>(null);

    const calculateResult = () => {
        const totalScore = answers.reduce((a, b) => a + b, 0);
        let category = '';
        let description = '';
        let color = '';

        if (totalScore <= 4) {
            category = '정상';
            description = '유의한 수준의 우울감이 시사되지 않습니다.';
            color = 'text-green-600 bg-green-50 border-green-200';
        } else if (totalScore <= 9) {
            category = '경미';
            description = '다소 경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다. 다만, 이러한 기분상태가 지속될 경우 개인의 신체적, 심리적 대처자원을 저하시킬 수 있습니다. 그러한 경우, 가까운 지역센터나 전문기관을 방문하시기 바랍니다.';
            color = 'text-blue-600 bg-blue-50 border-blue-200';
        } else if (totalScore <= 19) {
            category = '주의';
            description = '중간정도 수준의 우울감이 시사됩니다. 이러한 수준의 우울감은 흔히 신체적, 심리적 대처자원을 저하시키며 개인의 일상생활을 어렵게 만들기도 합니다. 가까운 지역센터나 전문기관을 방문하여 보다 상세한 평가와 도움을 받아보시기 바랍니다.';
            color = 'text-orange-600 bg-orange-50 border-orange-200';
        } else {
            category = '심각';
            description = '심한 수준의 우울감이 시사됩니다. 전문기관의 치료적 개입과 평가가 요구됩니다.';
            color = 'text-red-600 bg-red-50 border-red-200';
        }

        setScoreResult({ score: totalScore, category, description, color });
        setStep(2);
    };

    const handleFinalize = () => {
        if (scoreResult) {
            onSubmit({ 
                score: scoreResult.score, 
                category: scoreResult.category, 
                description: scoreResult.description 
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col font-sans" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">우울증 건강설문 (PHQ-9)</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-400"/></button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {step === 0 && (
                        <div className="text-center py-8">
                            <h2 className="text-xl font-bold mb-2">설문을 시작할까요?</h2>
                            <p className="text-sm text-gray-500 mb-6">지난 2주간의 상태를 체크해주세요.</p>
                            <button onClick={() => setStep(1)} className="bg-black text-white px-6 py-2 rounded-lg text-sm">시작하기</button>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="space-y-6">
                            {questions.map((q, idx) => (
                                <div key={idx} className="space-y-2">
                                    <p className="text-sm font-medium">{idx + 1}. {q}</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {options.map((opt, val) => (
                                            <button 
                                                key={val}
                                                onClick={() => {
                                                    const newAns = [...answers];
                                                    newAns[idx] = val;
                                                    setAnswers(newAns);
                                                }}
                                                className={`py-2 text-xs rounded border ${answers[idx] === val ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 text-center">
                                <button onClick={calculateResult} className="bg-black text-white px-8 py-2 rounded-lg text-sm">제출하기</button>
                            </div>
                        </div>
                    )}
                    {step === 2 && scoreResult && (
                        <div className="text-center py-6 px-4">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">검사 결과</h2>
                                <p className="text-sm text-gray-500">자가진단 결과는 다음과 같습니다.</p>
                            </div>
                            
                            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="text-sm text-gray-500 font-medium mb-1">총점</div>
                                <div className="text-4xl font-bold text-gray-900 mb-4">{scoreResult.score} <span className="text-lg text-gray-400 font-medium">/ 27</span></div>
                                
                                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border mb-4 ${scoreResult.color}`}>
                                    {scoreResult.category}
                                </div>
                                
                                <div className="text-left bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-700 leading-relaxed shadow-sm">
                                    <span className="font-bold block mb-1">📋 결과 설명</span>
                                    {scoreResult.description}
                                </div>
                            </div>

                            <button onClick={handleFinalize} className="bg-black text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-800 transition-colors w-full">
                                확인 완료
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Updated CreatorHealthView to accept props and sync state
interface CreatorHealthViewProps {
    creators: Creator[];
    records: HealthRecord[];
    onUpdateRecords: (records: HealthRecord[]) => void;
    logs: IssueLog[];
    onUpdateLogs: (logs: IssueLog[]) => void;
    readOnly?: boolean;
    isCreator?: boolean;
}

export const CreatorHealthView: React.FC<CreatorHealthViewProps> = ({ 
    creators, 
    records, 
    onUpdateRecords, 
    logs, 
    onUpdateLogs,
    readOnly = false,
    isCreator = false
}) => {
    // Filter records to only show passed creators
    const creatorNames = creators.map(c => c.name);
    const filteredRecords = records.filter(r => creatorNames.includes(r.name));
    const filteredLogs = logs.filter(l => creatorNames.includes(l.creator));

    // Calculate statistics
    const stats = {
        physicalNormal: filteredRecords.filter(r => r.result.includes('양호') || r.result.includes('정상')).length,
        physicalCaution: filteredRecords.filter(r => r.result.includes('주의')).length,
        physicalRisk: filteredRecords.filter(r => r.result.includes('위험')).length,
        mentalSevere: filteredLogs.filter(l => 
            l.category.includes('중등') || l.category.includes('심각') || l.status === '치료필요' || l.status === '휴식권고'
        ).length
    };

    // States
    const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Form States
    const [newCheckup, setNewCheckup] = useState({
        creatorName: '',
        date: new Date().toISOString().split('T')[0],
        result: '정상 (양호)'
    });

    const [newIssue, setNewIssue] = useState({
        creatorName: '',
        date: new Date().toISOString().split('T')[0],
        category: '정상',
        description: '',
        status: '모니터링'
    });

    const getHealthResultStyle = (result: string) => {
        if (result.includes('양호') || result.includes('정상')) return 'bg-green-50 text-green-700 border-green-200';
        if (result.includes('주의')) return 'bg-orange-50 text-orange-700 border-orange-200';
        if (result.includes('위험')) return 'bg-red-50 text-red-700 border-red-200';
        if (result.includes('재검')) return 'bg-purple-50 text-purple-700 border-purple-200';
        if (result.includes('미수검')) return 'bg-gray-50 text-gray-500 border-gray-200';
        return 'bg-blue-50 text-blue-700 border-blue-200';
    };

    const getIssueBadgeStyle = (category: string) => {
        if (category.includes('정상')) return 'bg-green-50 text-green-700 border-green-100';
        if (category.includes('경미')) return 'bg-blue-50 text-blue-700 border-blue-100';
        if (category.includes('주의')) return 'bg-orange-50 text-orange-700 border-orange-100';
        if (category.includes('심각')) return 'bg-red-50 text-red-700 border-red-100';
        return 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const handleAddCheckup = () => {
        if (!newCheckup.creatorName) return alert('크리에이터를 선택해주세요.');
        if (!uploadedFile) return alert('검진 결과 PDF 파일을 업로드해주세요.');

        // Score logic based on result for simplicity
        let score = 90;
        if (newCheckup.result.includes('주의')) score = 70;
        if (newCheckup.result.includes('위험')) score = 40;

        const newRecord: HealthRecord = {
            id: Date.now().toString(),
            name: newCheckup.creatorName,
            lastCheck: newCheckup.date,
            score: score,
            result: newCheckup.result,
            status: '업데이트됨'
        };
        
        // Replace old record or add new
        const otherRecords = records.filter(r => r.name !== newCheckup.creatorName);
        onUpdateRecords([newRecord, ...otherRecords]);
        setIsCheckModalOpen(false);
        setUploadedFile(null);
        alert('검진 결과가 성공적으로 등록되었습니다.');
    };

    const handleAddIssue = () => {
        if (!newIssue.creatorName || !newIssue.description) return alert('필수 정보를 입력해주세요.');
        const newLog: IssueLog = {
            id: Date.now(),
            creator: newIssue.creatorName,
            date: newIssue.date,
            category: newIssue.category,
            description: newIssue.description,
            status: newIssue.status
        };
        onUpdateLogs([newLog, ...logs]);
        setIsIssueModalOpen(false);
    };

    // Helper Component for Stat Cards
    const StatCard = ({ label, value, icon: Icon, subLabel }: any) => (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{label}</span>
                <div className="p-2 rounded-lg bg-white border border-gray-100">
                    <Icon size={16} className="text-black" />
                </div>
            </div>
            <div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                    <span className="text-xs text-gray-400 font-medium">명</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{subLabel}</p>
            </div>
        </div>
    );

    return (
        <div className="animate-[fadeIn_0.2s_ease-out] relative">
            {/* Statistics Dashboard - Only show if there are multiple creators (Manager/Admin View) */}
            {!isCreator && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        label="정상 (양호/경미)" 
                        value={stats.physicalNormal} 
                        icon={CheckCircle2} 
                        subLabel="건강 상태가 양호한 크리에이터"
                    />
                    <StatCard 
                        label="주의 (유소견)" 
                        value={stats.physicalCaution} 
                        icon={AlertTriangle} 
                        subLabel="추적 관찰이 필요한 크리에이터"
                    />
                    <StatCard 
                        label="위험 (질환의심)" 
                        value={stats.physicalRisk} 
                        icon={AlertCircle} 
                        subLabel="정밀 검사가 필요한 크리에이터"
                    />
                    <StatCard 
                        label="우울증 심각 현황" 
                        value={stats.mentalSevere} 
                        icon={BrainCircuit} 
                        subLabel="심리 상담 및 휴식이 권고된 인원"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: General Health Checkup */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <Stethoscope size={20} className="text-[#00C471]" />
                                크리에이터 건강 현황
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">정기 건강 검진 및 의료 지원 기록입니다.</p>
                        </div>
                        {/* Only show 'Add Record' if NOT readOnly AND NOT isCreator (i.e. Admin or Employee can add physical records, Creator cannot self-add physical records here) */}
                        {!readOnly && !isCreator && (
                            <button 
                                onClick={() => setIsCheckModalOpen(true)}
                                className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm flex items-center gap-1"
                            >
                                <Plus size={14} /> 검진 기록 추가
                            </button>
                        )}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">이름</th>
                                    <th className="px-6 py-3">최근 검진일</th>
                                    <th className="px-6 py-3">결과 판정</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredRecords.length > 0 ? filteredRecords.map(rec => (
                                    <tr 
                                        key={rec.id} 
                                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedRecord(rec)}
                                    >
                                        <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {rec.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {rec.lastCheck}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs border ${getHealthResultStyle(rec.result)}`}>
                                                {rec.result}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-gray-400 text-sm">
                                            등록된 건강 기록이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Depression Test Status */}
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <BrainCircuit size={20} className="text-gray-700" />
                                우울증 검사 현황
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">정기 정신 건강 검진 및 상담 기록</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredLogs.map(log => (
                            <div key={log.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all border-l-4 border-l-gray-300">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-gray-900">{log.creator}</span>
                                        <span className="text-[10px] text-gray-400">{log.date}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                                        log.status === '확인완료' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                                    }`}>
                                        {log.status}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${getIssueBadgeStyle(log.category)}`}>
                                            {log.category.replace(/.*\((.*)\).*/, '$1') || log.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{log.description}</p>
                                </div>
                            </div>
                        ))}
                        
                        {filteredLogs.length === 0 && (
                            <div className="py-8 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                기록된 검사 내역이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detail Modal (Same as Staff) */}
            {selectedRecord && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedRecord(null)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Activity size={18} className="text-blue-600"/>
                                건강검진 상세 내역
                            </h3>
                            <button onClick={() => setSelectedRecord(null)} className="text-gray-400 hover:text-gray-600 rounded p-1 hover:bg-gray-100 transition-colors">
                                <X size={20}/>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Summary Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">이름</label>
                                    <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                        <User size={14} className="text-gray-500"/> {selectedRecord.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">최근 검진일</label>
                                    <div className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                                        <Calendar size={14} className="text-gray-500"/> {selectedRecord.lastCheck}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">종합 판정 결과</label>
                                <div className={`inline-block px-3 py-1.5 rounded-lg text-sm border font-bold ${getHealthResultStyle(selectedRecord.result)}`}>
                                    {selectedRecord.result}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-500">첨부 파일</span>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:border-blue-300 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-50 text-red-600 rounded">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {selectedRecord.name}_건강검진결과표.pdf
                                            </div>
                                            <div className="text-xs text-gray-400">2.4 MB</div>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 group-hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2 text-xs text-gray-400 leading-relaxed bg-blue-50/50 p-3 rounded text-center">
                                * 상세 수치 및 의학적 소견은 첨부된 PDF 파일에서 확인하실 수 있습니다.
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={() => setSelectedRecord(null)} 
                                className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium shadow-sm"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkup Add Modal (Updated to File Upload Style) */}
            {isCheckModalOpen && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]" onClick={() => setIsCheckModalOpen(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900">검진 결과 등록</h3>
                            <button onClick={() => setIsCheckModalOpen(false)} className="text-gray-400 hover:text-gray-600 rounded p-1">
                                <X size={20}/>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                                <FileText size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-blue-800 text-sm">결과지 업로드 안내</h4>
                                    <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                                        크리에이터가 제출한 건강검진 결과표(PDF)를 업로드하여 DB에 저장합니다.<br/>
                                        업로드된 파일은 관리자 및 담당 매니저만 열람 가능합니다.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">대상 크리에이터 선택</label>
                                    <select 
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                                        value={newCheckup.creatorName}
                                        onChange={e => setNewCheckup({...newCheckup, creatorName: e.target.value})}
                                    >
                                        <option value="">선택하세요</option>
                                        {creators.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">최근 검진일</label>
                                    <input 
                                        type="date"
                                        value={newCheckup.date}
                                        onChange={e => setNewCheckup({...newCheckup, date: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">종합 판정 상태 선택</label>
                                    <select 
                                        value={newCheckup.result}
                                        onChange={e => setNewCheckup({...newCheckup, result: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                                    >
                                        <option value="정상 (양호)">정상 (양호)</option>
                                        <option value="정상 (경미)">정상 (경미)</option>
                                        <option value="유소견 (주의)">주의 (식생활 습관 개선 필요)</option>
                                        <option value="유소견 (위험)">위험 (질환 의심/치료 필요)</option>
                                        <option value="재검">재검 필요</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">결과 파일 업로드</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('file-upload-creator')?.click()}>
                                        <input 
                                            id="file-upload-creator" 
                                            type="file" 
                                            className="hidden" 
                                            accept=".pdf"
                                            onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                                        />
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
                                            <Upload size={24} />
                                        </div>
                                        {uploadedFile ? (
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{uploadedFile.name}</p>
                                                <p className="text-xs text-green-600 mt-1">파일이 선택되었습니다.</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-sm font-bold text-gray-700">PDF 파일을 드래그하거나 클릭하여 업로드</p>
                                                <p className="text-xs text-gray-400 mt-1">최대 10MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                            <button onClick={() => setIsCheckModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium">취소</button>
                            <button onClick={handleAddCheckup} className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm flex items-center gap-1">
                                <CheckCircle2 size={14} /> 저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
