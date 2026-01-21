
import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit3, Lock, Home, Mail, Phone, Users, Clock, UserPlus, X, AlertCircle, UserCheck, Calendar, ChevronDown } from 'lucide-react';
import { Employee, UserProfile, VacationLog } from '../../types';

interface StaffManagementProps {
    employees: Employee[];
    onUpdateEmployees: (employees: Employee[]) => void;
    vacationLogs: VacationLog[];
}

// 부서 및 직무 데이터 구조화 (이전 요청사항 유지)
const DEPT_DATA: Record<string, string[]> = {
    '매니지먼트 본부 (Creator Management)': [
        '크리에이터 매니저',
        '파트너십 매니저 (영입)',
        '채널 분석가 (스트래티지스트)',
        '글로벌 매니저'
    ],
    '광고/사업 본부 (Business Solution)': [
        '광고 영업 담당 (AE)',
        '광고 기획/운영 (CAM)',
        '커머스 MD',
        'IP 사업 담당',
        '마케터'
    ],
    '경영지원 본부 (Management Support)': [
        '정산 담당자',
        '인사 담당자 (HR)',
        '재무/회계 담당',
        '법무/저작권 담당',
        '총무'
    ],
    '콘텐츠 제작 본부 (Content Studio)': [
        '총괄 프로듀서 (CP)',
        '영상 PD',
        '영상 편집자 (에디터)',
        '콘텐츠 작가',
        '디자이너',
        '모션 그래픽 디자이너'
    ]
};

const DEPT_OPTIONS = Object.keys(DEPT_DATA);

export const StaffManagement: React.FC<StaffManagementProps> = ({ employees, onUpdateEmployees, vacationLogs }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalType, setModalType] = useState<'none' | 'reg' | 'edit' | 'resignation'>('none');
    const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
    const [resignationReason, setResignationReason] = useState('');
    
    // staffForm handles both Registration and Edit data
    const [staffForm, setStaffForm] = useState({ 
        name: '', engName: '', dept: DEPT_OPTIONS[0], role: DEPT_DATA[DEPT_OPTIONS[0]][0], employeeId: '',
        email: '', personalEmail: '', phone: '', joinDate: '',
        nickname: '', password: '', permission: '직원', address: '', joinType: '경력'
    });

    const stats = useMemo(() => ({
        total: employees.length,
        working: employees.filter(e => e.workStatus === '출근').length,
        onLeave: employees.filter(e => ['휴가', '병가'].includes(e.workStatus)).length,
        newJoiners: employees.filter(e => {
            const diff = Math.abs(new Date().getTime() - new Date(e.joinDate).getTime());
            return diff / (1000 * 60 * 60 * 24) <= 365;
        }).length
    }), [employees]);

    const filteredEmployees = employees.filter(e => 
        e.name.includes(searchQuery) || e.dept.includes(searchQuery) || (e.nickname && e.nickname.includes(searchQuery))
    );

    const handleManageClick = (emp: Employee) => {
        setEditingStaffId(emp.id);
        setStaffForm({
            name: emp.name, engName: emp.engName, dept: emp.dept, role: emp.role, employeeId: emp.id,
            email: emp.email, personalEmail: emp.personalEmail || '', phone: emp.phone,
            joinDate: emp.joinDate, nickname: emp.nickname || '', password: '', 
            permission: '직원', address: '', joinType: '경력'
        });
        setModalType('edit');
    };

    const handleSave = () => {
        if(!staffForm.name || !staffForm.employeeId) return alert('필수 정보를 입력해주세요.');
        
        if (modalType === 'reg') {
            const newEmp: Employee = { 
                id: staffForm.employeeId,
                name: staffForm.name,
                engName: staffForm.engName,
                dept: staffForm.dept,
                role: staffForm.role,
                workStatus: '퇴근',
                email: staffForm.email,
                personalEmail: staffForm.personalEmail,
                phone: staffForm.phone,
                joinDate: staffForm.joinDate,
                nickname: staffForm.nickname,
                rank: staffForm.joinType === '신입' ? 'Level 1' : 'Level 2'
            };
            onUpdateEmployees([...employees, newEmp]);
            alert(`${staffForm.name} 님이 등록되었습니다.`);
        } else {
            onUpdateEmployees(employees.map(e => e.id === editingStaffId ? { 
                ...e, 
                name: staffForm.name,
                engName: staffForm.engName,
                dept: staffForm.dept,
                role: staffForm.role,
                email: staffForm.email,
                personalEmail: staffForm.personalEmail,
                phone: staffForm.phone,
                joinDate: staffForm.joinDate,
                nickname: staffForm.nickname
            } : e));
            alert('직원 정보가 수정되었습니다.');
        }
        setModalType('none');
    };

    const handleResignation = () => {
        if (!resignationReason) return alert('사유를 입력해주세요.');
        onUpdateEmployees(employees.map(e => e.id === editingStaffId ? { ...e, workStatus: '퇴직' as any } : e));
        setModalType('none');
    };

    const handleDeptChange = (newDept: string) => {
        setStaffForm({
            ...staffForm,
            dept: newDept,
            role: DEPT_DATA[newDept][0]
        });
    };

    const StatCard = ({ label, value, icon: Icon, subLabel }: { label: string, value: number, icon: any, subLabel?: string }) => (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{label}</span>
                <Icon size={18} className="text-gray-800" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gray-900 leading-tight">{value}</span>
                <span className="text-sm text-gray-400 font-medium">명</span>
            </div>
            {subLabel && <p className="text-[11px] text-gray-400 mt-2">{subLabel}</p>}
        </div>
    );

    return (
        <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard label="총 직원수" value={stats.total} icon={Users} subLabel="현재 등록된 전체 구성원 수입니다." />
                <StatCard label="현재 근무중" value={stats.working} icon={UserCheck} subLabel="실시간 업무 상태가 '출근'인 인원" />
                <StatCard label="휴가/부재" value={stats.onLeave} icon={Calendar} subLabel="연차, 반차, 병가 등으로 부재중인 인원" />
                <StatCard label="신규 입사자" value={stats.newJoiners} icon={UserPlus} subLabel="최근 1년 이내 입사한 신규 인력" />
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="이름, 부서 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64 focus:outline-none focus:border-black transition-colors" />
                </div>
                <button onClick={() => { setStaffForm({ name: '', engName: '', dept: DEPT_OPTIONS[0], role: DEPT_DATA[DEPT_OPTIONS[0]][0], employeeId: '', email: '', personalEmail: '', phone: '', joinDate: '', nickname: '', password: '', permission: '직원', address: '', joinType: '경력' }); setModalType('reg'); }} className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm"><Plus size={16} /> 직원 등록</button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                        <tr><th className="px-6 py-3 border-r border-gray-200">이름/부서</th><th className="px-6 py-3 border-r border-gray-200">연락처</th><th className="px-6 py-3 border-r border-gray-200">입사일</th><th className="px-6 py-3 border-r border-gray-200">근태 상태</th><th className="px-6 py-3 text-center">관리</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredEmployees.map(emp => (
                            <tr key={emp.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-r border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">{emp.avatarUrl ? <img src={emp.avatarUrl} className="w-full h-full object-cover"/> : emp.name.charAt(0)}</div>
                                        <div><div className="font-bold text-gray-900">{emp.name} <span className="text-gray-400 font-normal text-xs">({emp.id})</span></div><div className="text-xs text-gray-500">{emp.dept} · {emp.role}</div></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 border-r border-gray-100"><div>{emp.email}</div><div className="text-xs text-gray-400">{emp.phone}</div></td>
                                <td className="px-6 py-4 text-gray-600 border-r border-gray-100">{emp.joinDate}</td>
                                <td className="px-6 py-4 border-r border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        {emp.workStatus === '출근' && <><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-green-700 font-medium text-xs">업무중</span></>}
                                        {emp.workStatus === '퇴근' && <><span className="w-2 h-2 rounded-full bg-gray-300"></span><span className="text-gray-500 text-xs">퇴근</span></>}
                                        {(emp.workStatus === '휴가' || emp.workStatus === '병가') && <><span className={`w-2 h-2 rounded-full ${emp.workStatus === '병가' ? 'bg-red-500' : 'bg-blue-500'}`}></span><span className="text-xs font-medium">{emp.workStatus}</span></>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center"><button onClick={() => handleManageClick(emp)} className="text-gray-400 hover:text-black hover:bg-gray-100 p-1.5 rounded-full transition-all"><Edit3 size={16} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {(modalType === 'reg' || modalType === 'edit') && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setModalType('none')}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200 max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10"><h3 className="text-xl font-bold text-gray-900">{modalType === 'reg' ? '신규 직원 등록' : '직원 정보 관리'}</h3><button onClick={() => setModalType('none')}><X size={24}/></button></div>
                        
                        <div className="p-8">
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">이름</label>
                                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" placeholder="예: 홍길동" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">영문 이름</label>
                                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" placeholder="예: Gildong Hong" value={staffForm.engName} onChange={e => setStaffForm({...staffForm, engName: e.target.value})} />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">사번</label>
                                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" placeholder="예: AB123" value={staffForm.employeeId} onChange={e => setStaffForm({...staffForm, employeeId: e.target.value})} disabled={modalType === 'edit'} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">입사일</label>
                                        <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" value={staffForm.joinDate} onChange={e => setStaffForm({...staffForm, joinDate: e.target.value})} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">부서</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white appearance-none"
                                                value={staffForm.dept}
                                                onChange={e => handleDeptChange(e.target.value)}
                                            >
                                                {DEPT_OPTIONS.map(dept => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">직무</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white appearance-none"
                                                value={staffForm.role}
                                                onChange={e => setStaffForm({...staffForm, role: e.target.value})}
                                            >
                                                {(DEPT_DATA[staffForm.dept] || []).map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">닉네임</label>
                                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" placeholder="예: 닉" value={staffForm.nickname} onChange={e => setStaffForm({...staffForm, nickname: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">패스워드</label>
                                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:border-black">
                                            <Lock size={14} className="text-gray-400" />
                                            <input type="password" className="w-full text-sm outline-none" placeholder="비밀번호" value={staffForm.password} onChange={e => setStaffForm({...staffForm, password: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">권한</label>
                                        <select 
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                                            value={staffForm.permission}
                                            onChange={e => setStaffForm({...staffForm, permission: e.target.value})}
                                        >
                                            <option value="직원">직원</option>
                                            <option value="매니저">매니저</option>
                                            <option value="인사/운영자">인사/운영자</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">입사 유형</label>
                                        <select 
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                                            value={staffForm.joinType}
                                            onChange={e => setStaffForm({...staffForm, joinType: e.target.value})}
                                        >
                                            <option value="신입">신입</option>
                                            <option value="경력">경력</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">주소</label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:border-black">
                                        <Home size={14} className="text-gray-400" />
                                        <input className="w-full text-sm outline-none" placeholder="예: 서울시 강남구..." value={staffForm.address} onChange={e => setStaffForm({...staffForm, address: e.target.value})} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">사내 이메일</label>
                                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:border-black">
                                            <Mail size={14} className="text-gray-400" />
                                            <input className="w-full text-sm outline-none" placeholder="example@company.com" value={staffForm.email} onChange={e => setStaffForm({...staffForm, email: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">연락처</label>
                                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" placeholder="010-0000-0000" value={staffForm.phone} onChange={e => setStaffForm({...staffForm, phone: e.target.value})} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">개인 이메일</label>
                                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white" placeholder="example@gmail.com" value={staffForm.personalEmail} onChange={e => setStaffForm({...staffForm, personalEmail: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50 flex items-center justify-end gap-3 border-t border-gray-100">
                            {modalType === 'edit' && <button onClick={() => setModalType('resignation')} className="px-6 py-2.5 text-sm text-white bg-red-500 rounded-xl font-bold mr-auto">퇴사처리</button>}
                            <button onClick={() => setModalType('none')} className="px-6 py-2.5 text-sm text-gray-500">취소</button>
                            <button onClick={handleSave} className="px-8 py-2.5 text-sm bg-black text-white rounded-xl font-bold">저장</button>
                        </div>
                    </div>
                </div>
            )}

            {modalType === 'resignation' && (
                <div className="fixed inset-0 bg-black/30 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-sm overflow-hidden border border-gray-200">
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50/50"><h3 className="font-bold text-red-700 flex items-center gap-2"><AlertCircle size={18}/> 퇴사 처리</h3></div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 leading-relaxed"><span className="font-bold text-gray-900">{staffForm.name}</span>님을 퇴사 처리 하시겠습니까?</p>
                            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-24" placeholder="퇴사 사유 입력" value={resignationReason} onChange={e => setResignationReason(e.target.value)} />
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2"><button onClick={() => setModalType('edit')} className="px-4 py-2 text-sm">취소</button><button onClick={handleResignation} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg font-bold">최종 확인</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};
