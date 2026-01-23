
import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { UserProfile } from '../../../types';

interface ProfileHeaderProps {
    profile: UserProfile;
    readOnly?: boolean;
    onBack?: () => void;
    onOpenImageModal: (type: 'avatar' | 'cover') => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
    profile, 
    readOnly, 
    onBack, 
    onOpenImageModal
}) => {
    return (
        <>
            {onBack && (
                <div className="absolute top-4 left-4 z-20">
                    <button 
                        onClick={onBack}
                        className="bg-white/90 backdrop-blur text-gray-600 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 flex items-center gap-1 text-xs font-medium transition-colors"
                    >
                        <ChevronLeft size={14} /> 돌아가기
                    </button>
                </div>
            )}
            
            {!readOnly && (
                <div className="absolute top-4 right-4 z-10">
                    <button 
                        onClick={() => onOpenImageModal('cover')}
                        className="text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 bg-white/80 backdrop-blur-sm flex items-center gap-1"
                    >
                        <Camera size={12} /> 커버 변경
                    </button>
                </div>
            )}
            
            <div 
                className="h-48 bg-gray-50 w-full relative group cursor-pointer"
                onClick={() => !readOnly && onOpenImageModal('cover')}
            >
                {profile.coverUrl ? (
                    <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200"></div>
                )}
                {!readOnly && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Camera size={24} />
                    </div>
                )}
            </div>

            <div className="px-12 mb-8 max-w-[1600px] mx-auto">
                <div className="-mt-16 mb-6 relative z-10 inline-block group">
                    <div 
                        className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm cursor-pointer relative"
                        onClick={() => !readOnly && onOpenImageModal('avatar')}
                    >
                        <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        {!readOnly && (
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Camera size={20} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};
