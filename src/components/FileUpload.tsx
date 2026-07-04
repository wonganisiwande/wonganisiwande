import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
}

export default function FileUpload({ onFileSelect, accept = ".svg" }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (accept && !selectedFile.name.toLowerCase().endsWith(accept.toLowerCase())) {
      alert(`Please upload a ${accept} file.`);
      return;
    }
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-[9px] uppercase tracking-[0.2em] opacity-40 ml-1">Project brief ({accept.replace('.', '').toUpperCase()}, optional)</label>
      
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-all duration-500 cursor-pointer
          flex flex-col items-center justify-center text-center space-y-4
          ${isDragging ? 'border-brand-ink bg-brand-ink/5' : 'border-brand-ink/10 hover:border-brand-ink/30'}
          ${file ? 'border-brand-ink/30' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept={accept}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="p-3 rounded-full bg-brand-ink/5">
                <Upload size={20} className="opacity-40" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium">Click or drag a file to attach</p>
                <p className="text-[10px] opacity-40">Max file size: 2MB</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center space-y-3 w-full"
            >
              <div className="p-3 rounded-full bg-brand-ink/5 text-green-600">
                <CheckCircle2 size={20} />
              </div>
              <div className="flex items-center gap-3 bg-brand-ink/5 px-4 py-2 rounded-full max-w-full">
                <FileText size={14} className="opacity-40" />
                <span className="text-[10px] truncate max-w-[150px] font-medium">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-1 hover:bg-brand-ink/10 rounded-full transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
