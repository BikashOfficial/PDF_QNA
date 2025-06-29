import React from 'react';
import { Check, X } from 'lucide-react';

const SuccessPopup = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-500/20 rounded-full backdrop-blur-sm">
          <Check className="w-5 h-5 text-green-300" />
        </div>
        <div>
          <h4 className="font-semibold text-black">PDF Ready!</h4>
          <p className="text-sm text-gray-700">You can now ask questions</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
