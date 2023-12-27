export const UserListItemSkeleton = () => (
    <div className='grid animate-pulse grid-cols-12 gap-x-4 gap-y-2 py-4 sm:flex-row sm:items-center'>
        <div className='col-span-2 flex items-center'>
            <div className='h-20 w-20 rounded-2xl bg-gray-300'></div>
        </div>
        <div className='col-span-2'>
            <div className='mb-1 h-4 w-20 bg-gray-300'></div>
            <div className='h-6 w-28 bg-gray-300'></div>
        </div>
        <div className='col-span-2'>
            <div className='mb-1 h-4 w-20 bg-gray-300'></div>
            <div className='h-6 w-28 bg-gray-300'></div>
        </div>
        <div className='col-span-3'>
            <div className='mb-1 h-4 w-20 bg-gray-300'></div>
            <div className='h-6 w-36 bg-gray-300'></div>
        </div>
        <div className='col-span-1'>
            <div className='mb-1 h-4 w-20 bg-gray-300'></div>
            <div className='h-6 w-16 bg-gray-300'></div>
        </div>
        <div className='col-span-2 flex justify-end gap-x-2'>
            <div className='h-12 w-12 rounded-full bg-gray-300'></div>
            <div className='h-12 w-12 rounded-full bg-gray-300'></div>
        </div>
    </div>
);