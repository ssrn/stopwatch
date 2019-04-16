/**
 * Button
 */

import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

class Button extends React.Component {
  render() {
    const {
      className,
      onClick,
      disabled,
      children,
    } = this.props;

    return (
      <button
        className={`btn ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
