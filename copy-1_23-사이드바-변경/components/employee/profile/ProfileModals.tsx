
import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle2, FileText } from 'lucide-react';
import { UserProfile, HealthRecord } from '../../../types';

// --- Image Modal ---
interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'avatar' | 'cover';
    profile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

const MOCK_COVER_IMAGES = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
];

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, type, profile, onUpdateProfile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateProfile({ ...profile, avatarUrl: reader.result as string });
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverSelect = (url: string) => {
        onUpdateProfile({ ...profile, coverUrl: url });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">
                        {type === 'cover' ? '커버 이미지 변경' : '프로필 사진 변경'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 rounded p-1 hover:bg-gray-100">
                        <X size={20}/>
                    </button>
                </div>
                <div className="p-6">
                    {type === 'cover' ? (
                        <div className="grid grid-cols-2 gap-3">
                            {MOCK_COVER_IMAGES.map((url, i) => (
                                <div 
                                    key={i}
                                    onClick={() => handleCoverSelect(url)}
                                    className="aspect-video rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all hover:opacity-90"
                                >
                                    <img src={url} alt={`Cover ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6">
                            <div className="w-32 h-32 rounded-full border-4 border-gray-100 overflow-hidden mb-6 bg-gray-50">
                                <img src={profile.avatarUrl} alt="Current" className="w-full h-full object-cover" />
                            </div>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                <Upload size={16} /> 사진 업로드
                            </button>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleAvatarUpload}
                            />
                            <p className="text-xs text-gray-400 mt-3">JPG, PNG 파일 (최대 5MB)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Password Modal ---
interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose }) => {
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = () => {
        if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        if (passwordForm.new !== passwordForm.confirm) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        alert('비밀번호가 성공적으로 변경되었습니다.');
        onClose();
        setPasswordForm({ current: '', new: '', confirm: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">비밀번호 변경</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 rounded p-1 hover:bg-gray-100">
                        <X size={20}/>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">현재 비밀번호</label>
                        <input 
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                            placeholder="현재 비밀번호 입력"
                            value={passwordForm.current}
                            onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">새 비밀번호</label>
                        <input 
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                            placeholder="새 비밀번호 입력"
                            value={passwordForm.new}
                            onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">새 비밀번호 확인</label>
                        <input 
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                            placeholder="새 비밀번호 재입력"
                            value={passwordForm.confirm}
                            onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                        />
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium">취소</button>
                    <button onClick={handlePasswordChange} className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm">
                        변경하기
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Health Upload Modal ---
interface HealthUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile;
    onAddHealthRecord?: (record: HealthRecord) => void;
}

export const HealthUploadModal: React.FC<HealthUploadModalProps> = ({ isOpen, onClose, profile, onAddHealthRecord }) => {
    const [checkupDate, setCheckupDate] = useState(new Date().toISOString().split('T')[0]);
    const [healthStatus, setHealthStatus] = useState('정상 (양호)');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleHealthUpload = () => {
        if (!uploadedFile) {
            alert('검진 결과 PDF 파일을 업로드해주세요.');
            return;
        }
        if (!checkupDate) {
            alert('검진일을 선택해주세요.');
            return;
        }

        if (onAddHealthRecord) {
            const nextYear = new Date(checkupDate);
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            const nextCheckStr = nextYear.toISOString().split('T')[0];

            const newHealthRecord: HealthRecord = {
                id: Date.now(),
                name: profile.name,
                lastCheck: checkupDate,
                hospital: '병원 (파일참조)',
                result: healthStatus,
                nextCheck: nextCheckStr,
                bp: '-', sugar: '-', chol: '-', bmi: '-' 
            };
            onAddHealthRecord(newHealthRecord);
        }

        alert('검진 결과가 성공적으로 업로드되었으며, 인사팀 리스트에 반영되었습니다.');
        onClose();
        setUploadedFile(null);
        setHealthStatus('정상 (양호)');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">검진 결과 등록</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 rounded p-1">
                        <X size={20}/>
                    </button>
                </div>
                <div className="p-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <FileText size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-blue-800 text-sm">결과지 업로드 안내</h4>
                            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                                병원에서 발급받은 건강검진 결과표(PDF)를 업로드하여 DB에 저장합니다.<br/>
                                인사/운영팀 건강 관리 리스트에 자동 업데이트 됩니다.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">최근 검진일</label>
                            <input 
                                type="date"
                                value={checkupDate}
                                onChange={(e) => setCheckupDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">종합 판정 상태 선택</label>
                            <select 
                                value={healthStatus}
                                onChange={(e) => setHealthStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                            >
                                <option value="정상 (양호)">정상 (A/B) - 양호</option>
                                <option value="정상 (경미)">정상 (B) - 경미한 소견</option>
                                <option value="유소견 (주의)">주의 (식생활 습관 개선 필요)</option>
                                <option value="유소견 (위험)">위험 (질환 의심/치료 필요)</option>
                                <option value="재검">재검 필요</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">결과 파일 업로드</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                                <input 
                                    id="file-upload" 
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
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium">취소</button>
                    <button onClick={handleHealthUpload} className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm flex items-center gap-1">
                        <CheckCircle2 size={14} /> 저장하기
                    </button>
                </div>
            </div>
        </div>
    );
};
