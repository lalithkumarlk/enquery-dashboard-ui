"use client"
import React, { useState } from 'react';

interface TagValue {
  tag: string;
  value: number;
}

const TagForm = () => {
  const [tagValues, setTagValues] = useState<TagValue[]>([
    { tag: 'Ø', value: 0 },
    { tag: 'A', value: 0 },
    { tag: 'QTY', value: 0 },
    { tag: 'FL', value: 0 },
    { tag: 'OAL', value: 0 },
    { tag: 'SH', value: 0 },
  ]);

  const handleValueChange = (index: number, newValue: number) => {
    const updatedTags = [...tagValues];
    updatedTags[index].value = newValue;
    setTagValues(updatedTags);
  };

  const handleSave = () => {
    // Implement your API call logic here
    console.log('Saving tag values:', tagValues);

     // Reset tag values after saving
  setTagValues([
    { tag: 'Ø', value: 0 },
    { tag: 'A', value: 0 },
    { tag: 'QTY', value: 0 },
    { tag: 'FL', value: 0 },
    { tag: 'OAL', value: 0 },
    { tag: 'SH', value: 0 },
  ]);

  };

  return (
    <div className=" w-[30%] bg-white border border-gray-200 rounded-lg p-4">
        <div>

        </div>
    
        <div>
            <div className="flex flex-col ">
    <div className="flex justify-between border-b border-gray-200 p-2">
      <div className="text-left">Tag</div>
      <div className="text-right">Value</div>
    </div>
      {tagValues.map((tagValue, index) => (
        <div key={index}  className="flex justify-between border-b border-gray-200 p-2">
             <div className="text-left">{tagValue.tag}</div>
             <div className="text-right">{tagValue.value}</div>
             <button onClick={() => {console.log('edit clicked',tagValue)}}>edit</button>
        </div>
          ))}
            </div>
            <button onClick={handleSave} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Save Tag Values
        </button>
  </div>
</div>

  );
};

export default TagForm;