import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subYears } from 'date-fns';
import { useField, useFormikContext } from 'formik';

interface DateOfBirthDropdownProps {
  id: string;
  name: string;
  placeholder: string;
}

const DateOfBirthDropdown = ({ id, name, placeholder }: DateOfBirthDropdownProps) => {
  const [field, , helpers] = useField(name);
  const { setFieldTouched } = useFormikContext();

  const today = new Date();
  const fiftyYearsAgo = subYears(today, 50);

  return (
    <DatePicker
      id={id}
      name={name}
      selected={field.value ? new Date(field.value) : null}
      onChange={(date) => {
        helpers.setValue(date);
      }}
      onChangeRaw={() => {
        setFieldTouched(name, true, false);
      }}
      placeholderText={placeholder}
      dateFormat="dd MMM yyyy"
      showMonthDropdown
      showYearDropdown
      maxDate={today}
      minDate={fiftyYearsAgo}
      yearDropdownItemNumber={100}
      wrapperClassName="w-full"
      className="w-full rounded-lg border border-white/20 bg-white/6 px-3 py-2 text-right text-xs font-medium placeholder:text-white/30"
    />
  );
};

export default DateOfBirthDropdown;
