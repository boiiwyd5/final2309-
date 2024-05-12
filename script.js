document.addEventListener('DOMContentLoaded', function () {
    const wheelCanvas = document.getElementById('wheelCanvas');
    const ctx = wheelCanvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');
    const emailInput = document.getElementById('emailInput');
    const usedEmails = new Set(); // To track used emails

    const segments = [
        '10% Off', 'Free Class', 'One Free PT Session', 'Free Towel',
        '5% Off', 'Free Water Bottle', '15% Off', '20% Off Membership'
    ];

    function drawWheel() {
        const numSegments = segments.length;
        const angleStep = 2 * Math.PI / numSegments;
        const radius = wheelCanvas.width / 2;

        segments.forEach((seg, index) => {
            ctx.beginPath();
            ctx.fillStyle = index % 2 === 0 ? '#ffd700' : '#ff6347';
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, index * angleStep, (index + 1) * angleStep);
            ctx.lineTo(radius, radius);
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(index * angleStep + angleStep / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.fillText(seg, radius - 10, 0);
            ctx.restore();
        });
    }

    drawWheel();

    function spin() {
        const email = emailInput.value;
        if (!email || usedEmails.has(email)) {
            alert('Please enter a valid email or new email address.');
            return;
        }

        usedEmails.add(email);

        let currentRotation = 0;
        const randomSpin = Math.floor(3600 + Math.random() * 360);

        const spinAnimation = setInterval(function () {
            currentRotation += 30; // Rotate 30 degrees every frame
            wheelCanvas.style.transform = `rotate(${currentRotation % 360}deg)`;

            if (currentRotation >= randomSpin) {
                clearInterval(spinAnimation);
                const winningSegment = segments[Math.floor(randomSpin / 360) % segments.length];
                alert('You won: ' + winningSegment);
                // Here you would typically send the winning promo to the user's email
            }
        }, 20);
    }

    spinButton.addEventListener('click', spin);
});


