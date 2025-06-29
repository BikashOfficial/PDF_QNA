import React from 'react';
import { Upload, MessageCircle, Brain } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "1. Upload PDF",
    description: "Choose any PDF document you want to analyze and get insights from",
    color: "blue"
  },
  {
    icon: MessageCircle,
    title: "2. Ask Questions",
    description: "Type any question about the PDF content in natural language",
    color: "purple"
  },
  {
    icon: Brain,
    title: "3. Get AI Answers",
    description: "Receive intelligent, context-aware responses powered by Gemini AI",
    color: "green"
  }
];

const GettingStarted = () => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-200 p-4 sm:p-6 lg:p-8">
    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">How It Works</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {steps.map((step, index) => (
        <div key={index} className="text-center group">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-${step.color}-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <step.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${step.color}-600`} />
          </div>
          <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg">{step.title}</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default GettingStarted;
