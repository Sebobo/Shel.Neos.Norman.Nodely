const

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
        let angle = (Math.atan2(pCursor.y - pCenter.y, pCursor.x - pCenter.x) * 180) / Math.PI + (i * 60);

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
