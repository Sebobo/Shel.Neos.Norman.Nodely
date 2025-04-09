import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {neos} from '@neos-project/neos-ui-decorators';

import styles from './plugin.css';
import SpeechBubble from "./SpeechBubble";
import ChatBot from './vendor/chatbot';

/**
 * Creates Norman Nodely class based on given config, which is expected to be very good!
 * @param {{eyeOffsetDegrees: number}} config
 */
export default function makeNormanNodelyPlugin(config) {
    class NormanNodelyPlugin extends React.PureComponent {
        static propTypes = {
            flashMessages: PropTypes.object,
        };

        static defaultProps = {
            flashMessages: {}
        };

        state = {
            lastFlashMessage: {
                id: '0',
                message: 'Hi, I\'m Norman Nodely! How can I help you today?',
                severity: 'default',
                timeout: 10000,
            },
        };

        // Message collections for each severity type
        static messages = {
            success: [
                'Hurray! You did it!',
                'Awesome job! That worked perfectly!',
                'Success! Everything went as planned.',
                'Well done! That was a great move.',
                'Perfect! That\'s exactly right.',
                'Excellent work! Mission accomplished.',
                'Bravo! You nailed it!',
                'Fantastic! That\'s the way to do it.',
                'Great success! Keep up the good work.',
                'Splendid! That worked like a charm.'
            ],
            error: [
                'Oh no! Something went wrong!',
                'Oops! That didn\'t quite work.',
                'Uh-oh! We hit a snag.',
                'That didn\'t go as planned.',
                'We\'ve got a problem here.',
                'Error detected! Let\'s try something else.',
                'That\'s not right. Maybe try again?',
                'Something\'s not working properly.',
                'Well, that didn\'t work. Let\'s rethink this.',
                'Houston, we have a problem!'
            ],
            info: [
                'Just so you know...',
                'Here\'s something you might find interesting.',
                'FYI: This might be useful to know.',
                'Quick update for you...',
                'Did you know? Here\'s some info.',
                'Heads up! Something to be aware of.',
                'For your information...',
                'Here\'s a tip that might help.',
                'Just a friendly reminder...',
                'By the way, I thought you should know...'
            ],
            default: [
                'Hello there!',
                'Hey! How\'s it going?',
                'Greetings from Norman!',
                'Hi! I\'m your friendly assistant.',
                'Welcome back!',
                'Hey there! Need any help?',
                'Good to see you!',
                'Hello! I\'m here if you need me.',
                'Hi! What are we working on today?',
                'Hey! Ready for some productivity?'
            ]
        };

        componentDidMount() {
            const that = this;
            ChatBot.init({
                inputs: '#normanNodelyInput',
                inputCapabilityListing: true,
                addChatEntryCallback: (entryDiv, text, origin) => {
                    if (origin !== 'bot') {
                        return;
                    }
                    that.setState({
                        lastFlashMessage: {
                            id: '' + Math.random() * 1000,
                            message: text,
                            severity: 'info',
                            timout: 10000,
                        }
                    })
                    document.getElementById('normanNodelyInput').value = '';
                }
            });
            ChatBot.setBotName("Norman Nodely");
            ChatBot.addPattern(
                "(?:my name is|I'm|I am) (.*)",
                "response",
                "Hi $1, thanks for talking to me today",
                function (matches) {
                    ChatBot.setHumanName(matches[1]);
                },
                "Say 'My name is [name]' to be called by your name."
            );
            ChatBot.addPattern(
                "How (.*) publish(.*)",
                "response",
                "Just click the publish button on the top right corner."
            );

            const svg = document.getElementById('normanSvg')
            document.addEventListener("mousemove", (e) => {
                movePupils(e);
            });

            function movePupils(e) {
                let eyes = svg.querySelectorAll('.eye');
                eyes.forEach((eye, i) => {
                    let eyeball = eye.querySelector('.eyeball');
                    let pupil = eye.querySelector('.pupil');

                    // get center cx/cy and radius
                    let pCenter = {x: +eyeball.getAttribute('cx'), y: +eyeball.getAttribute('cy')};
                    let rEyeball = +eyeball.getAttribute('r');
                    let rPupil = +pupil.getAttribute('r');

                    // translate cursor HTML DOM coordinates to SVG DOM units
                    let pCursor = new DOMPoint(e.clientX, e.clientY);
                    pCursor = pCursor.matrixTransform(svg.getScreenCTM().inverse());

                    // get angle between cursor and eyeball center;
                    let angle = (Math.atan2(pCursor.y - pCenter.y, pCursor.x - pCenter.x) * 180) / Math.PI + (i * config.eyeOffsetDegrees);

                    //get distance between cursor and eyeball center
                    let a = pCursor.x - pCenter.x;
                    let b = pCursor.y - pCenter.y;
                    let distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

                    // adjust pupil movement inside eyeball boundaries
                    let offset = distance < rEyeball ? 1 / rEyeball * distance : 1;
                    let radiusOuter = (rEyeball - rPupil) * offset;

                    let pMoved = {
                        x: pCenter.x + Math.cos((angle * Math.PI) / 180) * radiusOuter,
                        y: pCenter.y + Math.sin((angle * Math.PI) / 180) * radiusOuter
                    }
                    // update attributes
                    pupil.setAttribute('cx', pMoved.x)
                    pupil.setAttribute('cy', pMoved.y)

                })

            }
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.flashMessages !== prevProps.flashMessages) {
                const latestMessage = Object.values(this.props.flashMessages).slice(-1)[0];
                if (!latestMessage) {
                    this.setState({
                        lastFlashMessage: null
                    })
                }
                // Store last flash message
                this.setState({
                    lastFlashMessage: {
                        ...latestMessage,
                        message: this.getRandomMessage(latestMessage?.severity),
                        timeout: 7000,
                    }
                });
            }
        }

        handleClick = () => {
            if (this.state.lastFlashMessage) {
                this.setState({lastFlashMessage: null});
            } else {
                const message = this.getRandomMessage('default');
                this.setState({
                    lastFlashMessage: {
                        id: '' + Math.random() * 1000,
                        message: message,
                        severity: 'default',
                        timeout: 3000,
                    }
                })
            }
        }

        handleSubmit = (e) => {
        }

        getRandomMessage(severity) {
            const messageCollection = NormanNodelyPlugin.messages[severity] || NormanNodelyPlugin.messages.default;
            const randomIndex = Math.floor(Math.random() * messageCollection.length);
            return messageCollection[randomIndex];
        }

        render() {
            const {lastFlashMessage} = this.state;

            return (
                <div className="normanNodely">
                <span className="avatar" onClick={this.handleClick}>
                    <svg id="normanSvg" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink"
                         x="0" y="0"
                         width="111.73" height="124.72" viewBox="0, 0, 111.73, 124.72">
                        <defs>
                            <clipPath id="Clip_1">
                                <path d="M12.341,10.964 L115.341,10.964 L115.341,69.964 L12.341,69.964 z"/>
                            </clipPath>
                        </defs>
                        <g id="Ebene_1" transform="translate(-5.976, -8.964)">
                            <g id="neos_avatar_primary">
                                <path d="M95.006,8.964 L74.246,24.094 L74.246,55.734 L95.006,85.084 L95.006,8.964 z"
                                      fill="#28234C"/>
                                <path
                                    d="M95.006,121.784 L15.216,8.964 L5.976,15.724 L5.976,133.684 L26.726,118.564 L26.726,60.144 L78.626,133.684 L101.326,133.684 L117.706,121.784 L95.006,121.784 z"
                                    fill="#28234C"/>
                                <path
                                    d="M26.726,60.144 L26.726,118.564 L5.976,133.684 L28.676,133.684 L49.436,118.564 L49.436,92.314 L26.726,60.144 z"
                                    fill="#009FE3"/>
                                <path
                                    d="M95.006,85.084 L95.006,8.964 L117.706,8.964 L117.706,121.784 L95.006,121.784 L15.216,8.964 L41.166,8.964 L95.006,85.084 z"
                                    fill="#009FE3"/>
                            </g>
                            <g className="eye">
                                <circle className="eyeball" cx="30" cy="50" r="20" fill="white" stroke="#000"/>
                                <circle className="pupil" cx="30" cy="50" r="10" fill="#000"/>
                            </g>

                            <g className="eye">
                                <circle className="eyeball" cx="95" cy="50" r="20" fill="white" stroke="#000"/>
                                <circle className="pupil" cx="95" cy="50" r="10" fill="#000"/>
                            </g>
                        </g>
                    </svg>
                </span>
                    <input
                        id="normanNodelyInput"
                        type="text"
                        placeholder="Talk to me…"
                        onKeyPress={this.handleSubmit}
                    />
                    <div id="chatBot">
                        <div id="chatBotThinkingIndicator"></div>
                        <div id="chatBotHistory"></div>
                    </div>
                    {lastFlashMessage?.id && (
                        <SpeechBubble
                            id={lastFlashMessage.id}
                            message={lastFlashMessage.message}
                            severity={lastFlashMessage.severity}
                            timeout={lastFlashMessage.timeout}
                            onClose={this.handleClick}
                        />
                    )}
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        flashMessages: state.ui.flashMessages
    });

    const mapDispatchToProps = (dispatch) => ({});

    const mapGlobalRegistryToProps = neos((globalRegistry) => ({}));

    return connect(() => ({}), {})(connect(mapStateToProps, mapDispatchToProps)(mapGlobalRegistryToProps(NormanNodelyPlugin)));
}
