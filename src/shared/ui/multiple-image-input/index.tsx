import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-multi-carousel';
import { isEmpty } from 'shared/utils/libs';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CreateTourFormValues } from 'shared/utils/types';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export const MultipleImageInput = () => {
  const { control } = useFormContext<CreateTourFormValues>();
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const {
    fields: filesFields,
    append: appendFileField,
    remove: removeFileFiled,
  } = useFieldArray({
    control,
    name: 'files',
  });
  const { fields: galleryFields, remove: removeGalleryField } = useFieldArray({
    control,
    name: 'gallery',
  });

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    Object.values(selectedFiles).forEach((file) => {
      appendFileField({ file: file });
    });
  };

  useEffect(() => {
    setImagesPreviews(filesFields.map((obj) => URL.createObjectURL(obj.file)));

    return () => {
      imagesPreviews.map((imagePreview) => URL.revokeObjectURL(imagePreview));
    };
  }, [filesFields]);

  return (
    <>
      {(!isEmpty(imagesPreviews) || !isEmpty(galleryFields)) && (
        <Carousel
          responsive={responsive}
          infinite={false}
          swipeable={false}
          draggable={false}
          autoPlay={false}
          itemClass='px-2 mb-2'
        >
          {galleryFields.map((image, index) => (
              <div className='relative aspect-square w-full' key={index}>
                <img
                    className='h-full w-full rounded-2xl object-cover'
                    src={image.url}
                    alt='Tour image'
                />
                <div
                    className='absolute right-0 top-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-500'
                    onClick={() => removeGalleryField(index)}
                >
                  <CloseIcon fontSize='small' />
                </div>
              </div>
          ))}
          {imagesPreviews.map((image, index) => (
            <div className='relative aspect-square w-full' key={index}>
              <img
                className='h-full w-full rounded-2xl object-cover'
                src={image}
                alt='Tour image'
              />
              <div
                className='absolute right-0 top-0 m-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-500'
                onClick={() => removeFileFiled(index)}
              >
                <CloseIcon fontSize='small' />
              </div>
            </div>
          ))}
        </Carousel>
      )}
      <label
        htmlFor='dropzone-file'
        className='flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 object-cover'
      >
        <div className='flex h-full flex-col items-center justify-center pb-6 pt-5 text-gray-500'>
          <CloudUploadOutlinedIcon fontSize='large' color='inherit' />
          <p className='text-center text-sm text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Click to upload</span>
          </p>
          <p className='text-center text-xs text-gray-500 dark:text-gray-400'>
            SVG, PNG, JPG (MAX. 800x800px)
          </p>
        </div>
        <input id='dropzone-file' className='hidden' type='file' multiple onChange={selectImage} />
      </label>
    </>
  );
};
