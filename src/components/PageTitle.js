import { parseDigits, parseTime } from './time';

const PageTitle = props => {
    const paddedTime = props.time + 900;
    const { hours, mins, secs } = props.digits
        ? parseDigits(this.props.digits)
        : parseTime(paddedTime);

    document.title = hours + 'h ' + mins + 'm ' + secs + 's';

    return null;
};

export default PageTitle;
