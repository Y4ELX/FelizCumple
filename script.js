document.addEventListener("DOMContentLoaded", (event) => {
    const wheel = document.getElementById('wheel');
    const containerwheel = document.getElementById('containerwheel');
    const opt1 = document.getElementById('opt1');
    const opt2 = document.getElementById('opt2');
    const flecha = document.getElementById('flecha');
    let isDragging = false;
    let startAngle = 90;
    let currentAngle = 90;

    wheel.style.transform = `rotate(90deg)`;

    document.addEventListener('touchstart', (e) => {
        isDragging = true;
        startAngle = getAngle(e.touches[0]);
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        let angle = getAngle(e.touches[0]);
        let rotation = angle - startAngle + currentAngle;
        wheel.style.transform = `rotate(${rotation}deg)`;

        // Imprimir dirección del giro en la consola
        let direction = angleDifference(startAngle, angle) > 0 ? 'Derecha' : 'Izquierda';
        let normalizedRotation = ((rotation % 360) + 360) % 360; // Normalizar el ángulo entre 0 y 360

        // Verificar si el volante está en la posición neutra (cerca de 90 grados)
        if (normalizedRotation >= 85 && normalizedRotation <= 95) {
            containerwheel.style.backgroundImage = "url('assets/rb18.gif')";
        } else if (direction === 'Derecha') {
            containerwheel.style.backgroundImage = "url('assets/turnR.gif')";
            flecha.style.transform = "rotate(90deg)"
            opt2.style.transform = "scale(1.1) rotate(90deg)"
            opt1.style.transform = "scale(1) rotate(90deg)"
        } else {
            containerwheel.style.backgroundImage = "url('assets/turnL.gif')";
            flecha.style.transform = "rotate(-90deg)"
            opt1.style.transform = "scale(1.1) rotate(90deg)"
            opt2.style.transform = "scale(1) rotate(90deg)"
        }

        console.log(`Girando hacia la: ${direction}`);
        console.log(`Angulo: ${normalizedRotation}`);
    });

    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        currentAngle += angleDifference(startAngle, getAngle(e.changedTouches[0]));
        isDragging = false;
    });

    function getAngle(touch) {
        let rect = wheel.getBoundingClientRect();
        let centerX = rect.left + rect.width / 2;
        let centerY = rect.top + rect.height / 2;
        let deltaX = touch.clientX - centerX;
        let deltaY = touch.clientY - centerY;
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    }

    function angleDifference(startAngle, endAngle) {
        let difference = endAngle - startAngle;
        if (difference > 180) {
            difference -= 360;
        } else if (difference < -180) {
            difference += 360;
        }
        return difference;
    }
>>>>>>> bf1b9d8dca85bd7ac0155d5bb6f77331ab23086c
});