import React, { Component, PropTypes } from 'react';
import { parseDigits, parseTime } from './time';
import './components.css';

class Display extends Component {
    static propTypes = {
        time: PropTypes.number,
        digits: PropTypes.string,
    };

    render() {
        // Display from the "top" of the second: 24s = 24.9s
        // It looks better at the start and end (when reaching zero).
        const paddedTime = this.props.time + 900;
        const { hours, mins, secs } = this.props.digits
            ? parseDigits(this.props.digits)
            : parseTime(paddedTime);

        // prettier-ignore
        return (
            <div className="display">
                <div className="digit">{hours}<small>h</small></div>
                <div className="digit">{mins}<small>m</small></div>
                <div className="digit">{secs}<small>s</small></div>
            </div>
        );
    }
}

export default Display;
