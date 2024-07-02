document.addEventListener("DOMContentLoaded", (event) => {
    const wheel = document.getElementById('wheel');
    const containerwheel = document.getElementById('containerwheel');
    const opt1 = document.getElementById('opt1');
    const opt2 = document.getElementById('opt2');
    const flecha = document.getElementById('flecha');
    const evalP = document.getElementById('evalP');
    const eval = document.getElementById('eval');
    const optImg1 = document.getElementById('optImg1');
    const bienvenida = document.getElementById('bienvenida');
    const centerCont = document.getElementById('centerCont');
    const bienvenidaP = document.getElementById('bienvenidaP');
    const saltarBtn = document.getElementById('saltarBtn');
    const cartaContainer = document.getElementById('cartaContainer');
    const optImg2 = document.getElementById('optImg2');
    const Q = document.getElementById('Q');
    const chargBar1 = document.getElementById('chargBar1');
    const sobre = document.getElementById('sobre');
    const chargBar2 = document.getElementById('chargBar2');
    let isDragging = false;
    var startAngle = 90;
    var currentAngle = 90;

    wheel.style.transform = `rotate(90deg)`;

    //TODO BIENVENIDA
    setTimeout(() => {
        bienvenidaP.style.opacity = "1"
        setTimeout(() => {
            bienvenidaP.style.opacity = "0"
            setTimeout(() => {
                bienvenidaP.innerHTML = "Primero que nada quiero felicitarte y agradecerte por todo lo que haces por nosotros. Te hice esta página con mucho cariño.<br><br> <span style='font-size: 2vh; opacity: 0.6'>INSTRUCCIONES:<br> Gira el volante en la dirección de la respuesta correcta y al final te espera una carta</span>"
                bienvenidaP.style.fontFamily = "f1"
                bienvenidaP.style.width = "70vh"
                bienvenidaP.style.display = "flex"
                
                bienvenidaP.style.flexDirection = "column"

                bienvenidaP.style.fontSize = "3vh"
                bienvenidaP.style.opacity = "1"

                setTimeout(() => {
                    saltarBtn.style.display = "flex"
                    setTimeout(() => {
                        saltarBtn.style.opacity = "1"

                        saltarBtn.addEventListener("click", function () {
                            document.addEventListener('touchstart', handleTouchStart);
                            bienvenida.style.transition = "opacity linear 3s"
                            bienvenidaP.style.opacity = "0"
                            saltarBtn.style.opacity = "0"

                            setTimeout(() => {
                                bienvenida.style.opacity = "0"

                                setTimeout(() => {
                                    bienvenida.style.display = "none"
                                    saltarBtn.style.display = "none"
                                }, 3050);
                            }, 1050);
                        });
                    }, 100);
                }, 3000);

            }, 1000);
        }, 2000);
    }, 600);

    //TODO TERMINA BIENVENIDA





    function handleTouchStart(e) {
        isDragging = true;
        startAngle = getAngle(e.touches[0]);
    }

    document.removeEventListener('touchstart', handleTouchStart);

    var preguntaResp = 1

    var direction = null;
    var timer = null;

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        let angle = getAngle(e.touches[0]);
        let rotation = angle - startAngle + currentAngle;
        wheel.style.transform = `rotate(${rotation}deg)`;

        let newDirection = angleDifference(startAngle, angle) > 0 ? 'Derecha' : 'Izquierda';
        let normalizedRotation = ((rotation % 360) + 360) % 360; // Normalizar el ángulo entre 0 y 360

        // Verificar si el volante está en la posición neutra (cerca de 90 grados)
        if (normalizedRotation >= 85 && normalizedRotation <= 95) {
            newDirection = 'Centro'
            containerwheel.style.backgroundImage = "url('assets/rb18.gif')";
            flecha.style.transform = "rotate(0deg)"
            chargBar1.style.height = "0vh"
            chargBar2.style.height = "0vh"

            chargBar2.classList.remove("lento");
            chargBar2.classList.add("rapido");
            chargBar1.classList.remove("lento");
            chargBar1.classList.add("rapido");

            opt1.style.transform = "scale(1) rotate(90deg)"
            opt2.style.transform = "scale(1) rotate(90deg)"
        } else if (newDirection === 'Derecha') {
            containerwheel.style.backgroundImage = "url('assets/turnR.gif')";
            flecha.style.transform = "rotate(90deg)"
            chargBar2.style.height = "16vh"
            chargBar2.classList.add("lento");
            chargBar1.classList.remove("lento");
            chargBar1.classList.add("rapido");
            chargBar1.style.height = "0vh"
            opt2.style.transform = "scale(1.1) rotate(90deg)"
            opt1.style.transform = "scale(1) rotate(90deg)"
        } else {
            containerwheel.style.backgroundImage = "url('assets/turnL.gif')";
            flecha.style.transform = "rotate(-90deg)"
            chargBar1.style.height = "16vh"
            chargBar2.style.height = "0vh"
            chargBar1.classList.add("lento");
            chargBar2.classList.remove("lento");
            chargBar2.classList.add("rapido");
            opt1.style.transform = "scale(1.1) rotate(90deg)"
            opt2.style.transform = "scale(1) rotate(90deg)"
        }

        // Si hay un cambio de dirección, reiniciar el temporizador
        if (newDirection !== direction) {
            direction = newDirection;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                console.log(`Opción seleccionada: ${direction}`);
                switch(preguntaResp){
                    case 1:
                        if(direction=="Izquierda"){
                            console.log("Correcta")
                            eval.style.backgroundColor = "#40c146"
                            evalP.innerHTML = "CORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            Q.innerHTML = "¿Cuántos títulos mundiales ganó Ayrton Senna durante su carrera en la Fórmula 1?"
                            optImg2.src = "assets/3.png"
                            optImg1.src = "assets/4.png"


                            reiniciar()
                            preguntaResp++
                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        } else if (direction == "Derecha"){
                            eval.style.backgroundColor = "#c02534"
                            evalP.innerHTML = "INCORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            reiniciar()

                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        }
                        break

                    //TODO PREGUNTA 2

                    case 2:
                        if (direction == "Izquierda") {
                            eval.style.backgroundColor = "#c02534"
                            evalP.innerHTML = "INCORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            reiniciar()

                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);

                        } else if (direction == "Derecha") {
                            console.log("Correcta")
                            eval.style.backgroundColor = "#40c146"
                            evalP.innerHTML = "CORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            Q.innerHTML = "¿Qué piloto tiene el récord de más pole positions en la historia de la Fórmula 1?"
                            optImg1.src = "assets/MS.png"
                            optImg2.src = "assets/LH.png"


                            reiniciar()
                            preguntaResp++
                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        }
                        break 

                    //TODO PREGUNTA 3

                    case 3:
                        if (direction == "Izquierda") {
                            eval.style.backgroundColor = "#c02534"
                            evalP.innerHTML = "INCORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            reiniciar()

                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);

                        } else if (direction == "Derecha") {
                            console.log("Correcta")
                            eval.style.backgroundColor = "#40c146"
                            evalP.innerHTML = "CORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            Q.innerHTML = "¿Qué color predominante suelen tener los neumáticos intermedios de lluvia en la Fórmula 1?"
                            optImg1.src = "assets/interm.png"
                            optImg2.src = "assets/fullwet.png"


                            reiniciar()
                            preguntaResp++
                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        }
                        break      

                        //TODO PREGUNTA 4

                    case 4:
                        if (direction == "Izquierda") {
                            console.log("Correcta")
                            eval.style.backgroundColor = "#40c146"
                            evalP.innerHTML = "CORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            Q.innerHTML = "¿Cuántos puntos se otorgan al piloto que finaliza en la primera posición en una carrera de Fórmula 1?"
                            optImg1.src = "assets/20pts.png"
                            optImg2.src = "assets/25pts.png"


                            reiniciar()
                            preguntaResp++
                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        } else if (direction == "Derecha") {
                            eval.style.backgroundColor = "#c02534"
                            evalP.innerHTML = "INCORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            reiniciar()

                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        }
                        break      

                        //TODO PREGUNTA 5 EVALUACION

                    case 5:
                        if (direction == "Izquierda") {
                            eval.style.backgroundColor = "#c02534"
                            evalP.innerHTML = "INCORRECTO"

                            eval.style.display = "flex"
                            eval.style.opacity = "1"

                            reiniciar()

                            setTimeout(() => {
                                eval.style.opacity = "0"
                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 2000);
                        } else if (direction == "Derecha") {
                            document.removeEventListener('touchstart', handleTouchStart);

                            console.log("Correcta")
                            eval.style.backgroundColor = "#DE011A"
                            evalP.innerHTML = "Felicidades!"

                            Q.innerHTML = "Haz clic en el sobre para abrirlo"
                            
                            eval.style.display = "flex"
                            imgP.style.display = "flex"
                            eval.style.opacity = "1"
                            imgP.style.opacity = "1"

                            cartaContainer.style.display = "flex"

                            reiniciar()
                            preguntaResp++

                            setTimeout(() => {
                                eval.style.opacity = "0"
                                cartaContainer.style.opacity = "1"

                                setTimeout(() => {
                                    eval.style.display = "none"
                                }, 1000);
                            }, 4000);
                        }
                        break      
                }
            }, 3000);
        }

        console.log(`Girando hacia la: ${newDirection}`);
        console.log(`Angulo: ${normalizedRotation}`);
    });

    function reiniciar(){
        flecha.style.transform = "rotate(0deg)"
        wheel.style.transform = `rotate(90deg)`;
        startAngle = 90;
        currentAngle = 90;
        rotation = 90;
        direction = null;
        normalizedRotation = 90;
        chargBar2.classList.remove("lento");
        chargBar2.classList.add("rapido");
        chargBar1.classList.remove("lento");
        chargBar1.classList.add("rapido");
        chargBar1.style.height = "0vh"
        chargBar2.style.height = "0vh"
    }

    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        currentAngle += angleDifference(startAngle, getAngle(e.changedTouches[0]));
        isDragging = false;
    });


    const handleClick = (e) => {
        Q.style.opacity = "0";
        setTimeout(() => {
            Q.style.display = "none";
        }, 1000);
        sobre.removeEventListener('click', handleClick);
        console.log("Event listener removido");
        sobre.style.backgroundImage = "url('assets/sobre.gif')";
        setTimeout(() => {
            sobre.style.backgroundImage = "url('assets/sobreabierto.png')";
            centerCont.style.display = "flex";
            centerCont.scrollLeft = centerCont.scrollWidth - centerCont.clientWidth;
            setTimeout(() => {
                centerCont.style.transform = "scale(1)";
            }, 100);
        }, 790);
    };

    sobre.addEventListener('click', handleClick);


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
    
    function cerrarCarta() {
        centerCont.style.transform = "scale(0.01)"
        setTimeout(() => {
            sobre.addEventListener('click', handleClick);
            centerCont.style.display = "none"
            sobre.style.backgroundImage = "url('assets/sobrestatic.png')";
        }, 1000);
    }

    pB1 = 0;
    pB2 = 0;
    pB3 = 0;
    pB4 = 0;

    function verPolaroid(numero) {
        switch(numero){
            case 1:
                if (pB1 == 0) {
                    pB1 = 1
                    console.log("Polaroid1")
                    document.getElementById('polaroid1').style.transform = "rotate(-3deg) scale(2)"
                    document.getElementById('polaroid1').style.top = "unset"
                    document.getElementById('polaroid1').style.right = "unset"
                    document.getElementById('polaroid1').style.zIndex = "unset"
                } else {
                    pB1 = 0
                    document.getElementById('polaroid1').style.cssText = "z-index: -1; width: 20vh; position: absolute; transform: rotate(10deg); transition: ease 1s;";
                    setTimeout(() => {
                        document.getElementById('polaroid1').style.cssText = "z-index: -1; width: 20vh; position: absolute; top: 5vh; right: 5vh; transform: rotate(10deg); transition: ease 1s;";
                    }, 1000);
                }
                break

            case 2:
                if (pB2 == 0) {
                    pB2 = 1
                    console.log("Polaroid2")
                    document.getElementById('polaroid2').style.transform = "rotate(4deg) scale(2)"
                    document.getElementById('polaroid2').style.top = "unset"
                    document.getElementById('polaroid2').style.left = "unset"
                    document.getElementById('polaroid2').style.zIndex = "unset"
                } else {
                    pB2 = 0
                    document.getElementById('polaroid2').style.cssText = "z-index: -1; width: 20vh; position: absolute; transform: rotate(-10deg); transition: ease 1s;";
                    setTimeout(() => {
                        document.getElementById('polaroid2').style.cssText = "z-index: -1; width: 20vh; position: absolute; top: 5vh; left: 5vh; transform: rotate(-10deg); transition: ease 1s;";
                    }, 1000);
                }
                break

            case 3:
                if (pB3 == 0) {
                    pB3 = 1
                    console.log("polaroid3")
                    document.getElementById('polaroid3').style.transform = "rotate(-2deg) scale(2)"
                    document.getElementById('polaroid3').style.bottom = "unset"
                    document.getElementById('polaroid3').style.right = "unset"
                    document.getElementById('polaroid3').style.zIndex = "unset"
                } else {
                    pB3 = 0
                    document.getElementById('polaroid3').style.cssText = "z-index: -1; width: 20vh; position: absolute; transform: rotate(10deg); transition: ease 1s;";
                    setTimeout(() => {
                        document.getElementById('polaroid3').style.cssText = "z-index: -1; width: 20vh; position: absolute; bottom: 5vh; right: 5vh; transform: rotate(10deg); transition: ease 1s;";
                    }, 1000);
                }
                break

            case 4:
                if (pB4 == 0) {
                    pB4 = 1
                    console.log("polaroid4")
                    document.getElementById('polaroid4').style.transform = "rotate(2deg) scale(2)"
                    document.getElementById('polaroid4').style.bottom = "unset"
                    document.getElementById('polaroid4').style.left = "unset"
                    document.getElementById('polaroid4').style.zIndex = "unset"
                } else {
                    pB4 = 0
                    document.getElementById('polaroid4').style.cssText = "z-index: -1; width: 20vh; position: absolute; transform: rotate(-10deg); transition: ease 1s;";
                    setTimeout(() => {
                        document.getElementById('polaroid4').style.cssText = "z-index: -1; width: 20vh; position: absolute; bottom: 5vh; left: 5vh; transform: rotate(-10deg); transition: ease 1s;";
                    }, 1000);
                }
                break
        }
    }

    document.getElementById('polaroid1').addEventListener("click", () => verPolaroid(1));
    document.getElementById('polaroid2').addEventListener("click", () => verPolaroid(2));
    document.getElementById('polaroid3').addEventListener("click", () => verPolaroid(3));
    document.getElementById('polaroid4').addEventListener("click", () => verPolaroid(4));


    const cerrarBtn = document.getElementById('cerrarBtn'); // Asegúrate de que el ID sea correcto
    if (cerrarBtn) {
        cerrarBtn.addEventListener("click", cerrarCarta);
    }
});


