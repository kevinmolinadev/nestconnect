import React from 'react';

const ToggleSwitch = ({ isChecked, onChange }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={isChecked} onChange={onChange} />
            <div className={`w-11 h-6 ${isChecked ? 'bg-neutro-tertiary' : 'bg-gray-200'} rounded-full peer-focus:ring-4 peer-focus:ring-neutro-tertiary-dark`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 ${isChecked ? 'left-[1.32rem]' : 'left-0.5'} transition-transform duration-400`}></div>
            </div>
        </label>
    );
};

export default ToggleSwitch;
