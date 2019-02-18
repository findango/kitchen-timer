import React from 'react';
import './components.css';

class ProgressBar extends React.Component {
    static propTypes = {
        size: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired,
        progress: React.PropTypes.number.isRequired,
    };

    render() {
        const progressWidth = 100 * (this.props.progress / this.props.total) + '%';

        return (
            <div className="progress-background" style={{ width: this.props.size }}>
                <div className="progress" style={{ width: progressWidth }} />
            </div>
        );
    }
}

export default ProgressBar;
