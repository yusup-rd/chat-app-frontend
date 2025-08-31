'use client';

import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { forwardRef } from 'react';
import { useState } from 'react';
import { FaChevronDown, FaPlus, FaXmark } from 'react-icons/fa6';
import DateOfBirthDropdown from '../Layout/DateOfBirthDropdown';
import { calculateHoroscope, calculateZodiac } from '@/utils/zodiacHoroscopeHelper';
import { profileValidationSchema } from '@/utils/validation';
import Image from 'next/image';

type AboutFormProps = {
  initialValues: {
    name: string;
    gender: string;
    dob: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
    avatarUrl?: string;
  };
  onSubmit: (values: AboutFormProps['initialValues']) => void;
};

const AboutForm = forwardRef<FormikProps<AboutFormProps['initialValues']>, AboutFormProps>(
  function AboutForm({ initialValues, onSubmit }, formikRef) {
    const [genderOpen, setGenderOpen] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(initialValues.avatarUrl);

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={profileValidationSchema}
        innerRef={formikRef}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => {
          const horoscope = calculateHoroscope(values.dob);
          const zodiac = calculateZodiac(values.dob);
          if (values.horoscope !== horoscope) setFieldValue('horoscope', horoscope);
          if (values.zodiac !== zodiac) setFieldValue('zodiac', zodiac);

          return (
            <Form className="flex w-full flex-col gap-3" autoComplete="off">
              {/* Image */}
              <div className="mb-5 flex items-center gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/8 duration-200 hover:bg-white/15">
                  <label
                    htmlFor="avatar-upload"
                    className="flex h-full w-full cursor-pointer items-center justify-center"
                  >
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        width={56}
                        height={56}
                        alt="Avatar"
                        className="h-full w-full rounded-2xl object-cover"
                      />
                    ) : (
                      <FaPlus className="text-2xl text-[#D5BE88]" />
                    )}
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAvatarPreview(reader.result as string);
                            setFieldValue('avatarUrl', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  {avatarPreview && (
                    <button
                      type="button"
                      className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 p-1 hover:bg-black/80"
                      aria-label="Remove image"
                      onClick={() => {
                        setAvatarPreview(undefined);
                        setFieldValue('avatarUrl', undefined);
                        const input = document.getElementById('avatar-upload') as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                    >
                      <FaXmark className="text-sm text-white" />
                    </button>
                  )}
                </div>
                <p className="text-xs font-medium">Add Image</p>
              </div>

              {/* Name */}
              <div className="flex items-center gap-1">
                <label
                  htmlFor="name"
                  className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35"
                >
                  Display Name:
                </label>

                <div className="flex flex-3/4 flex-col">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    autoComplete="on"
                    className="w-full rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium placeholder:text-white/30"
                  />
                  <ErrorMessage name="name" component="div" className="mt-1 text-xs text-red-500" />
                </div>
              </div>

              {/* Gender */}
              <div className="relative flex items-center gap-1">
                <p className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35">Gender:</p>

                <div className="relative flex flex-3/4 flex-col">
                  <button
                    type="button"
                    onClick={() => setGenderOpen(!genderOpen)}
                    className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium"
                  >
                    <span
                      className={`w-full capitalize ${
                        values.gender ? 'text-right' : 'text-right text-white/30'
                      }`}
                    >
                      {values.gender || 'Select Gender'}
                    </span>
                    <FaChevronDown
                      className={`ml-2 h-3 w-3 transition-transform duration-100 ${
                        genderOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {genderOpen && (
                    <div className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-lg border border-white/20 bg-[#162329] shadow-lg">
                      {['male', 'female'].map((g) => (
                        <div
                          key={g}
                          onClick={() => {
                            setFieldValue('gender', g);
                            setGenderOpen(false);
                          }}
                          className="cursor-pointer px-3 py-2 text-xs font-medium capitalize hover:bg-white/10"
                        >
                          {g}
                        </div>
                      ))}
                    </div>
                  )}

                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="flex items-center gap-1">
                <p className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35">
                  Birthday:
                </p>

                <div className="flex flex-3/4 flex-col">
                  <DateOfBirthDropdown id="dob" name="dob" placeholder="DD MM YYYY" />
                  <ErrorMessage name="dob" component="div" className="mt-1 text-xs text-red-500" />
                </div>
              </div>

              {/* Horoscope */}
              <div className="flex items-center gap-1">
                <label
                  htmlFor="horoscope"
                  className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35"
                >
                  Horoscope:
                </label>

                <div className="flex flex-3/4 flex-col">
                  <Field
                    type="text"
                    id="horoscope"
                    name="horoscope"
                    placeholder="--"
                    autoComplete="off"
                    readOnly
                    disabled
                    value={values.horoscope}
                    className="w-full rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium capitalize placeholder:text-white/30 text-white/30"
                  />
                  <ErrorMessage
                    name="horoscope"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* Zodiac */}
              <div className="flex items-center gap-1">
                <label
                  htmlFor="zodiac"
                  className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35"
                >
                  Zodiac:
                </label>

                <div className="flex flex-3/4 flex-col">
                  <Field
                    type="text"
                    id="zodiac"
                    name="zodiac"
                    placeholder="--"
                    autoComplete="off"
                    readOnly
                    disabled
                    value={values.zodiac}
                    className="w-full rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium capitalize placeholder:text-white/30 text-white/30"
                  />
                  <ErrorMessage
                    name="zodiac"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* Height */}
              <div className="flex items-center gap-1">
                <label
                  htmlFor="height"
                  className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35"
                >
                  Height:
                </label>

                <div className="flex flex-3/4 flex-col">
                  <Field
                    type="text"
                    id="height"
                    name="height"
                    placeholder="Add Height (cm)"
                    autoComplete="on"
                    className="w-full rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium placeholder:text-white/30"
                  />
                  <ErrorMessage
                    name="height"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              {/* Weight */}
              <div className="flex items-center gap-1">
                <label
                  htmlFor="weight"
                  className="flex-1/4 text-xs font-medium whitespace-nowrap opacity-35"
                >
                  Weight:
                </label>

                <div className="flex flex-3/4 flex-col">
                  <Field
                    type="text"
                    id="weight"
                    name="weight"
                    placeholder="Add Weight (kg)"
                    autoComplete="on"
                    className="w-full rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium placeholder:text-white/30"
                  />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  },
);

export default AboutForm;
