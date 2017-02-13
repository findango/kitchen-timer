import React from 'react';
import './components.css';

const pad = (number, digits = 2) => {
    return ('00' + number).substr(-digits);
}

const parseTime = (millis) => {
    const seconds = Math.floor(millis / 1000) || 0;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60) - (hours * 60);
    const secs = seconds - (hours * 3600) - (mins * 60);

    return { hours: pad(hours, 1), mins: pad(mins), secs: pad(secs) };
};

class Display extends React.Component {
    static propTypes = {
        time: React.PropTypes.number.isRequired,
    };

    render() {
        const { hours, mins, secs } = parseTime(this.props.time + 900);

        return <div>
            <div className="displayGroup"><h1>{hours}h</h1></div>
            <div className="displayGroup"><h1>{mins}m</h1></div>
            <div className="displayGroup"><h1>{secs}s</h1></div>
        </div>;
    }
}

export default Display;
