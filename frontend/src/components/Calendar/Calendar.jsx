import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const getDefaultDate = (dueDate) => {
  const { day, month, year } = dueDate;
  const mmddyyyyFormat = `${month}-${day}-${year}`;
  return dayjs(mmddyyyyFormat);
};

const Calendar = ({
  setTaskDueDate,
  dueDate = { day: 1, month: 1, year: 2024 },
}) => {
  const [date, setDate] = useState({});
  console.log(dayjs({ day: 1, month: 1, year: 2024 }));
  console.log(dayjs("01-02-2024"));

  useEffect(() => {
    setDate(getDefaultDate(dueDate));
  }, []);

  const handleChange = (targetValue) => {
    const { $D: day, $M: monthIndex, $y: year } = targetValue;
    const month = monthIndex + 1;
    setTaskDueDate({ day, month, year });
    setDate(targetValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Task Due Date" value={date} onChange={handleChange} />
    </LocalizationProvider>
  );
};

export default Calendar;
