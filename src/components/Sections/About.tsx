'use client';

import { LuPencilLine } from 'react-icons/lu';
import AboutForm from '../Forms/AboutForm';
import { useRef } from 'react';
import { FormikProps } from 'formik';
import { useState } from 'react';

interface AboutProps {
  dob?: number;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  age?: number;
}

const About = (props: AboutProps) => {
  const hasData = !!(props.dob || props.horoscope || props.zodiac || props.height || props.weight);

  const [mode, setMode] = useState<'edit' | 'view'>('view');

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
    console.log('Clicked save with values: ', values);
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

      {/* Edit info */}
      {mode === 'edit' ? (
        <AboutForm ref={formikRef} initialValues={initialValues} onSubmit={handleSubmit} />
      ) : (
        <>
          {!hasData && (
            <p className="text-sm font-medium opacity-50">
              Add in your bio to help others know you better
            </p>
          )}
          {hasData && (
            <div className="space-y-5 text-xs font-medium">
              {props.dob && (
                <div>
                  <span className="text-white/30">Birthday:</span>{' '}
                  <span>
                    {(() => {
                      const date = new Date(props.dob! * 1000);
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      return `${day} / ${month} / ${year}${props.age ? ` (Age ${props.age})` : ''}`;
                    })()}
                  </span>
                </div>
              )}
              {props.horoscope && (
                <div>
                  <span className="text-white/30">Horoscope:</span>{' '}
                  <span>{props.horoscope.charAt(0).toUpperCase() + props.horoscope.slice(1)}</span>
                </div>
              )}
              {props.zodiac && (
                <div>
                  <span className="text-white/30">Zodiac:</span>{' '}
                  <span>{props.zodiac.charAt(0).toUpperCase() + props.zodiac.slice(1)}</span>
                </div>
              )}
              {props.height && (
                <div>
                  <span className="text-white/30">Height:</span> <span>{props.height} cm</span>
                </div>
              )}
              {props.weight && (
                <div>
                  <span className="text-white/30">Weight:</span> <span>{props.weight} kg</span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default About;
