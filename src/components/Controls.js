import React from 'react';
import 'icono';
import './components.css';

const PlayIcon = <i className="icon icono-play" />;
const PauseIcon = <i className="icon icono-pause" />;
const ResetIcon = <i className="icon icono-reset" />;
const ClearIcon = <i className="icon icono-cross" />;

const Button = ({ onClick, icon, disabled }) => (
    <button className="button button-control" onClick={onClick} disabled={disabled}>
        {icon}
    </button>
);

class Controls extends React.Component {
    static propTypes = {
        onClear: React.PropTypes.func.isRequired,
        onPlay: React.PropTypes.func.isRequired,
        onPause: React.PropTypes.func.isRequired,
        onReset: React.PropTypes.func.isRequired,
        buttonState: React.PropTypes.object,
    };

    render() {
        const buttons = this.props.buttonState;

        return (
            <div className="row">
                <div className="column">
                    <Button
                        icon={ClearIcon}
                        onClick={this.props.onClear}
                        disabled={!buttons.clearEnabled}
                    />
                    {buttons.pauseEnabled ? (
                        <Button
                            icon={PauseIcon}
                            onClick={this.props.onPause}
                            disabled={!buttons.pauseEnabled}
                        />
                    ) : (
                        <Button
                            icon={PlayIcon}
                            onClick={this.props.onPlay}
                            disabled={!buttons.playEnabled}
                        />
                    )}
                    <Button
                        icon={ResetIcon}
                        onClick={this.props.onReset}
                        disabled={!buttons.resetEnabled}
                    />
                </div>
            </div>
        );
    }
}

export default Controls;
