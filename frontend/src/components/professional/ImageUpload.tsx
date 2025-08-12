import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  images: Array<{ url: string; originalName?: string }>;
  onImagesChange: (images: Array<{ url: string; originalName?: string }>) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 5 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Vérifier le nombre maximum d'images
    if (images.length + files.length > maxImages) {
      setError(`Vous ne pouvez pas uploader plus de ${maxImages} images`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload/professional/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const newImages = [...images, ...data.images];
        onImagesChange(newImages);
      } else {
        setError(data.message || 'Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      setError('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (imageUrl: string) => {
    try {
      const filename = imageUrl.split('/').pop();
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload/professional/images/${filename}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const updatedImages = images.filter(img => img.url !== imageUrl);
        onImagesChange(updatedImages);
      } else {
        setError(data.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
      setError('Erreur lors de la suppression de l\'image');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Photos de votre établissement</h3>
        <span className="text-sm text-gray-500">
          {images.length} / {maxImages} images
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Zone d'upload */}
      <div 
        onClick={triggerFileInput}
        className={`
          border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer
          hover:border-blue-400 hover:bg-blue-50 transition-colors
          ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
          ${uploading ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />
        
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">Upload en cours...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                {images.length >= maxImages 
                  ? 'Nombre maximum d\'images atteint'
                  : 'Cliquez pour ajouter des images ou glissez-déposez'
                }
              </p>
              <p className="text-xs text-gray-500">
                Formats supportés: JPG, PNG, GIF (max 5MB par image)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Galerie d'images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${image.url}`}
                  alt={image.originalName || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {/* Bouton de suppression */}
              <button
                onClick={() => handleRemoveImage(image.url)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Aucune image ajoutée pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
