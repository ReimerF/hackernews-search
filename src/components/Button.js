import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    render () {
        const { children, className, onClick} = this.props;
        return (
            <button
                className={className}
                onClick={onClick}
                type="button">
                {children}
            </button>
        )
    }
}

Button.propTypes ={
    onClick: PropTypes.func.isRequired,
    classname: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    classname: '',
}

export default Button;