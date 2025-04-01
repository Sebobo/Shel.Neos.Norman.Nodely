import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class SpeechBubble extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        severity: PropTypes.string.isRequired,
        timeout: PropTypes.number,
        onClose: PropTypes.func.isRequired
    };

    handleClose = () => {
        const {onClose, id} = this.props;

        setTimeout(() => onClose(id), 100);
    }

    componentDidMount() {
        const {timeout} = this.props;

        if (timeout) {
            setTimeout(this.handleClose, timeout);
        }
    }

    render() {
        const {message, severity} = this.props;

        return (
            <span className="speech-bubble" role="alert">
                {message}
            </span>
        );
    }
}
