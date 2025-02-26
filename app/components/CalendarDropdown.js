"use client"; 

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarDropdown({ selectedDate, setSelectedDate }) {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold">Deadline</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="w-full p-2 text-xs italic border rounded-md"
        dateFormat="yyyy-MM-dd"
        placeholderText="Pick a date"
        showPopperArrow={false}
        popperPlacement="bottom-start"
      />
    </div>
  );
}

