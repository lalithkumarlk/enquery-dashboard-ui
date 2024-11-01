"use client"
import { updateEnquire } from '@/lib/api';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

  interface Values {
      [key: string]: string;  // or whatever type the values are
    }

  interface EnquireProps {
    toolId: string,
    id: string,
    name: string,
    dimensions?: {
      "a": string,
      "oal": string, 
      "sh": string,
      "fl": string,
      "a0": string,
      "qty": string
  }
  }
const EditableImage = (props : { data : EnquireProps} ) => {

  const initialDimensions = {
    a0: '0',
    a: '0',
    oal: '0',
    qty: '0',
    fl: '0',
    sh: '0',
  }
  const [values, setValues] = useState<Values>(initialDimensions);
  const [focusedField, setFocusedField] = useState('');
  
  
  const handleChange = (field : any, e :any) => {
    setValues({...values, [field]: Number(e.target.value).toString() });
  };

  const handleFocus = (field :any) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSave = async () => {
      const { id, toolId, name } = props.data;
        
      if (!values || !props.data.id) {
        console.error('Missing required data for update');
        return;
      }
      
      const response = await updateEnquire({
                dimensions : values,
                id, toolId, name
        });

        if(response.ok){
            setValues({
                a0: '0',
                a: '0',
                oal: '0',
                qty: '0',
                fl: '0',
                sh: '0',
              })
              toast.success('Data Saved Sucessfully!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Convert and sum the values
  const sum = Object.values(values).reduce((total, value) => total + Number(value), 0);
  
    setIsButtonEnabled(sum > 0);
  }, [values]);

  useEffect(() => {
    const element = document.getElementById(focusedField || '');
    if (element) {
      element.focus();

      // Move the cursor to the end of the content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false); // Collapse to the end
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [focusedField]);

  useEffect(() => {
    // Update values from props when necessary; for example, a parent update
    if (props.data.dimensions) {
      setValues(props.data.dimensions);
    }
  }, [props.data.dimensions]);


  const getBorderStyle = (field :string) => {
    return focusedField === field
      ? { border: '2px solid red', outline: 'none', padding: '4px' }
      : { border: '2px solid black', padding: '4px' };
  };

  const contentEditableStyle = {
    fontSize: '10px',  // Small font size
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '40px',     // Fixed width
    height: '20px',    // Fixed height
    borderRadius: '0', // Rectangular borders
    boxSizing: 'border-box', // Include padding and border in the element's total size
    textAlign: 'center', // Center align text
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
 
<div className="p-4 m-16 flex gap-16 flex-row">

    {/* LEFT */}
    <div className="w-full">
    <div className="h-full bg-white p-4 rounded-md">
        <div style={{ position: 'relative', width: '600px', height: '400px' }}>
                <Image
                    src="/drill.png"
                    alt="Drill Diagram"
                    layout="fill"
                    objectFit="contain"
                />
                <div style={{ position: 'absolute', top: '100px', left: '100px' }}>
                    <ContentEditable
                    id={'a0'}
                    html={values.a0}
                    onChange={(e) => handleChange('a0', e)}
                    onFocus={() => handleFocus('a0')}
                    onBlur={handleBlur}
                    style={{ ...getBorderStyle('a0'), ...contentEditableStyle}}
                    />
                </div>
                {/* Repeat for other text positions */}
                <div style={{ position: 'absolute', top: '150px', left: '80px' }}>
                    <ContentEditable
                    id={'a'}
                    html={values.a}
                    onChange={(e) => handleChange('a', e)}
                    onFocus={() => handleFocus('a')}
                    onBlur={handleBlur}
                    style={{ ...getBorderStyle('a'), ...contentEditableStyle}}
                    />
                </div>
                <div style={{ position: 'absolute', top: '215px', left: '200px' }}>
                    <ContentEditable
                    id={'fl'}
                    html={values.fl}
                    onChange={(e) => handleChange('fl', e)}
                    onFocus={() => handleFocus('fl')}
                    onBlur={handleBlur}
                    style={{ ...getBorderStyle('fl'), ...contentEditableStyle}}
                    />
                </div>
                <div style={{ position: 'absolute', top: '250px', left: '275px' }}>
                    <ContentEditable
                    id={'oal'}
                    html={values.oal}
                    onChange={(e) => handleChange('oal', e)}
                    onFocus={() => handleFocus('oal')}
                    onBlur={handleBlur}
                    style={{ ...getBorderStyle('oal'), ...contentEditableStyle}}
                    />
                </div>
                <div style={{ position: 'absolute', top: '315px', left: '500px' }}>
                    <ContentEditable
                    id={'qty'}
                    html={values.qty}
                    onChange={(e) => handleChange('qty', e)}
                    onFocus={() => handleFocus('qty')}
                    onBlur={handleBlur}
                    style={{ ...getBorderStyle('qty'), ...contentEditableStyle}}
                    />
                </div>
                <div style={{ position: 'absolute', top: '155px', left: '460px' }}>
                    <ContentEditable
                    id={'sh'}
                    html={values.sh}
                    onChange={(e) => handleChange('sh', e)}
                    onFocus={() => handleFocus('sh')}
                    onBlur={handleBlur}
                    style={{ ...getBorderStyle('sh'), ...contentEditableStyle}}
                    />
                </div>
        </div>
    </div>
    </div>

    {/* RIGHT */}
    <div className="w-full flex flex-col">
        <div className="p-16 bg-white border border-gray-200 rounded-lg ">
                    <div className="grid grid-cols-3 gap-4 text-left items-center font-medium mb-2">
                        <div>Tag</div>
                        <div>Value</div>
                        <div>Action</div>
                    </div>
                    {
                        Object.keys(values).map((tag: string) => (
                        <div key={tag} className="grid grid-cols-3 gap-4 items-center mb-2">
                            <div className="text-gray-700">{tag}</div>
                            <div className="text-gray-700">{values[tag]}</div>
                            <div>
                            <button
                                onClick={() => handleFocus(tag)}
                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            </div>
                        </div>
                        ))
                    }
                    <div className='flex justify-center'> <button
              onClick={handleSave}
              disabled={!isButtonEnabled}
              className={`py-1 px-3 rounded ${
                isButtonEnabled
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-700 cursor-not-allowed'
              }`}
            >save</button></div>
        </div>

         {/* Toast Container */}
         <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
    </div>
</div>
  );
};

export default EditableImage;