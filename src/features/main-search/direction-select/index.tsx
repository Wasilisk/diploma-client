import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

const people = ['Івано-Франківськ', 'Ворохта', 'Львів', 'Буковель', 'Луцьк'];

export const DirectionSelect = () => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className='relative flex w-full gap-x-4'>
      <div className='aspect-square rounded-full border border-zinc-300 bg-white p-2'>
        <FmdGoodOutlinedIcon />
      </div>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input
          placeholder='Виберіть напрямок'
          className='w-full text-base font-medium text-neutral-500 outline-none'
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Options className='no-scrollbar origin-to-left absolute left-0 top-full mt-1 inline-flex max-h-60 w-full flex-col items-start justify-start divide-y divide-gray-200 overflow-auto rounded-md bg-white px-5 py-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none'>
          {filteredPeople.length === 0 && query !== '' ? (
            <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
              Nothing found.
            </div>
          ) : (
            filteredPeople.map((person) => (
              <Combobox.Option
                key={person}
                value={person}
                className='w-full cursor-pointer py-2 font-medium'
              >
                {person}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
