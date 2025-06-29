import React from 'react';
import { Upload, FileText } from 'lucide-react';

const UploadSection = ({ pdf, setPdf, handleUpload, uploadProgress }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 transform transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
    <div className="text-center">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border-4 border-white shadow-lg">
          <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600" />
        </div>
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
        Upload Your PDF Document
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed px-2">
        Choose a PDF document and start asking questions about its content with AI-powered insights
      </p>
      <div className="space-y-4 sm:space-y-6 max-w-md mx-auto">
        <div className="relative">
          <label className="relative cursor-pointer block">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="hidden"
            />
            <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <div className="text-center">
                  <p className="font-medium text-gray-700 group-hover:text-blue-700 text-sm sm:text-base break-words">
                    {pdf ? `Selected: ${pdf.name}` : 'Click to choose PDF file'}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Drag and drop or browse files
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>
        {pdf && (
          <button
            onClick={handleUpload}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            Upload PDF Document
          </button>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default UploadSection;
