import React from 'react';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import { Field, useForm, } from 'react-final-form'
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {addField, FieldTitle } from 'ra-core';
import {withGoogleApi} from "./helper"
import _ from "lodash"

function getLocation(components) {
  const getComponent = type => _.get(_.find(components, ["types", [type]]), "long_name")
  const getAddress = () => getComponent("street_address") || _.compact([getComponent("route"), getComponent("street_number")]).join(", ")

  return ({
    address: getAddress(),
    zip: getComponent("postal_code"),
    city: getComponent("locality"),
    state: getComponent("administrative_area_level_1"),
    country: getComponent("country"),
  })
}
const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    containerOpened: {
        position: 'absolute',
        marginBottom: theme.spacing(3),
        zIndex: 2,
    },
    suggestionsPaper: {
        maxHeight: '50vh',
        overflowY: 'auto',
    },
    suggestionText: { fontWeight: 300 }
}))

function updateAnchorEl(inputEl, anchorEl) {
    const inputPosition = inputEl.getBoundingClientRect()
    const {clientWidth, clientHeight} = inputEl
    if (!anchorEl) {
        return ({clientWidth, clientHeight, getBoundingClientRect: () => inputPosition })
    } else {
        const anchorPosition = anchorEl.getBoundingClientRect();
        if (anchorPosition.x !== inputPosition.x || anchorPosition.y !== inputPosition.y) {
          return ({clientWidth, clientHeight, getBoundingClientRect: () => inputPosition })
        }
    }
    return anchorEl
}

export default addField(withGoogleApi(({ input, source, isRequired, resource, helperText, className, label, onMapChange }) => {
  const classes = useStyles()
  const {change} = useForm()
  const {value, onChange} = input || {value: {}}
  const [selectedValue, setSelectedValue] = React.useState(value && value.formatted)
  const anchorEl = React.useRef(null)
  const handleSelect = React.useCallback(address => {
    onChange({...value, formatted: address})
    if(selectedValue !== address) {
      geocodeByAddress(address)
          .then(results => {
            if(results.length > 0) {
              let location = getLocation(results[0].address_components)
              Object.keys(location).forEach(name => {
                change(`${source}.${name}`, location[name])
              })
            }
            return results
          })
          .then(results => getLatLng(results[0]))
          .then(({lat, lng}) => {
            change(`${source}.lat`, lat)
            change(`${source}.lng`, lng)
            onMapChange && onMapChange({lat, lng})
          })
          .then(() => setSelectedValue(address))
          .catch(error => console.error('Error', error));
    }
  }, [onMapChange, change, selectedValue, value, onChange, source])

  const renderInput = React.useCallback(({ input, label, meta: { touched, error }, ...rest }) => {
      return <TextField
          label={
              <FieldTitle
                  label={label}
                  source={source}
                  resource={resource}
                  isRequired={isRequired}
              />
          }
          inputRef={input => {
            if(input) anchorEl.current = updateAnchorEl(input, anchorEl.current)
          }}
          error={!!(touched && error)}
          helperText={(touched && error) || helperText}
          {...input}
          {...rest}
      />
  }, [source, resource, isRequired, helperText])

  return ( <PlacesAutocomplete value={value ? value.formatted : ""} onChange={address => onChange({...value, formatted: address})} onSelect={handleSelect} >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div>
        <Field label={label} className={className} name={`${source}.formatted`}  component={renderInput} {...getInputProps()} />
        <Field name={`${source}.lat`} component="input" type="hidden"  />
        <Field name={`${source}.lng`} component="input" type="hidden"  />
        <Field name={`${source}.address`} component="input" type="hidden"  />
        <Field name={`${source}.city`} component="input" type="hidden" />
        <Field name={`${source}.state`} component="input" type="hidden" />
        <Field name={`${source}.country`} component="input" type="hidden" />
        <Field name={`${source}.zip`} component="input" type="hidden" />

        <Popper className={ suggestions.length > 0 ? classes.containerOpened : classes.container}
          open={suggestions.length > 0}
          anchorEl={anchorEl.current}
          placement="bottom-start">
            <Paper square className={classes.suggestionsPaper} >
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                return (<MenuItem
                    selected={suggestion.active}
                    component="div"
                    suggestion={suggestion}
                    {...getSuggestionItemProps(suggestion)}
                >
                <strong className={classes.suggestionText}>
                  {suggestion.description}
                </strong>
                </MenuItem>)
              })}
            </Paper>
        </Popper>
      </div>
    )}
  </PlacesAutocomplete>)
}))
