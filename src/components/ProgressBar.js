import React from 'react';
import './components.css';

class ProgressBar extends React.Component {
    static propTypes = {
        size: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired,
        progress: React.PropTypes.number.isRequired,
    };

    render() {
        const width = this.props.size;
        const progressWidth = 100 * (this.props.progress / this.props.total) + "%";

        return <div>
            <div className="progress" style={{width}}>
                <div className="remaining" style={{width: progressWidth}}></div>
            </div>
        </div>
   }
};

export default ProgressBar;
