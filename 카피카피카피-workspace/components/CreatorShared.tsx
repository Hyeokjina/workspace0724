
import React, { useState } from 'react';
import { 
  Youtube, Twitch, Instagram, Smartphone, Monitor, ChevronLeft, ChevronRight, Plus,
  Stethoscope, ClipboardList, X, Activity, HeartPulse, AlertTriangle, BrainCircuit,
  FileText, Download, User, Upload, CheckCircle2, Calendar, AlertCircle
} from 'lucide-react';

// --- Types ---
export type PlatformType = 'YouTube' | 'Instagram' | 'TikTok' | 'Twitch' | 'Chzzk';

export interface Creator {
  id: string;
  name: string;
  platform: PlatformType;
  status: '활동중' | '휴식중' | '계약만료' | '대기중' | '종료';
  subscribers: string;
  avatarUrl: string;
  coverUrl: string;
  tags: string[];
  category?: string;
  manager?: string;
  managementStartDate?: string; // 담당 시작일
  managementEndDate?: string;   // 담당 종료일
  channelName?: string;
  contactInfo?: string;
  contractStatus: 'Signed' | 'Drafting' | 'Expired' | 'None';
  // New fields for login credentials
  loginId?: string;
  password?: string;
}

export interface Task {
  id: string;
  title: string;
  status: '진행중' | '완료됨'; // Removed '대기중'
  assignee: string;
  creatorId?: string;
}

export interface CreatorEvent {
    id: string;
    creatorId: string;
    title: string;
    date: string; // YYYY-MM-DD
    type: 'live' | 'content' | 'meeting' | 'other' | 'joint';
    content?: string;
    partnerCreators?: string[]; // List of Creator IDs for joint broadcasts
}

export interface AdProposal {
  id: string;
  creatorId: string;
  brandName: string;
  campaignTitle: string;
  budget: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestDate: string;
  description: string;
  targetDate?: string; // Added target schedule date
}

export interface HealthRecord {
    id: string;
    name: string;
    lastCheck: string;
    score: number; // 0-100
    result: string;
    status: string;
}

export interface IssueLog {
    id: number;
    creator: string;
    date: string;
    category: string;
    description: string;
    status: string;
}

// --- Mock Data ---
export const INITIAL_CREATORS: Creator[] = [
  {
    id: '1',
    name: '슈카월드',
    platform: 'YouTube',
    status: '활동중',
    subscribers: '300.0만명',
    avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_k2A0y_2y0aFhVj7V9VjB0jVjVjVjVjVjVjVjVj=s176-c-k-c0x00ffffff-no-rj',
    coverUrl: 'https://picsum.photos/id/1/1200/300',
    tags: ['경제', '토크', '지식'],
    category: '경제/시사',
    manager: '이채연',
    managementStartDate: '2023-01-01',
    managementEndDate: '2025-12-31',
    channelName: '슈카월드',
    contactInfo: '010-1234-5678',
    contractStatus: 'Signed',
    loginId: 'syuka',
    password: 'password'
  },
  {
    id: '2',
    name: '침착맨',
    platform: 'Twitch',
    status: '활동중',
    subscribers: '250.0만명',
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    coverUrl: 'https://picsum.photos/id/64/1200/300',
    tags: ['토크', '게임'],
    category: '토크/게임',
    manager: '이채연',
    managementStartDate: '2023-03-15',
    managementEndDate: '2024-03-14',
    channelName: '침착맨',
    contactInfo: '010-9876-5432',
    contractStatus: 'Signed',
    loginId: 'chim',
    password: 'password'
  },
  {
    id: '3',
    name: '요리보고',
    platform: 'YouTube',
    status: '대기중',
    subscribers: '85.0만명',
    avatarUrl: 'https://picsum.photos/id/2/200/200',
    coverUrl: 'https://picsum.photos/id/2/1200/300',
    tags: ['요리', '레시피', '일상'],
    category: '요리',
    manager: '김유연',
    managementStartDate: '2024-01-01',
    managementEndDate: '2024-12-31',
    channelName: 'CookWithMe',
    contactInfo: 'cooking@email.com',
    contractStatus: 'Drafting'
  },
  {
    id: '4',
    name: '여행가제이',
    platform: 'Instagram',
    status: '활동중',
    subscribers: '45.0만명',
    avatarUrl: 'https://picsum.photos/id/3/200/200',
    coverUrl: 'https://picsum.photos/id/3/1200/300',
    tags: ['여행', '브이로그'],
    category: '여행',
    manager: '김유연',
    managementStartDate: '2023-06-01',
    managementEndDate: '2025-05-31',
    channelName: 'JayTrip',
    contactInfo: '010-5555-4444',
    contractStatus: 'Signed'
  },
  {
    id: '5',
    name: '겜돌이',
    platform: 'Twitch',
    status: '활동중',
    subscribers: '12.0만명',
    avatarUrl: 'https://picsum.photos/id/4/200/200',
    coverUrl: 'https://picsum.photos/id/4/1200/300',
    tags: ['게임'],
    category: '게임',
    manager: '이채연',
    managementStartDate: '2024-02-01',
    managementEndDate: '2025-02-01',
    channelName: 'GameZone',
    contactInfo: 'game@email.com',
    contractStatus: 'Signed',
    loginId: 'gamedol',
    password: '1234'
  },
  {
    id: '6',
    name: '치즈냥이',
    platform: 'Chzzk',
    status: '활동중',
    subscribers: '5.5만명',
    avatarUrl: 'https://picsum.photos/id/40/200/200',
    coverUrl: 'https://picsum.photos/id/40/1200/300',
    tags: ['게임', '소통'],
    category: '게임',
    manager: '김유연',
    managementStartDate: '2024-01-15',
    managementEndDate: '2024-07-15',
    channelName: 'CheeseCat',
    contactInfo: 'cat@email.com',
    contractStatus: 'None'
  },
  {
    id: '7',
    name: '철수',
    platform: 'YouTube',
    status: '활동중',
    subscribers: '50.0만명',
    avatarUrl: 'https://picsum.photos/id/100/200/200',
    coverUrl: 'https://picsum.photos/id/100/1200/300',
    tags: ['일상', '브이로그'],
    category: '일상',
    manager: '김유연',
    managementStartDate: '2024-01-01',
    managementEndDate: '2024-12-31',
    channelName: 'CheolsuVlog',
    contactInfo: 'cheolsu@email.com',
    contractStatus: 'Signed'
  }
];

export const INITIAL_TASKS: Record<string, Task[]> = {
  '1': [
    { id: 't1', title: '다음 주 콘텐츠 기획안 피드백', status: '진행중', assignee: '이채연' },
    { id: 't2', title: '유튜브 채널 아트 리뉴얼 시안 확인', status: '진행중', assignee: '이채연' },
    { id: 't3', title: '6월 정산서 발송', status: '진행중', assignee: '이채연' },
    { id: 't4', title: '구독자 이벤트 당첨자 취합', status: '완료됨', assignee: '박지성' },
    { id: 't5', title: '신규 굿즈 샘플 확인', status: '완료됨', assignee: '이채연' },
  ],
  '2': [
    { id: 't6', title: '밀키트 콜라보 미팅', status: '완료됨', assignee: '최현석' },
  ],
  '5': [
    { id: 't7', title: '신작 게임 프로모션 영상 촬영', status: '진행중', assignee: '이채연' },
    { id: 't8', title: '주간 라이브 하이라이트 편집본 검수', status: '진행중', assignee: '이채연' },
    { id: 't9', title: '팬미팅 장소 대관 확인', status: '완료됨', assignee: '김매니저' },
  ]
};

export const INITIAL_EVENTS: CreatorEvent[] = [
    { id: 'e1', creatorId: '1', title: '라이브 방송', date: '2026-01-10', type: 'live', content: '저녁 8시 정규 라이브 방송입니다. 주제: 경제 뉴스 정리' },
    { id: 'e2', creatorId: '1', title: '유튜브 업로드', date: '2026-01-12', type: 'content', content: '편집본 업로드 예정. 썸네일 컨펌 필요.' },
    { id: 'e3', creatorId: '3', title: '광고 미팅', date: '2026-01-15', type: 'meeting', content: '주방용품 브랜드 A사 미팅 (강남역 2시)' },
    { id: 'e4', creatorId: '4', title: '출국 (일본)', date: '2026-01-20', type: 'other', content: '3박 4일 도쿄 브이로그 촬영 일정' },
    { id: 'e5', creatorId: '6', title: '정기 방송', date: '2026-01-05', type: 'live', content: '치지직 이적 후 첫 정기 방송' },
    { id: 'e6', creatorId: '1', title: '브랜드 미팅', date: '2026-01-22', type: 'meeting', content: '금융 앱 B사 연간 계약 논의' },
];

export const INITIAL_AD_PROPOSALS: AdProposal[] = [
    {
        id: 'ad-dummy-1',
        creatorId: '7',
        brandName: '테크월드',
        campaignTitle: '게이밍 마우스 G-100 리뷰',
        budget: '300만원',
        status: 'pending',
        requestDate: '2024-01-25',
        description: '신제품 게이밍 마우스 상세 리뷰 및 게임 플레이 시연 영상 1편.',
        targetDate: '2024-02-05'
    },
    {
        id: 'ad-1',
        creatorId: '1',
        brandName: '삼성전자',
        campaignTitle: '갤럭시 S24 울트라 기능 리뷰 및 시연',
        budget: '2,500만원',
        status: 'pending',
        requestDate: '2024-01-20',
        description: '신제품 출시 기념 메인 기능(AI) 집중 리뷰 영상 제작 요청드립니다. 엠바고 준수 필수.',
        targetDate: '2024-02-10'
    },
    {
        id: 'ad-2',
        creatorId: '1',
        brandName: '미래에셋증권',
        campaignTitle: '2024년 하반기 경제 전망 세미나',
        budget: '1,000만원',
        status: 'accepted',
        requestDate: '2024-01-15',
        description: '오프라인 세미나 연사 초청 및 유튜브 라이브 송출 건입니다.'
    },
    {
        id: 'ad-3',
        creatorId: '2',
        brandName: '넥슨',
        campaignTitle: '신작 게임 찍먹 플레이',
        budget: '1,500만원',
        status: 'pending',
        requestDate: '2024-01-21',
        description: '캐주얼하게 게임을 즐기는 모습을 담은 라이브 방송 2시간 진행 요청.',
        targetDate: '2024-02-01'
    },
    {
        id: 'ad-4',
        creatorId: '4',
        brandName: '대한항공',
        campaignTitle: '취항지 홍보 브이로그 (유럽)',
        budget: '800만원 + 항공권',
        status: 'rejected',
        requestDate: '2024-01-10',
        description: '신규 취항지 홍보를 위한 여행 브이로그 2편 제작.'
    }
];

// --- Helper Functions ---
export const renderPlatformIcon = (platform: PlatformType, size: number = 16) => {
    switch (platform) {
        case 'YouTube': return <Youtube size={size} className="text-black" />;
        case 'Twitch': return <Twitch size={size} className="text-black" />;
        case 'Instagram': return <Instagram size={size} className="text-black" />;
        case 'TikTok': return <Smartphone size={size} className="text-black" />;
        case 'Chzzk': return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 11.5L15.5 2.5L13.5 10.5H21.5L11.5 21.5L13.5 11.5H5.5Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        );
        default: return <Monitor size={size} className="text-gray-500" />;
    }
};

export const PALETTE = [
    { bg: 'bg-gray-100', text: 'text-gray-900', border: 'border-gray-200', dot: 'bg-gray-600' },
    { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-[#00C471]' },
    { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', dot: 'bg-blue-600' },
    { bg: 'bg-gray-50', text: 'text-gray-900', border: 'border-gray-200', dot: 'bg-purple-600' },
];

export const getCreatorColorStyles = (id: string) => {
    const idx = parseInt(id) || 0;
    return PALETTE[idx % PALETTE.length];
};

// --- Shared Components ---
interface CalendarProps {
    events: CreatorEvent[];
    creatorsMap: Record<string, Creator>;
    currentDate: Date;
    onDateChange: (date: Date) => void;
    onAddEvent: (date?: string) => void;
    onEventClick: (event: CreatorEvent) => void; 
    readOnly?: boolean;
}

export const CreatorCalendar: React.FC<CalendarProps> = ({ events, creatorsMap, currentDate, onDateChange, onAddEvent, onEventClick, readOnly = false }) => {
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const changeMonth = (offset: number) => {
        onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };
    
    const goToToday = () => {
        onDateChange(new Date());
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="min-h-[120px] bg-white border-r border-b border-gray-200"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isToday = new Date().toISOString().split('T')[0] === dateStr;
        const dayEvents = events.filter(e => e.date === dateStr);

        days.push(
            <div key={d} className="min-h-[120px] bg-white border-r border-b border-gray-200 p-1 relative group hover:bg-gray-50 transition-colors">
                 {/* Date Header */}
                <div className="flex justify-between items-start mb-1 p-1">
                     <span 
                        className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-[4px]
                        ${isToday ? 'bg-[#00C471] text-white' : 'text-gray-500'}`}
                     >
                        {d}
                     </span>
                     {!readOnly && (
                         <button 
                             onClick={() => onAddEvent(dateStr)}
                             className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-black transition-opacity p-0.5"
                         >
                             <Plus size={14} />
                         </button>
                     )}
                </div>
                
                {/* Events */}
                <div className="space-y-1 px-1">
                    {dayEvents.map(evt => {
                        const creator = creatorsMap[evt.creatorId];
                        const styles = creator ? getCreatorColorStyles(creator.id) : PALETTE[0];
                        
                        return (
                            <div 
                                key={evt.id} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick(evt);
                                }}
                                className={`
                                    px-2 py-1 rounded-[3px] text-xs flex justify-between items-center group/item cursor-pointer shadow-sm
                                    transition-all hover:brightness-95 border
                                    ${styles.bg} ${styles.text} ${styles.border}
                                `}
                            >
                                <div className="truncate font-medium flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}></div>
                                    <span className="truncate">{creator?.name} - {evt.title}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <button onClick={() => changeMonth(-1)} className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"><ChevronLeft size={18} /></button>
                        <span className="text-lg font-bold text-gray-800 min-w-[120px] text-center">
                            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                        </span>
                        <button onClick={() => changeMonth(1)} className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"><ChevronRight size={18} /></button>
                    </div>
                    <button 
                        onClick={goToToday}
                        className="text-xs text-gray-500 hover:text-black hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                    >
                        오늘
                    </button>
                </div>
                
                {/* Creator Legend */}
                <div className="flex gap-3 text-xs overflow-x-auto max-w-[500px] py-1 scrollbar-hide">
                     {Object.values(creatorsMap).map((c: Creator) => {
                         const style = getCreatorColorStyles(c.id);
                         return (
                             <div key={c.id} className="flex items-center gap-1 text-gray-600 shrink-0">
                                 <div className={`w-2 h-2 rounded-full ${style.dot}`}></div>
                                 {c.name}
                             </div>
                         )
                     })}
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                    <div key={day} className={`py-2 text-center text-xs font-medium ${i === 0 ? 'text-[#00C471]' : 'text-gray-500'}`}>
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid Body */}
            <div className="grid grid-cols-7">
                {days}
            </div>
        </div>
    );
};

// PHQ-9 Survey Modal Component (Shows Completed only)
export const PhqSurveyModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: () => void }) => {
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
        "차라리 죽는 것이 더 낫겠다고 생각했다."
    ];
    const options = ["없음", "2-6일", "7-12일", "거의 매일"];
    const [answers, setAnswers] = useState<number[]>(new Array(9).fill(0));

    const handleSubmit = () => {
        setStep(2);
    };

    const handleFinalize = () => {
        onSubmit();
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
                                <button onClick={handleSubmit} className="bg-black text-white px-8 py-2 rounded-lg text-sm">제출하기</button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">✅</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">검사가 완료되었습니다</h2>
                            <p className="text-sm text-gray-500 mb-8">결과가 담당자에게 전달되었습니다.</p>
                            <button onClick={handleFinalize} className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg text-sm font-bold">확인</button>
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
    const [isPhqOpen, setIsPhqOpen] = useState(false);
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
        if (result.includes('미수검')) return 'bg-gray-50 text-gray-500 border-gray-200';
        return 'bg-blue-50 text-blue-700 border-blue-200';
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

    const handlePhqSubmit = () => {
        // Creator self-survey submission mock
        const newLog: IssueLog = {
            id: Date.now(),
            creator: creators[0].name,
            date: new Date().toISOString().split('T')[0],
            category: '자가진단 완료',
            description: 'PHQ-9 자가 검진을 완료했습니다. (결과 비공개)',
            status: '확인필요'
        };
        onUpdateLogs([newLog, ...logs]);
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
                            <div key={log.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-sm text-gray-900">{log.creator}</span>
                                    <span className="text-xs text-gray-400">{log.date}</span>
                                </div>
                                <div className="mb-2">
                                    <span className={`text-xs px-1.5 py-0.5 rounded border mr-2 ${
                                        log.category.includes('정상') ? 'bg-green-50 text-green-700 border-green-100' :
                                        log.category.includes('경미') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                        log.category.includes('중등') ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                        'bg-red-50 text-red-700 border-red-100'
                                    }`}>{log.category}</span>
                                    <span className="text-sm text-gray-700 line-clamp-2">{log.description}</span>
                                </div>
                                <div className="flex justify-end">
                                    <span className={`text-xs font-bold ${
                                        log.status === '진료중' || log.status === '상담중' ? 'text-yellow-600' :
                                        log.status === '휴식권고' || log.status === '치료필요' ? 'text-red-500' : 'text-gray-500'
                                    }`}>
                                        {log.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        
                        {/* Logic: 
                            - Admin/Employee (!isCreator) cannot see 'Add Record' button here per requirements.
                            - Creator (isCreator) sees 'Start Survey' button.
                        */}
                        {!readOnly && isCreator && (
                            <button 
                                onClick={() => setIsPhqOpen(true)}
                                className="w-full py-2.5 bg-[#00C471] hover:bg-[#00b065] text-white rounded-lg text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                <ClipboardList size={16} /> 우울증 자가진단 (PHQ-9)
                            </button>
                        )}
                        
                        {filteredLogs.length === 0 && !isCreator && (
                            <div className="py-8 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                기록된 검사 내역이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* PHQ Modal for Creators */}
            {isPhqOpen && <PhqSurveyModal onClose={() => setIsPhqOpen(false)} onSubmit={handlePhqSubmit} />}

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
