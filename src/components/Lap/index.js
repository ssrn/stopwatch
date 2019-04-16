/**
 * LapItem
 */

import PropTypes from "prop-types";
import React from 'react';
import { convertMs } from '../../utils/convertMs';
import Input from "../Input";
import './styles.css';

const propTypes = {
  lap: PropTypes.shape({
    id: PropTypes.string,
    prevTime: PropTypes.number,
    time: PropTypes.number,
    duration: PropTypes.number,
    name: PropTypes.text,
  }),
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

class Lap extends React.Component {
  onChange = (e) => {
    this.props.onChange(e, this.props.lap.time);
  };

  onRemove = () => {
    this.props.onRemove(this.props.lap.time);
  };

  render() {
    return (
      <tr className='timer__lap'>
        <td className='lap__item lap__interval'>{convertMs(this.props.lap.prevTime)} - {convertMs(this.props.lap.time)}</td>
        <td className='lap__item lap__duration'><b>{convertMs(this.props.lap.duration)}</b></td>
        <td><Input
          className='lap__item lap__name'
          type="text"
          value={this.props.lap.name}
          size={this.props.lap.name.length}
          onChange={this.props.onChange}
        /></td>
        <td className='lap__item lap__remove' onClick={this.props.onRemove}> X </td>
      </tr>
    );
  }
}

Lap.propTypes = propTypes;

export default Lap;