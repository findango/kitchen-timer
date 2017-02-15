import React from 'react';
import 'icono';
import './components.css';

const PlayIcon = () => <i className="icon icono-play" />;
const PauseIcon = () => <i className="icon icono-pause" />;
const ResetIcon = () => <i className="icon icono-reset" />;
const ClearIcon = () => <i className="icon icono-cross" />;

const buttonClass = 'button button-control';

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

        return <div className="row">
            <div className="column">
                <a className={buttonClass}
                    onClick={this.props.onClear}
                    disabled={!enabled.clear}
                >
                    <ClearIcon />
                </a>
                <a className={buttonClass}
                    onClick={playPauseHandler}
                    disabled={!enabled.play && !enabled.pause}
                >
                    { enabled.pause ?
                        <PauseIcon /> : <PlayIcon />
                    }
                </a>
                <a className={buttonClass}
                    onClick={this.props.onReset}
                    disabled={!enabled.reset}
                >
                    <ResetIcon />
                </a>
            </div>
        </div>;
    }
}

export default Controls;
