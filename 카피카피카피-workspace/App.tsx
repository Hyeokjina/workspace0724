
import React, { useState } from 'react';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { ProfileView } from './components/ProfileView';
import { ScheduleView } from './components/ScheduleView';
import { OrgChartView } from './components/OrgChartView';
import { CreatorManagerView } from './components/CreatorManagerView';
import { AttendanceView } from './components/AttendanceView';
import { HRDashboardView } from './components/HRDashboardView';
import { TeamView } from './components/TeamView';
import { User, UserProfile, UserRole, VacationLog, Team, Employee, HealthRecord, SupportRequest, ScheduleEvent, ScheduleTemplate } from './types';
import { 
    EMPLOYEE_PROFILE_DATA, ADMIN_PROFILE_DATA, INITIAL_VACATION_LOGS, 
    INITIAL_TEAMS, INITIAL_EMPLOYEES, INITIAL_HEALTH_RECORDS, INITIAL_SCHEDULE_EVENTS, INITIAL_SCHEDULE_TEMPLATES 
} from './constants';
import { Creator, INITIAL_CREATORS, HealthRecord as CreatorHealthRecord, IssueLog, CreatorEvent, INITIAL_EVENTS, PhqSurveyModal, INITIAL_TASKS } from './components/CreatorShared';
import { Bot, X, Maximize2, Minimize2, Send, MessageCircle, MapPin, Phone, Target, ClipboardList, Stethoscope, Gift, BrainCircuit, CheckCircle2 } from 'lucide-react';

const INITIAL_CREATOR_HEALTH: CreatorHealthRecord[] = [
    { id: '1', name: '슈카월드', lastCheck: '2023-12-10', score: 95, result: '양호', status: '재직중' },
    { id: '2', name: '침착맨', lastCheck: '2023-11-05', score: 65, result: '주의', status: '재직중' },
    { id: '3', name: '요리보고', lastCheck: '2024-01-05', score: 88, result: '양호', status: '대기중' },
    { id: '4', name: '여행가제이', lastCheck: '2023-09-20', score: 92, result: '양호', status: '재직중' },
    { id: '6', name: '치즈냥이', lastCheck: '-', score: 0, result: '미수검', status: '재직중' },
];

const INITIAL_CREATOR_ISSUES: IssueLog[] = [
    { id: 1, creator: '침착맨', date: '2024-01-15', category: '경미', description: '최근 방송 중 피로감 호소, 가벼운 번아웃 증상', status: '상담중' },
    { id: 2, creator: '치즈냥이', date: '2024-01-18', category: '중등도', description: '불면증 및 무기력증 호소, 전문 상담 권고', status: '휴식권고' },
    { id: 3, creator: '슈카월드', date: '2023-12-20', category: '정상', description: '정기 심리 상담 결과 양호, 특이사항 없음', status: '모니터링' },
];

const INITIAL_SUPPORT_REQUESTS: SupportRequest[] = [
    { id: 'sr-1', creatorId: '2', creatorName: '침착맨', type: 'legal', title: '저작권 관련 문의', content: '유튜브 영상 내 BGM 사용 관련 저작권 침해 경고 발생 건', requestDate: '2024-01-25', status: '진행중' },
    { id: 'sr-2', creatorId: '5', creatorName: '겜돌이', type: 'tax', title: '종합소득세 신고', content: '2023년 귀속 종합소득세 신고 자료 준비 요청', requestDate: '2024-01-20', status: '완료' },
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('mypage');
  const [userProfile, setUserProfile] = useState<UserProfile>(EMPLOYEE_PROFILE_DATA);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [vacationLogs, setVacationLogs] = useState<VacationLog[]>(INITIAL_VACATION_LOGS);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  
  // Shared States (Global)
  const [employeeHealthRecords, setEmployeeHealthRecords] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>(INITIAL_SCHEDULE_EVENTS);
  const [scheduleTemplates, setScheduleTemplates] = useState<ScheduleTemplate[]>(INITIAL_SCHEDULE_TEMPLATES);

  // Creator Health & Events & Support
  const [creatorHealthRecords, setCreatorHealthRecords] = useState<CreatorHealthRecord[]>(INITIAL_CREATOR_HEALTH);
  const [creatorIssueLogs, setCreatorIssueLogs] = useState<IssueLog[]>(INITIAL_CREATOR_ISSUES);
  const [creatorEvents, setCreatorEvents] = useState<CreatorEvent[]>(INITIAL_EVENTS); 
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>(INITIAL_SUPPORT_REQUESTS);
  
  // Chat & Global Modal States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);

  // PHQ-9 Survey State (Employee Self-Check)
  const [isPhqModalOpen, setIsPhqModalOpen] = useState(false);

  // Global Vacation Form State
  const [vacationForm, setVacationForm] = useState({
      type: '연차', startDate: '', endDate: '', reason: '',
      location: '', emergencyContact: '', workGoals: '', handover: '',
      relationship: '', eventType: '', symptoms: '', hospital: ''
  });

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === UserRole.ADMIN) {
        setUserProfile(ADMIN_PROFILE_DATA);
        setCurrentView('mypage');
    } else if (loggedInUser.role === UserRole.CREATOR) {
        setUserProfile({
            ...EMPLOYEE_PROFILE_DATA,
            name: loggedInUser.name,
            job: 'Creator',
            org: 'MCN',
            rank: '-',
            avatarUrl: loggedInUser.avatarUrl
        });
        setCurrentView('creator-schedule');
    } else {
        setUserProfile(EMPLOYEE_PROFILE_DATA);
        setCurrentView('mypage');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsChatOpen(false);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
      setUserProfile(updatedProfile);
      setEmployees(prevEmployees => prevEmployees.map(emp => 
          emp.id === updatedProfile.employeeId
          ? { 
              ...emp, 
              name: updatedProfile.name,
              engName: updatedProfile.engName,
              nickname: updatedProfile.nickname,
              email: updatedProfile.email,
              personalEmail: updatedProfile.personalEmail,
              phone: updatedProfile.phone,
              avatarUrl: updatedProfile.avatarUrl,
              coverUrl: updatedProfile.coverUrl
            }
          : emp
      ));
  };

  const handleUpdateCreators = (updatedCreators: Creator[]) => {
      setCreators(updatedCreators);
  };

  const handleAddHealthRecord = (newRecord: HealthRecord) => {
      setEmployeeHealthRecords([newRecord, ...employeeHealthRecords]);
  };

  const handleAddSupportRequest = (newRequest: SupportRequest) => {
      setSupportRequests([newRequest, ...supportRequests]);
  };

  const handleVacationSubmit = () => {
      if(!vacationForm.startDate || !vacationForm.endDate) return alert('날짜를 선택해주세요.');
      
      const newLog: VacationLog = {
          id: Date.now(),
          name: userProfile.name,
          type: vacationForm.type,
          startDate: vacationForm.startDate,
          endDate: vacationForm.endDate,
          days: 1, 
          status: '대기중',
          reason: vacationForm.reason || `${vacationForm.type} 신청`
      };

      setVacationLogs([newLog, ...vacationLogs]);
      setIsVacationModalOpen(false);
      alert(`${vacationForm.type} 신청이 완료되었습니다.`);
      setVacationForm({ 
          type: '연차', startDate: '', endDate: '', reason: '', 
          location: '', emergencyContact: '', workGoals: '', handover: '',
          relationship: '', eventType: '', symptoms: '', hospital: ''
      });
  };

  const handlePhqSubmit = () => {
      alert('자가진단이 완료되었습니다.');
      setIsPhqModalOpen(false);
  };

  const pendingApprovals = vacationLogs.filter(log => log.status === '대기중').length;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const isCreator = user.role === UserRole.CREATOR;
  const creatorTasks = isCreator && user.id ? (INITIAL_TASKS[user.id] || []) : [];

  return (
    <div className="flex h-screen bg-white relative">
      <Sidebar 
        user={user} 
        userProfile={userProfile}
        onLogout={handleLogout} 
        currentView={currentView}
        onNavigate={setCurrentView}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        pendingApprovals={pendingApprovals}
        onOpenVacationModal={() => setIsVacationModalOpen(true)}
        onOpenPhqModal={() => setIsPhqModalOpen(true)}
      />
      
      {currentView === 'mypage' && (
        <ProfileView 
          profile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          vacationLogs={vacationLogs}
          onAddHealthRecord={handleAddHealthRecord}
          isCreator={isCreator}
          tasks={creatorTasks}
          onOpenPhqModal={() => setIsPhqModalOpen(true)}
        />
      )}
      
      {currentView === 'schedule' && (
        <ScheduleView 
          user={user}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          events={scheduleEvents}
          onUpdateEvents={setScheduleEvents}
          templates={scheduleTemplates}
          onUpdateTemplates={setScheduleTemplates}
        />
      )}

      {currentView === 'attendance' && (
        <AttendanceView 
            vacationLogs={vacationLogs} 
            onUpdateVacationLogs={setVacationLogs}
            userName={userProfile.name}
        />
      )}

      {(currentView === 'hr-staff' || currentView === 'hr-attendance' || currentView === 'hr-health' || currentView === 'hr-vacation' || currentView === 'hr-teams' || currentView === 'hr-support') && (
        <HRDashboardView 
            vacationLogs={vacationLogs} 
            onUpdateVacationLogs={setVacationLogs}
            teams={teams}
            onUpdateTeams={setTeams}
            employees={employees}
            onUpdateEmployees={setEmployees}
            creators={creators}
            employeeHealthRecords={employeeHealthRecords} 
            supportRequests={supportRequests}
            onUpdateSupportRequests={setSupportRequests}
            initialTab={
                currentView === 'hr-staff' ? 'staff' :
                currentView === 'hr-attendance' ? 'attendance' :
                currentView === 'hr-health' ? 'health' :
                currentView === 'hr-vacation' ? 'vacation' : 
                currentView === 'hr-support' ? 'support' : 'teams'
            }
        />
      )}

      {currentView === 'org-chart' && (
        <OrgChartView />
      )}
      
      {currentView === 'team' && (
        <TeamView 
            user={user} 
            teams={teams}
            employees={employees}
            vacationLogs={vacationLogs}
            creators={creators}
        />
      )}

      {(currentView === 'creator' || currentView === 'my-creator' || currentView === 'creator-schedule' || currentView === 'creator-health') && (
        <CreatorManagerView 
            user={user} 
            creators={creators}
            onUpdateCreators={handleUpdateCreators}
            healthRecords={creatorHealthRecords}
            onUpdateHealthRecords={setCreatorHealthRecords}
            issueLogs={creatorIssueLogs}
            onUpdateIssueLogs={setCreatorIssueLogs}
            employees={employees}
            events={creatorEvents}
            onUpdateEvents={setCreatorEvents}
            onAddSupportRequest={handleAddSupportRequest}
            currentView={currentView}
        />
      )}

      {isVacationModalOpen && (
          <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsVacationModalOpen(false)}>
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 bg-white z-10">
                      <h3 className="font-bold text-gray-900">휴가 신청</h3>
                      <button onClick={() => setIsVacationModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                  </div>
                  <div className="p-6 space-y-5">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">휴가 종류</label>
                          <div className="grid grid-cols-3 gap-2">
                              {['연차', '반차', '경조사', '병가', '워케이션'].map(type => (
                                  <button
                                      key={type}
                                      onClick={() => setVacationForm({...vacationForm, type})}
                                      className={`py-2 rounded-lg text-sm border transition-all ${vacationForm.type === type ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                  >
                                      {type}
                                  </button>
                              ))}
                          </div>
                      </div>

                      {vacationForm.type === '워케이션' && (
                          <div className="space-y-4 p-4 bg-blue-50/30 rounded-lg border border-blue-100 animate-[fadeIn_0.2s]">
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1"><MapPin size={12} /> 근무 장소</label>
                                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white" placeholder="예: 제주 오피스" value={vacationForm.location} onChange={e => setVacationForm({...vacationForm, location: e.target.value})} />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1"><Phone size={12} /> 비상 연락망</label>
                                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white" placeholder="예: 010-0000-0000" value={vacationForm.emergencyContact} onChange={e => setVacationForm({...vacationForm, emergencyContact: e.target.value})} />
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1"><Target size={12} /> 업무 계획</label>
                                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white resize-none" rows={2} placeholder="주요 업무 목표를 입력하세요" value={vacationForm.workGoals} onChange={e => setVacationForm({...vacationForm, workGoals: e.target.value})} />
                              </div>
                          </div>
                      )}

                      {vacationForm.type === '경조사' && (
                          <div className="space-y-4 p-4 bg-purple-50/30 rounded-lg border border-purple-100 animate-[fadeIn_0.2s]">
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-gray-600 mb-1.5">대상(관계)</label>
                                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white" placeholder="예: 본인, 부모 등" value={vacationForm.relationship} onChange={e => setVacationForm({...vacationForm, relationship: e.target.value})} />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-600 mb-1.5">경조 내용</label>
                                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white" placeholder="예: 결혼, 장례 등" value={vacationForm.eventType} onChange={e => setVacationForm({...vacationForm, eventType: e.target.value})} />
                                  </div>
                              </div>
                          </div>
                      )}

                      {vacationForm.type === '병가' && (
                          <div className="space-y-4 p-4 bg-green-50/30 rounded-lg border border-green-100 animate-[fadeIn_0.2s]">
                              <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1"><Stethoscope size={14} /> 증상 및 사유</label>
                              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white" placeholder="예: 독감으로 인한 고열 등" value={vacationForm.symptoms} onChange={e => setVacationForm({...vacationForm, symptoms: e.target.value})} />
                          </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">시작일</label>
                              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" value={vacationForm.startDate} onChange={e => setVacationForm({...vacationForm, startDate: e.target.value})} />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">종료일</label>
                              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" value={vacationForm.endDate} onChange={e => setVacationForm({...vacationForm, endDate: e.target.value})} />
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">상세 사유 (선택)</label>
                          <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-black" rows={3} placeholder="추가적인 사유가 있다면 입력하세요" value={vacationForm.reason} onChange={e => setVacationForm({...vacationForm, reason: e.target.value})} />
                      </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0">
                      <button onClick={() => setIsVacationModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors">취소</button>
                      <button onClick={handleVacationSubmit} className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 font-bold shadow-sm transition-colors">신청 완료</button>
                  </div>
              </div>
          </div>
      )}

      {isPhqModalOpen && <PhqSurveyModal onClose={() => setIsPhqModalOpen(false)} onSubmit={handlePhqSubmit} />}

      {isChatOpen ? (
        <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col z-50 transition-all duration-300 ease-in-out ${isChatExpanded ? 'w-[360px] h-[calc(100vh-3rem)]' : 'w-80 h-[500px]'}`}>
            <div className="bg-[#00C471] p-4 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-2 font-bold"><Bot size={20} /> AI Assistant</div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsChatExpanded(!isChatExpanded)} className="p-1 hover:bg-white/20 rounded transition-colors">{isChatExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</button>
                    <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={18} /></button>
                </div>
            </div>
            <div className="flex-1 bg-[#F9F9F9] p-4 overflow-y-auto space-y-4">
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00C471] flex items-center justify-center text-white shrink-0"><Bot size={16} /></div>
                    <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none p-3 text-sm text-gray-700 shadow-sm max-w-[85%]">
                        안녕하세요! 무엇을 도와드릴까요? HR 관리 기능이나 휴가 신청에 대해 궁금한 점이 있으시면 말씀해주세요.
                    </div>
                </div>
            </div>
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                <div className="relative">
                    <input type="text" placeholder="메시지를 입력하세요..." className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 transition-all"/>
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#00C471] text-white p-1.5 rounded-full hover:bg-[#00b065] transition-colors shadow-sm"><Send size={14} /></button>
                </div>
            </div>
        </div>
      ) : (
        <div className="fixed bottom-8 right-8 z-50 animate-[fadeIn_0.5s_ease-out]">
            <button onClick={() => setIsChatOpen(true)} className="bg-[#00C471] text-white p-3.5 rounded-full shadow-lg hover:bg-[#00b065] cursor-pointer transition-all hover:scale-110 active:scale-95 group">
                <Bot size={28} className="group-hover:rotate-12 transition-transform" />
            </button>
        </div>
      )}
    </div>
  );
}

export default App;
