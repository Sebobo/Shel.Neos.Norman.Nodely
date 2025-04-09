document.addEventListener('DOMContentLoaded', () => {
    const logoWrapper = document.querySelector('.neos-login-box-logo');
    const nodelyInjector = document.getElementById('nodelyInjector');
    const theNormanSVG = nodelyInjector.querySelector('svg');
    const eyeOffsetDegrees = nodelyInjector.dataset.eyeOffsetDegrees || 60;
    const errorTooltip = document.querySelector('.neos-tooltip-error');

    const messages = [
        'Do you even know your own credentials?',
        'Seriously? That’s your best attempt?',
        'Come on, focus! You can do better.',
        'Are you even trying?',
        'This is getting embarrassing. Try harder.',
        'Wrong again. Maybe double-check this time?',
        'It’s like you don’t even know yourself.',
        'Let’s take a moment to reflect on this failure.',
        'Incorrect. Perhaps a tutorial would help?',
        'At this point, I’m questioning your commitment.',
        'Did you already try turning it off and on again?',
        'I’m starting to think you might need a password manager.',
        'This is not a game. You can’t keep guessing forever.',
        'I’m not sure if you’re joking or just really bad at this.',
        'This is getting sad. Maybe ask for help?',
        'I’m not mad, just disappointed.',
        'You know, there are people who can help you with this.',
        'This is like watching someone try to parallel park.',
        'I’m starting to think you might need a new password.',
        'You’re making this way harder than it needs to be.',
        'This is like watching someone try to solve a Rubik’s cube blindfolded.',
    ];

    // Go away bad logo, go!
    logoWrapper.innerHTML = '';

    // Norman shall be the one logo!
    logoWrapper.appendChild(theNormanSVG)

    // If the user is to bad at entering their password, we need to make them understand the error of their ways.
    if (errorTooltip) {
        errorTooltip.querySelector('.neos-tooltip-inner').innerText = messages[Math.floor(Math.random() * messages.length)];
        logoWrapper.appendChild(errorTooltip);
    }

    document.addEventListener("mousemove", (e) => {
        movePupils(e);
    });

    function movePupils(e) {
        let eyes = theNormanSVG.querySelectorAll('.eye');
        eyes.forEach((eye, i) => {
            let eyeball = eye.querySelector('.eyeball');
            let pupil = eye.querySelector('.pupil');

            // get center cx/cy and radius
            let pCenter = {x: +eyeball.getAttribute('cx'), y: +eyeball.getAttribute('cy')};
            let rEyeball = +eyeball.getAttribute('r');
            let rPupil = +pupil.getAttribute('r');

            // translate cursor HTML DOM coordinates to SVG DOM units
            let pCursor = new DOMPoint(e.clientX, e.clientY);
            pCursor = pCursor.matrixTransform(theNormanSVG.getScreenCTM().inverse());

            // get angle between cursor and eyeball center;
            let angle = (Math.atan2(pCursor.y - pCenter.y, pCursor.x - pCenter.x) * 180) / Math.PI + (i * eyeOffsetDegrees);

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
});
