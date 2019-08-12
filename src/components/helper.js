import React from "react";
import {intersection} from "lodash"
import { compose, withProps } from "recompose"
import { withScriptjs } from "react-google-maps"
import {timeOptions} from "lib/consts"
const toLocaleStringSupportsLocales = (() => {
    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    try {
        new Date().toLocaleString('i');
    } catch (error) {
        return error instanceof RangeError;
    }
    return false;
})();


function redirectPath(path = null) {
  let [,,redirect,] = document.location.href.match(/(\?|&)redirect=(.+)(&|$)/) || []
  return redirect || path || ""
}
function formatTime(value, {showTime = true, locales = [], ...options} = timeOptions) {
  const date = value instanceof Date ? value : new Date(value)
  const dateString = showTime ? toLocaleStringSupportsLocales
            ? date.toLocaleString(locales, options)
            : date.toLocaleString()
        : toLocaleStringSupportsLocales
        ? date.toLocaleDateString(locales, options)
        : date.toLocaleDateString();
  return dateString
}

function checkPermissions(permissions, ...required) {
  return intersection(permissions, required).length > 0
}
const withGoogleApi = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyBjqx84JqxHNObzYs31n8xKOzlJszm9UuY"
  }),
  withScriptjs)

export {checkPermissions, redirectPath, formatTime, withGoogleApi}
