
import React from 'react';

interface VacationStatusProps {
    onOpenVacationModal?: () => void;
    readOnly?: boolean;
}

export const VacationStatus: React.FC<VacationStatusProps> = ({ onOpenVacationModal, readOnly }) => {
    return (
        <div className="bg-[#F9F9F9] rounded-xl p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-gray-800">휴가 사용 현황</h3>
                {!readOnly && (
                    <button 
                        onClick={onOpenVacationModal}
                        className="bg-white border border-gray-200 text-xs px-2 py-1 rounded hover:bg-gray-50 shadow-sm"
                    >
                        휴가 신청
                    </button>
                )}
            </div>
            <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">12.5</span>
                <span className="text-sm text-gray-500 ml-1">일 남음</span>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>연차</span>
                        <span>2.5/15</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[16%]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>반차</span>
                        <span>2회</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[40%]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
