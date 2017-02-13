import React from 'react';
import 'icono';
import './components.css';

const PlayIcon = () => <i className="icono-play" />;
const PauseIcon = () => <i className="icono-pause" />;
const ResetIcon = () => <i className="icono-reset" />;
const ClearIcon = () => <i className="icono-cross" />;

const buttonClass = 'button button-outline';

class Controls extends React.Component {
    static propTypes = {
        onClear: React.PropTypes.func.isRequired,
        onPlay: React.PropTypes.func.isRequired,
        onPause: React.PropTypes.func.isRequired,
        onReset: React.PropTypes.func.isRequired,
        buttonState: React.PropTypes.object,
    };

    render() {
        const enabled = this.props.buttonState;
        const playPauseHandler = enabled.play ? this.props.onPlay : this.props.onPause;

        return <div>
            <button className={buttonClass}
                onClick={this.props.onClear}
                disabled={!enabled.clear}
            >
                <ClearIcon />
            </button>
            <button className={buttonClass}
                onClick={playPauseHandler}
                disabled={!enabled.play && !enabled.pause}
            >
                { enabled.pause ?
                    <PauseIcon /> : <PlayIcon />
                }
            </button>
            <button className={buttonClass}
                onClick={this.props.onReset}
                disabled={!enabled.reset}
            >
                <ResetIcon />
            </button>
        </div>;
    }
}

export default Controls;
