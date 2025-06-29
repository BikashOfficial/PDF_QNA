import React from 'react';
import { Brain, MessageCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatSection = ({ chatHistory, loading, chatEndRef }) => (
  <div className="space-y-5 sm:space-y-6 pb-32">
    {chatHistory.length === 0 && (
      <div className="text-center py-16">
        <div className="p-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl inline-block mb-6 shadow-lg">
          <Brain className="w-10 h-10 text-purple-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 tracking-tight">Ready to help!</h3>
        <p className="text-gray-600 text-lg font-medium">Ask me anything about your PDF document</p>
      </div>
    )}
    {chatHistory.map((item, index) => (
      <div key={index} className={`flex gap-3 sm:gap-4 ${item.type === 'question' ? 'justify-end' : 'justify-start'}`}>
        {item.type === 'answer' && (
          <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-blue-100">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        )}
        <div className={`max-w-[82%] sm:max-w-[78%] px-4 py-3 sm:px-5 sm:py-4 rounded-3xl shadow-lg break-words backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
          item.type === 'question'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-200'
            : item.type === 'error'
              ? 'bg-red-50/80 text-red-700 border border-red-200/50 shadow-red-100'
              : 'bg-white/90 border border-gray-200/50 text-gray-800 shadow-gray-100'
        }`}>
          {item.type === 'answer' ? (
            <div className="text-sm sm:text-base overflow-wrap-anywhere font-medium tracking-wide prose prose-blue max-w-none">
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm sm:text-base overflow-wrap-anywhere font-medium tracking-wide">
              {item.content}
            </p>
          )}
          <div className={`text-xs mt-2.5 opacity-60 font-medium tracking-wide ${
            item.type === 'question' ? 'text-white' : 'text-gray-500'
          }`}>
            {item.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        {item.type === 'question' && (
          <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-green-100">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        )}
      </div>
    ))}
    {loading && (
      <div className="flex gap-3 sm:gap-4 justify-start">
        <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-blue-100">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="bg-white/90 border border-gray-200/50 rounded-3xl px-4 py-3 sm:px-5 sm:py-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-gray-700 text-sm sm:text-base font-medium tracking-wide">Thinking...</span>
          </div>
        </div>
      </div>
    )}
    <div ref={chatEndRef} />
  </div>
);

export default ChatSection;
