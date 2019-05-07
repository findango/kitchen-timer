import React from 'react';
import './components.css';

const bindButton = handleClick => props => (
    <button className="button button-num" onClick={() => handleClick(props.value)}>
        {props.value}
    </button>
);

const Row = props => (
    <div className="row">
        <div className="column">{props.children}</div>
    </div>
);

class Numberpad extends React.Component {
    render() {
        const Button = bindButton(this.props.onClick);

        if (this.props.hidden) {
            return null;
        }

        return (
            <div>
                <Row>
                    <Button value="1" />
                    <Button value="2" />
                    <Button value="3" />
                </Row>
                <Row>
                    <Button value="4" />
                    <Button value="5" />
                    <Button value="6" />
                </Row>
                <Row>
                    <Button value="7" />
                    <Button value="8" />
                    <Button value="9" />
                </Row>
                <Row>
                    <span className="button-num" />
                    <Button value="0" />
                    <span className="button-num" />
                </Row>
            </div>
        );
    }
}

export default Numberpad;
