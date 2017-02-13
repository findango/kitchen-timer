import React from 'react';
import './components.css';

const buttonClass = 'button button-outline';

class Controls extends React.Component {

    render() {
        const enabled = this.props.buttonState;
        const playPauseCaption = enabled.play ? 'Play' : 'Pause';
        const playPauseHandler = enabled.play ? this.props.onPlay : this.props.onPause;

        return <div>
            <button className={buttonClass}
                onClick={this.props.onClear}
                disabled={!enabled.clear}
            >
                Clear
            </button>
            <button className={buttonClass}
                onClick={playPauseHandler}
                disabled={!enabled.play && !enabled.pause}
            >
                {playPauseCaption}
            </button>
            <button className={buttonClass}
                onClick={this.props.onReset}
                disabled={!enabled.reset}
            >
                Reset
            </button>
        </div>;
    }
}

export default Controls;
