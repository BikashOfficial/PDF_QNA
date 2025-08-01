import React, { useState, useEffect, useRef } from 'react';
import SuccessPopup from './components/SuccessPopup';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ChatSection from './components/ChatSection';
import GettingStarted from './components/GettingStarted';
import FixedInput from './components/FixedInput';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [pdf, setPdf] = useState(null);
  const [question, setQuestion] = useState('');
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Auto-hide success popup after 3 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [question]);

  const clearChat = () => {
    setChatHistory([]);
  };

  const handleReset = () => {
    setPdf(null);
    setQuestion('');
    setPdfUploaded(false);
    setLoading(false);
    setUploadProgress(0);
    setChatHistory([]);
  };

  const handleUpload = async () => {
    if (!pdf) {
      alert('Please select a PDF to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdf);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      setUploadProgress(100);
      setPdfUploaded(true);
      setShowSuccessPopup(true);
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (err) {
      alert('Error uploading PDF.');
      console.error(err);
      setUploadProgress(0);
      clearInterval(progressInterval);
    }
  };

  const handleAsk = async () => {
    if (!pdfUploaded) {
      alert('Upload PDF first!');
      return;
    }
    if (!question.trim()) {
      alert('Type a question!');
      return;
    }

    setLoading(true);
    const currentQuestion = question;
    setQuestion('');

    // Add question to chat history immediately
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion, timestamp: new Date() }]);

    try {
      // Replace with your axios call
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentQuestion })
      });

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      const newAnswer = data.answer;

      // Add answer to chat history
      setChatHistory(prev => [...prev, { type: 'answer', content: newAnswer, timestamp: new Date() }]);
    } catch (err) {
      alert('Error getting answer.');
      console.error(err);
      setChatHistory(prev => [...prev, { type: 'error', content: 'Failed to get answer. Please try again.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col overflow-x-hidden">
      <SuccessPopup show={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
      <Header pdfUploaded={pdfUploaded} pdf={pdf} chatHistory={chatHistory} clearChat={clearChat} onReset={handleReset} />
      <div className="flex-1 flex relative">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
              {!pdfUploaded && (
                <UploadSection pdf={pdf} setPdf={setPdf} handleUpload={handleUpload} uploadProgress={uploadProgress} />
              )}
              {pdfUploaded && (
                <ChatSection chatHistory={chatHistory} loading={loading} chatEndRef={chatEndRef} />
              )}
              {!pdfUploaded && <GettingStarted />}
            </div>
          </div>
          {pdfUploaded && (
            <FixedInput
              question={question}
              setQuestion={setQuestion}
              handleKeyPress={handleKeyPress}
              handleAsk={handleAsk}
              loading={loading}
              textareaRef={textareaRef}
            />
          )}
        </main>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
    
  );
}

export default App;