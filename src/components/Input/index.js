/**
 * Input
 */

import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

class Input extends React.Component {
  render() {
    const {
      className,
      type,
      value,
      size,
      onChange,
    } = this.props;

    return (
      <input
        className={className}
        type={type}
        value={value}
        size={size}
        onChange={onChange}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.number,
  onChange: PropTypes.func,
};

export default Input;
