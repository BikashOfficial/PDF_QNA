import React from 'react';
import { Loader2, Send } from 'lucide-react';

const FixedInput = ({ question, setQuestion, handleKeyPress, handleAsk, loading, textareaRef }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/30 shadow-2xl">
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-end gap-3 sm:gap-4">
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100/50">
          <input
            type="text"
            ref={textareaRef}
            placeholder="Ask anything about your PDF..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full text-gray-00 placeholder-gray-500 px-5 py-4 sm:px-6 sm:py-5 border-0 rounded-3xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none resize-none transition-all duration-300 text-base sm:text-lg font-medium tracking-wide min-h-[56px] max-h-[140px] leading-relaxed"
            rows="1"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
              lineHeight: '1.4'
            }}
          />
        </div>
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-50 rounded-2xl flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:hover:scale-100 ring-4 ring-blue-100/50 hover:ring-blue-200/50"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 sm:w-7 sm:h-7 animate-spin text-white" />
          ) : (
            <Send className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          )}
        </button>
      </div>
      {/* iOS-style indicator */}
      <div className="flex justify-center mt-3">
        <div className="w-8 h-1 bg-gray-300/60 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default FixedInput;
