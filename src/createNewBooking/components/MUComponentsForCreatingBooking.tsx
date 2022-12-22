import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { datesManager } from 'src/dates/datesManager';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'] as const;

export default function MUComponentsForCreatingBooking({
  name,
}: {
  name: string;
}) {
  const currentDate = datesManager.getCurrentDate();

  const [locale, setLocale] = React.useState<typeof locales[number]>('ru');

  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs(currentDate),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Дата поездки"
          value={datePickerValue}
          onChange={(newValue) => setDatePickerValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
          inputFormat={'DD/MM/YYYY'}
        />
        {/*<DesktopDatePicker*/}
        {/*  label="Дата поездки"*/}
        {/*  value={value}*/}
        {/*  minDate={dayjs('2017-01-01')}*/}
        {/*  onChange={(newValue) => {*/}
        {/*    setValue(newValue);*/}
        {/*  }}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
      </Stack>
    </LocalizationProvider>
  );
}

export function ResponsiveTimePickers({ name }: { name: string }) {
  const currentDate = datesManager.getCurrentDateTime();
  const [locale, setLocale] = React.useState<typeof locales[number]>('ru');

  const [timePickerValue, setTimePickerValue] = React.useState<Dayjs | null>(
    dayjs(currentDate),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <MobileTimePicker
          label="Время поездки"
          value={timePickerValue}
          onChange={(newValue) => setTimePickerValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        {/*<DesktopTimePicker*/}
        {/*  label="For desktop"*/}
        {/*  value={value}*/}
        {/*  onChange={(newValue) => {*/}
        {/*    setValue(newValue);*/}
        {/*  }}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
      </Stack>
    </LocalizationProvider>
  );
}