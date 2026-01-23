
import React, { useState } from 'react';
import { Users, Briefcase, Monitor, Link as LinkIcon, Building, UserCircle, Mail, Calendar, Pencil, Lock } from 'lucide-react';
import { UserProfile } from '../../../types';

interface BasicInfoProps {
    profile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
    readOnly?: boolean;
    isCreator?: boolean;
    onPasswordChangeClick: () => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ 
    profile, 
    onUpdateProfile, 
    readOnly, 
    isCreator, 
    onPasswordChangeClick 
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (field: string, value: string) => {
        onUpdateProfile({
            ...profile,
            [field]: value
        });
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-gray-400">기본 정보</h3>
                </div>
                <div className="space-y-5">
                    {isCreator ? (
                        <>
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 mt-0.5"><Users size={16} /></div>
                                <div className="w-20 text-sm text-gray-500 font-medium">구독자</div>
                                <div className="flex-1 text-sm text-gray-800 font-bold">
                                    {profile.subscribers || '-'}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 mt-0.5"><Briefcase size={16} /></div>
                                <div className="w-20 text-sm text-gray-500 font-medium">카테고리</div>
                                <div className="flex-1 text-sm text-gray-800">
                                    {profile.category || '-'}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 mt-0.5"><Monitor size={16} /></div>
                                <div className="w-20 text-sm text-gray-500 font-medium">크리에이터 플랫폼</div>
                                <div className="flex-1 text-sm text-gray-800">
                                    {profile.platform || '-'}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 mt-0.5"><LinkIcon size={16} /></div>
                                <div className="w-20 text-sm text-gray-500 font-medium">매니저 이름</div>
                                <div className="flex-1 text-sm text-gray-800 font-medium text-blue-600">
                                    {profile.manager || '미배정'}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 mt-0.5"><Building size={16} /></div>
                                <div className="w-16 text-sm text-gray-500 font-medium">조직</div>
                                <div className="flex-1 text-sm text-gray-800">
                                    <span className="text-gray-400 mr-2">소속</span> {profile.org}
                                    {profile.rank.includes('팀장') && <span className="bg-gray-100 text-[10px] px-1 rounded ml-2">조직장</span>}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 mt-0.5"><Briefcase size={16} /></div> 
                                <div className="w-16 text-sm text-gray-500 font-medium">직무</div>
                                <div className="flex-1 text-sm text-gray-800">
                                    <span className="text-gray-400 mr-2">수행 직무</span> {profile.job}
                                </div>
                            </div>
                        </>
                    )}
                    
                    <div className="flex items-start">
                        <div className="w-6 text-gray-400 mr-4 mt-0.5"><UserCircle size={16} /></div> 
                        <div className="w-16 text-sm text-gray-500 font-medium">연락처</div>
                        <div className="flex-1 text-sm text-gray-800 space-y-2">
                            <div className="flex">
                                <span className="text-gray-400 inline-block w-20 shrink-0">이메일</span> 
                                <span>{profile.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!isCreator && (
                <div>
                    <div className="flex justify-between items-start mb-4 border-t border-gray-100 pt-8">
                        <h3 className="text-xs font-bold text-gray-400 mt-1">개인정보</h3>
                        {!readOnly && (
                            <div className="flex flex-col items-end gap-2">
                                <button 
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center gap-1 text-xs hover:text-gray-600 transition-colors ${isEditing ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
                                >
                                    <Pencil size={12} /> {isEditing ? '저장' : '정보 수정'}
                                </button>
                                <button 
                                    onClick={onPasswordChangeClick}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Lock size={12} /> 비밀번호 변경
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-5">
                        {!readOnly && (
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4"><UserCircle size={18} /></div>
                                <div className="w-16 text-sm text-gray-500 font-medium pt-1">이름</div>
                                <div className="flex-1 text-sm text-gray-800">
                                    {isEditing ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-blue-100 shadow-sm animate-[fadeIn_0.2s_ease-out]">
                                            <div>
                                                <label className="block text-[10px] text-gray-500 mb-1.5 font-medium">본명</label>
                                                <input 
                                                    value={profile.name} 
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5 font-medium">영문 이름</label>
                                                <input 
                                                    value={profile.engName} 
                                                    onChange={(e) => handleChange('engName', e.target.value)}
                                                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-1 animate-[fadeIn_0.2s_ease-out]">
                                            <span className="text-gray-400 mr-2">본명</span> {profile.name}
                                            <span className="mx-3 text-gray-400 mr-2">영문 이름</span> {profile.engName}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="flex items-start">
                            <div className="w-6 text-gray-400 mr-4 pt-1"><Mail size={16} /></div>
                            <div className="w-16 text-sm text-gray-500 font-medium pt-1">연락처</div>
                            <div className="flex-1 text-sm text-gray-800">
                                {isEditing && !readOnly ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-blue-100 shadow-sm animate-[fadeIn_0.2s_ease-out]">
                                        <div>
                                            <label className="block text-[10px] text-gray-500 mb-1.5 font-medium">개인 이메일</label>
                                            <input 
                                                value={profile.personalEmail} 
                                                onChange={(e) => handleChange('personalEmail', e.target.value)}
                                                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1.5 font-medium">휴대전화</label>
                                            <input 
                                                value={profile.phone} 
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-1 animate-[fadeIn_0.2s_ease-out] space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 w-20 shrink-0">개인 이메일</span> {profile.personalEmail}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 w-20 shrink-0">휴대전화</span> {profile.phone}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {!readOnly && (
                            <div className="flex items-start">
                                <div className="w-6 text-gray-400 mr-4 pt-1"><Calendar size={16} /></div>
                                <div className="w-16 text-sm text-gray-500 font-medium pt-1">입사 정보</div>
                                <div className="flex-1 text-sm text-gray-800">
                                    <div className="flex flex-wrap gap-y-2 py-1 animate-[fadeIn_0.2s_ease-out]">
                                        <span className="text-gray-400 mr-2">입사일</span> {profile.joinDate}
                                        <span className="ml-4 text-gray-400 mr-2">입사 유형</span> 경력
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
