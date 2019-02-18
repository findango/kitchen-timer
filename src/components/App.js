import React from 'react';
import Sound from 'react-sound';
import 'milligram';

import Display from './Display';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import Numberpad from './Numberpad';

import './App.css';

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const MAX_TIME = 35999000; // 9:59:59
const appStatus = {
    PAUSED: 'paused',
    RUNNING: 'running',
    ALARMING: 'alarming',
    STOPPED: 'stopped',
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            total: 25 * MINUTES,
            remaining: 25 * MINUTES,
            status: appStatus.PAUSED,
            lastTick: null,
            timer: null,
            digits: '',
        };
    }

    tick = () => {
        const now = Date.now();
        const sinceLast = now - (this.state.lastTick || now);
        const remaining = this.state.remaining - sinceLast;
        if (remaining > 0) {
            this.setState({
                lastTick: now,
                remaining: remaining,
            });
        } else {
            clearInterval(this.state.timer);
            this.setState({
                remaining: 0,
                timer: null,
            });
            this.alarm();
        }
    };

    alarm = () => {
        // flash, play sound, etc. and then reset the timer, if not manually reset
        this.setState({
            status: appStatus.ALARMING,
        });
        setTimeout(() => {
            if (this.state.status === appStatus.ALARMING && this.state.remaining === 0) {
                this.reset();
            }
        }, 5000);
    };

    initializeFromDigits = () => {
        const digits = ('00000' + this.state.digits).substr(-5);
        const hours = Number(digits.substr(0, 1));
        const mins = Number(digits.substr(1, 2));
        const secs = Number(digits.substr(3, 2));
        const time = Math.min((hours * 3600 + mins * 60 + secs) * 1000, MAX_TIME);
        this.setState({
            total: time,
            remaining: time,
            digits: '',
        });
    };

    play = () => {
        if (this.state.status === appStatus.STOPPED && this.state.digits) {
            this.initializeFromDigits();
        }

        const timer = setInterval(this.tick, 100);
        this.setState({
            status: appStatus.RUNNING,
            lastTick: Date.now(),
            timer: timer,
        });
    };

    pause = () => {
        clearInterval(this.state.timer);
        this.setState({
            status: appStatus.PAUSED,
            timer: null,
        });
    };

    reset = () => {
        this.setState({
            remaining: this.state.total,
            status: appStatus.PAUSED,
        });
    };

    clear = () => {
        this.setState({
            remaining: 0,
            status: appStatus.STOPPED,
            digits: '',
        });
    };

    addDigit = digit => {
        if (this.state.digits.length === 5 || (this.state.digits.length === 0 && digit === '0')) {
            return;
        }
        this.setState({
            total: 0,
            remaining: 0,
            digits: this.state.digits + digit,
        });
    };

    configureButtons = () => {
        const { status, total, remaining, digits } = this.state;
        return {
            clearEnabled: status !== appStatus.RUNNING,
            playEnabled:
                status === appStatus.PAUSED ||
                (status === appStatus.STOPPED && (remaining !== 0 || digits.length)),
            pauseEnabled: status === appStatus.RUNNING,
            resetEnabled: status === appStatus.PAUSED && remaining !== total,
        };
    };

    render() {
        return (
            <div className="App container">
                <div className="row">
                    <div className="column column-60 column-offset-20">
                        <Display time={this.state.remaining} digits={this.state.digits} />
                        <ProgressBar
                            size="100%"
                            total={this.state.total}
                            progress={this.state.remaining}
                        />
                        <Controls
                            buttonState={this.configureButtons()}
                            onPlay={this.play}
                            onPause={this.pause}
                            onReset={this.reset}
                            onClear={this.clear}
                        />
                        <Numberpad
                            onClick={this.addDigit}
                            hidden={this.state.status !== appStatus.STOPPED}
                        />
                        <div>{this.state.status}</div>
                    </div>
                </div>
                <Sound
                    url="sounds/foghorn.mp3"
                    autoLoad={true}
                    playStatus={
                        this.state.status === appStatus.ALARMING
                            ? Sound.status.PLAYING
                            : Sound.status.STOPPED
                    }
                />
            </div>
        );
    }
}

export default App;
