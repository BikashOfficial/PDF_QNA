import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

const Header = ({ pdfUploaded, pdf, chatHistory, clearChat, onReset }) => (
  <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {pdfUploaded && (
            <button
              onClick={onReset}
              className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-colors duration-200 mr-2"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
          )}
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
              PDF Assist
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Powered by Gemini AI</p>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* PDF Status & Clear Chat */}
          {pdfUploaded && pdf && (
            <div className="flex items-center gap-2 sm:gap-4">
              {chatHistory.length > 0 && (
                <button
                  onClick={clearChat}
                  className="hidden sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition-colors text-xs sm:text-sm font-medium"
                >
                  <span className="hidden md:inline">Clear Chat</span>
                  <span className="md:hidden">Clear</span>
                </button>
              )}
              <div className="flex items-center gap-1 sm:gap-2 bg-blue-50 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border border-blue-200 max-w-32 sm:max-w-48 lg:max-w-xs">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-blue-800 truncate">
                  {pdf.name}
                </span>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default Header;
