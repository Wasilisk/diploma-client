import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface ImageInputProps {
  defaultValue?: string;
  onChange: (value: File) => void;
  onProfileImageDelete?: () => void;
}

export const ImageInput = ({ defaultValue = '', onChange, onProfileImageDelete }: ImageInputProps) => {
  const [previewImage, setPreviewImage] = useState<string>(defaultValue);
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    onChange(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  if (previewImage) {
    return (
      <div className='relative aspect-square w-full md:w-96'>
        <img
          className='h-full w-full rounded-2xl object-cover'
          src={previewImage}
          alt='Profile avatar'
        />
        <div
          className='absolute right-0 top-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-500'
          onClick={() => {
            if (defaultValue === previewImage && onProfileImageDelete) onProfileImageDelete();
            setPreviewImage('');
          }}
        >
          <CloseIcon fontSize='small' />
        </div>
      </div>
    );
  }

  return (
    <label
      htmlFor='dropzone-file'
      className='flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 object-cover md:w-96'
    >
      <div className='flex h-full flex-col items-center justify-center pb-6 pt-5 text-gray-500'>
        <CloudUploadOutlinedIcon fontSize='large' color='inherit' />
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          <span className='font-semibold'>Click to upload</span> or drag and drop
        </p>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          SVG, PNG, JPG or GIF (MAX. 800x800px)
        </p>
      </div>
      <input id='dropzone-file' className='hidden' type='file' onChange={selectImage} />
    </label>
  );
};
