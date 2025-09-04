'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    
    // Create object URL for immediate preview
    const objectUrl = URL.createObjectURL(file);
    
    // In a real app, you'd upload to a service like Supabase Storage
    // For now, we'll use the object URL
    setTimeout(() => {
      onImageUpload(objectUrl);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragging 
            ? 'border-accent bg-accent/10' 
            : 'border-white/20 hover:border-accent/50'
          }
          ${isUploading ? 'opacity-50' : 'opacity-100'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            ) : (
              <Upload className="w-8 h-8 text-accent" />
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {isUploading ? 'Uploading...' : 'Upload Product Image'}
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Drag and drop your product image here, or click to browse
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-6 py-2 bg-surface text-accent font-medium rounded-lg border border-accent hover:bg-accent hover:text-white transition-colors duration-200 disabled:opacity-50"
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Browse Files
            </button>
          </div>
          
          <p className="text-xs text-text-secondary">
            Supported formats: JPG, PNG, WebP (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}
