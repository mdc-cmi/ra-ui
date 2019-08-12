const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

const warningColor = ["#ff9800", "#ffa726", "#fb8c00"]
const dangerColor = ["#f44336", "#ef5350", "#e53935"]
const successColor = ["#4caf50", "#66bb6a", "#43a047"]
const infoColor = ["#00acc1", "#26c6da", "#00acc1"]

export default theme => ({
  warningCardHeader: {
    background: "linear-gradient(60deg, " + warningColor[1] + ", " + warningColor[2] + ")",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(" + hexToRgb(warningColor[0]) + ",.4)"
  },
  successCardHeader: {
    background: "linear-gradient(60deg, " + successColor[1] + ", " + successColor[2] + ")",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(" + hexToRgb(successColor[0]) + ",.4)"
  },
  dangerCardHeader: {
    background: "linear-gradient(60deg, " + dangerColor[1] + ", " + dangerColor[2] + ")",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(" + hexToRgb(dangerColor[0]) + ",.4)"
  },
  infoCardHeader: {
    background: "linear-gradient(60deg, " + infoColor[1] + ", " + infoColor[2] + ")",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(" + hexToRgb(infoColor[0]) + ",.4)"
  },
  primaryCardHeader: {
    background: "linear-gradient(60deg, " + theme.palette.primary.main + ", " + theme.palette.primary.dark + ")",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(" + hexToRgb(theme.palette.primary.main) + ",.4)"
  }
})
