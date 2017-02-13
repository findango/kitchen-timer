import React from 'react';
import './components.css';

class ProgressBar extends React.Component {
    static propTypes = {
        size: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
        remaining: React.PropTypes.number.isRequired,
    };

    render() {
        const width = this.props.size + "px";
        const remainingWidth = (this.props.size * (this.props.remaining / this.props.total)) + "px";

        return <div>
            <div className="progress" style={{width: width}}>
                <div className="remaining" style={{width: remainingWidth}}></div>
            </div>
        </div>
   }
};

export default ProgressBar;
