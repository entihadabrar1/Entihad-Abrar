import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';
import { ProcessState } from '../types';

const ImageEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessState>(ProcessState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
         alert('File size too large. Please upload an image under 10MB.');
         return;
      }

      setSelectedFile(file);
      setGeneratedImage(null);
      setStatus(ProcessState.IDLE);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile || !prompt.trim() || !previewUrl) return;

    setStatus(ProcessState.LOADING);
    setErrorMsg('');

    try {
      // Extract base64 data without prefix
      const base64Data = previewUrl.split(',')[1];
      const mimeType = selectedFile.type;

      const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);

      if (resultBase64) {
        setGeneratedImage(`data:image/png;base64,${resultBase64}`);
        setStatus(ProcessState.SUCCESS);
      } else {
        throw new Error("Failed to generate image.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus(ProcessState.ERROR);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrompt('');
    setGeneratedImage(null);
    setStatus(ProcessState.IDLE);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 12a10.1 10.1 0 0 0 9.9 9.9V12z"></path><path d="M22 12h-9.9V2.1A10.1 10.1 0 0 1 22 12z"></path></svg>
        </div>
        <div>
           <h2 className="text-2xl font-bold text-slate-800">AI Creative Suite</h2>
           <p className="text-slate-600 text-sm">Powered by Gemini 2.5 Flash Image. Upload an image and describe how to change it.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Input Column */}
        <div className="flex flex-col gap-6">
          {/* Upload Area */}
          <div className="relative">
             <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="image-upload"
            />
            {!previewUrl ? (
              <label 
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-xl bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <div className="p-4 bg-blue-100 rounded-full text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </div>
                <p className="text-slate-600 font-medium">Click to upload an image</p>
                <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 10MB</p>
              </label>
            ) : (
              <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden group">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                  title="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            )}
          </div>

          {/* Prompt Area */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-semibold text-slate-700 mb-2">
              Edit Instruction
            </label>
            <div className="relative">
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Make it look like a Van Gogh painting, or Add sunglasses"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
                disabled={status === ProcessState.LOADING}
              />
              <button
                onClick={handleGenerate}
                disabled={!selectedFile || !prompt.trim() || status === ProcessState.LOADING}
                className={`absolute right-1 top-1 bottom-1 px-4 rounded-md font-medium text-white transition-all 
                  ${(!selectedFile || !prompt.trim() || status === ProcessState.LOADING)
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md active:transform active:scale-95'
                  }`}
              >
                 {status === ProcessState.LOADING ? (
                   <span className="flex items-center gap-2">
                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Working...
                   </span>
                 ) : 'Generate'}
              </button>
            </div>
          </div>
          
          {status === ProcessState.ERROR && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Output Column */}
        <div className="flex flex-col h-full min-h-[300px]">
           <div className="flex-1 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-4 relative overflow-hidden">
             {generatedImage ? (
               <div className="relative w-full h-full flex flex-col items-center">
                  <img src={generatedImage} alt="AI Generated" className="w-full h-full object-contain rounded-lg shadow-sm" />
                  <a 
                    href={generatedImage} 
                    download="gemini-edit.png"
                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Result
                  </a>
               </div>
             ) : (
                <div className="text-center text-slate-400">
                  {status === ProcessState.LOADING ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
                      <p>Dreaming up pixels...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <p>Your AI masterpiece will appear here</p>
                    </div>
                  )}
                </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ImageEditor;