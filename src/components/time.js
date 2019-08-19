const right = (len, str) => str.substr(-len);

const pad = (len, number) => {
    const paddedDigits = '0'.repeat(len) + number;
    return right(len, paddedDigits);
};

export const parseDigits = digits => {
    const paddedDigits = pad(5, digits);
    return {
        hours: paddedDigits.substr(0, 1),
        mins: paddedDigits.substr(1, 2),
        secs: paddedDigits.substr(3, 2),
    };
};

export const parseTime = millis => {
    const seconds = Math.floor(millis / 1000) || 0;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60) - hours * 60;
    const secs = seconds - hours * 3600 - mins * 60;
    return {
        hours: pad(1, hours),
        mins: pad(2, mins),
        secs: pad(2, secs),
    };
};
