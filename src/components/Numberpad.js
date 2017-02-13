import React from 'react';
import './components.css';

const bindButton = (handleClick) => (props) => {
    return (
        <button
            className="button button-outline button-num"
            onClick={() => handleClick(props.value)}
        >
            {props.value}
        </button>
    );
};

class Numberpad extends React.Component {
    render() {
        const Button = bindButton(this.props.onClick);

        if (this.props.hidden) {
            return null;
        }

        return <div>
            <div className="row">
                <div className="column">
                    <Button value="1"/>
                    <Button value="2"/>
                    <Button value="3"/>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <Button value="4"/>
                    <Button value="5"/>
                    <Button value="6"/>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <Button value="7"/>
                    <Button value="8"/>
                    <Button value="9"/>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <Button value="."/>
                    <Button value="0"/>
                    <Button value="."/>
                </div>
            </div>
        </div>
    }
}

export default Numberpad;
