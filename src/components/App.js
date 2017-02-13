import React from 'react';
import 'milligram';

import Display from './Display';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import Numberpad from './Numberpad';

import './App.css';

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            total: 25 * MINUTES,
            remaining: 25 * MINUTES,
            status: 'stopped',
            lastTick: null,
            timer: null,
            digits: '',
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.reset = this.reset.bind(this);
        this.clear = this.clear.bind(this);
        this.tick = this.tick.bind(this);
        this.alarm = this.alarm.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    tick() {
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
                status: 'stopped',
                timer: null,
            });
            this.alarm();
        }
    }

    alarm() {
        console.log('Alarm!');
        // flash, play sound, etc.
        // and reset the timer
        setTimeout(() => {
            if (this.state.status === 'stopped' && this.state.remaining === 0) {
                this.setState({
                    remaining: this.state.total,
                });
            }
        }, 3000);
    }

    play() {
        const timer = setInterval(this.tick, 100);
        this.setState({
            status: 'running',
            lastTick: Date.now(),
            timer: timer,
        })
    }

    pause() {
        clearInterval(this.state.timer);
        this.setState({
            status: 'paused',
            timer: null,
        })
    }

    reset() {
        this.setState({
            remaining: this.state.total,
            status: 'paused',
        });
    }

    clear() {
        this.setState({
            remaining: 0,
            status: 'stopped',
            digits: '',
        });
    }

    addDigit(digit) {
        if (this.state.digits.length < 5) {
            const digits = ('00000' + this.state.digits + digit).substr(-5);
            const hours = Number(digits.substr(0, 1));
            const mins = Number(digits.substr(1, 2));
            const secs = Number(digits.substr(3, 2));
            const time = ((hours * 3600) + (mins * 60) + secs) * 1000;
            this.setState({
                total: time,
                remaining: time,
                digits: this.state.digits + digit,
                status: 'paused',
            });
        }
    }

    configureButtons() {
        const clearEnabled = this.state.status !== 'running';
        const resetEnabled =
            (this.state.status == 'paused') &&
            (this.state.remaining !== this.state.total);
        const playEnabled =
            (this.state.status !== 'running') &&
            (this.state.remaining !== 0);
        const pauseEnabled = this.state.status === 'running';

        return {
            clear: clearEnabled,
            play: playEnabled,
            pause: pauseEnabled,
            reset: resetEnabled,
        }
    }

    render() {
        const controlState = this.configureButtons();

        return (
            <div className="App container">
                <Display time={this.state.remaining} />
                <ProgressBar
                    size={200}
                    total={this.state.total}
                    remaining={this.state.remaining}
                />
                <Controls
                    buttonState={controlState}
                    onPlay={this.play}
                    onPause={this.pause}
                    onReset={this.reset}
                    onClear={this.clear}
                />
                <Numberpad
                    onClick={this.addDigit}
                    disabled={this.state.status !== 'stopped'}
                />
            <div>{this.state.status}</div>
            </div>
        );
    }
}

export default App;
