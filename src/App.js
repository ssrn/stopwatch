import React, { Component } from 'react';
import shortId from 'shortid';
import SVG from 'react-inlinesvg';
import { convertMs } from './utils/convertMs';
import Lap from "./components/Lap";
import Button from "./components/Button";
import Input from "./components/Input";
import './App.css';
import StartImage from './img/start.svg';
import PauseImage from './img/pause.svg';
import ResetImage from './img/stop.svg';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      time: 0,
      lapTime: 0,
      start: 0,
      lapStart: 0,
      isOn: false,
      stops: [0],
      laps: [],
      lapName: 'Lap'
    };
  }

  startTimer = () => {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      lapStart: Date.now() - this.state.lapTime,
      isOn: true,
    });
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.state.start,
        lapTime: Date.now() - this.state.lapStart,
      })
    }, 10);
  };

  stopTimer = () => {
    this.setState({
      isOn: false,
      lapTime: 0,
      lapName: 'Lap'
    });
    clearInterval(this.timer);

    let newLap = {
      id: shortId.generate(),
      prevTime: this.state.stops[this.state.stops.length - 1],
      time: this.state.time,
      duration: this.state.lapTime,
      name: this.state.lapName
    };

    this.setState((prevState) => ({
      laps: [...prevState.laps, newLap],
      stops: [...prevState.stops, this.state.time]
    }));
  };

  resetTimer = () => {
    this.setState({
      time: 0,
      stops: [0],
      laps: [],
      lapName: 'Lap'
    });
  };

  changeLapName = (lapId, e) => {
    const newLaps = this.state.laps.slice();
    const index = newLaps.findIndex(lap => lap.id === lapId);

    newLaps[index].name = e.target.value;

    this.setState({
      laps: newLaps,
    });
  };

  changeCurrentLapName = (e) => {
    this.setState({lapName: e.target.value});
  };

  removeLap = (lapId) => {
    const prevLap = this.state.laps.slice();
    const newLap = prevLap.filter((newLap) => newLap.id !== lapId);
    this.setState({
      laps: newLap
    });
  };

  render() {
    let start = !this.state.isOn ?
      <Button onClick={this.startTimer} children={<SVG src={StartImage} className='icon__start' />} /> :
      <Button onClick={this.stopTimer} children={<SVG src={PauseImage} className='icon__pause' />} />;

    let reset = <Button onClick={this.resetTimer} children={<SVG src={ResetImage} className='icon__reset' />} disabled={this.state.time === 0 && !this.state.isOn}/>;

    const { laps } = this.state;
    let total = 0;
    for (let i = 0; i < laps.length; i++) {
      total += laps[i].duration
    }

    return(
      <div className='timer__container'>
        <div className='timer__time'>{convertMs(this.state.time)}</div>
        <div className="timer__wrap">
          <div className='timer__current-lap'>
            <span className='timer__current-lap-time'>{convertMs(this.state.lapTime)}</span>
            <Input
              className='timer__current-lap-name'
              type="text"
              value={this.state.lapName}
              size={this.state.lapName.length}
              onChange={this.changeCurrentLapName}
            />
          </div>
        </div>
        <div className='timer__controls'>
          {start}
          {reset}
        </div>
        <table className='timer__laps'>
          <tbody>
            {laps.map((lap) => (
              <Lap key={lap.id} lap={lap} onChange={(e) => this.changeLapName(lap.id, e)} onRemove={() => this.removeLap(lap.id)} />
            ))}
          </tbody>
          {laps.length > 0 &&
            <tfoot><tr>
              <td style={{textAlign: 'right'}}>total: </td>
              <td className='timer__total'>{convertMs(total)}</td>
            </tr></tfoot>
          }
        </table>
      </div>
    )
  }
}

export default App;
