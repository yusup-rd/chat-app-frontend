'use client';

import { LuPencilLine } from 'react-icons/lu';
import AboutForm from '../Forms/AboutForm';
import { useRef } from 'react';
import { FormikProps } from 'formik';
import { toast } from 'react-toastify';
import { useState } from 'react';

const About = () => {
  const [mode, setMode] = useState<'empty' | 'edit' | 'view'>('view');
  const initialValues = {
    name: '',
    gender: '',
    dob: '',
    horoscope: '',
    zodiac: '',
    height: '',
    weight: '',
  };

  const formikRef = useRef<FormikProps<typeof initialValues>>(null);

  const handleSubmit = (values: typeof initialValues) => {
    toast.info('Clicked save with values: ' + JSON.stringify(values));
    setMode('view');
  };

  return (
    <div className="bg-card flex flex-col justify-end gap-5 rounded-2xl p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">About</h2>
        {mode === 'edit' ? (
          <div className="flex items-center gap-3 text-xs font-medium">
            <button className="cursor-pointer text-white/30" onClick={() => setMode('view')}>
              Cancel
            </button>
            <button
              className="gold-text cursor-pointer"
              type="button"
              onClick={() => {
                if (formikRef.current) {
                  formikRef.current.submitForm();
                }
              }}
            >
              Save & Update
            </button>
          </div>
        ) : (
          <button
            className="cursor-pointer rounded-full p-1.5 duration-200 hover:bg-white/10"
            aria-label="Edit About"
            onClick={() => setMode('edit')}
          >
            <LuPencilLine className="size-4" />
          </button>
        )}
      </div>

      {/* Empty info */}
      {mode === 'empty' && (
        <p className="text-sm font-medium opacity-50">
          Add in your bio to help others know you better
        </p>
      )}

      {/* Edit info */}
      {mode === 'edit' && (
        <AboutForm ref={formikRef} initialValues={initialValues} onSubmit={handleSubmit} />
      )}

      {/* View info */}
      {mode === 'view' && <p className="text-sm font-medium">Has info</p>}
    </div>
  );
};

export default About;
