import React from 'react';
import { addField, FieldTitle } from 'ra-core';
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"

const makePicker = (PickerComponent) => ({input, options, label, source, resource, isRequired, className, meta}) => {
  const { touched, error } = meta
  const onChange = (date) => {
    input.onChange(date)
    input.onBlur()
  }
  return (
    <div className="picker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <PickerComponent
          {...options}
          label={<FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />}
          margin="normal"
          error={!!(touched && error)}
          helperText={touched && error}
          className={className}
          value={input.value ? input.value : null}
          onChange={date => onChange(date)}
        />
      </MuiPickersUtilsProvider>
    </div>)
}

export const DateInput = addField(makePicker(DatePicker));
export const TimeInput = addField(makePicker(TimePicker));
export const DateTimeInput = addField(makePicker(DateTimePicker));
