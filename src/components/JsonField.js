import React from "react"
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import get from 'lodash/get';

const JsonField = ({ className, source, record = {}, ...rest }) => {
    const value = get(record, source)
    return (
        <Typography component="pre"
            className={className}
        >
            {value && typeof value !== 'string' ? JSON.stringify(value, null, 4) : value}
        </Typography>
    );
};

JsonField.propTypes = {
    addLabel: PropTypes.bool,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
}
JsonField.defaultProps = {
    addLabel: true
}
export default JsonField
