import React from 'react';

const pad = (number, digits = 2) => {
    return ('00' + number).substr(-digits);
};

const parseTime = millis => {
    const seconds = Math.floor(millis / 1000) || 0;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60) - hours * 60;
    const secs = seconds - hours * 3600 - mins * 60;
    return {
        hours: pad(hours, 1),
        mins: pad(mins),
        secs: pad(secs),
    };
};

const parseDigits = digits => {
    const paddedDigits = ('00000' + digits).substr(-5);
    return {
        hours: paddedDigits.substr(0, 1),
        mins: paddedDigits.substr(1, 2),
        secs: paddedDigits.substr(3, 2),
    };
};

const PageTitle = props => {
    const paddedTime = props.time + 900;
    const { hours, mins, secs } = props.digits
        ? parseDigits(this.props.digits)
        : parseTime(paddedTime);

    document.title = hours + 'h ' + mins + 'm ' + secs + 's';

    return <div />;
};

export default PageTitle;
