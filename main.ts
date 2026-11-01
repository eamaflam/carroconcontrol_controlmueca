let ordenActual = ""
let y = 0
let orden = ""
// ============================================================
// CONTROL  -  micro:bit en tu mano
// Inclinar hacia el frente  -> avanzar
// Inclinar hacia atrás      -> reversa
// Botón A                   -> izquierda
// Botón B                   -> derecha
// A + B juntos o soltar todo -> alto
// ============================================================
// debe ser el mismo número en el carro
let GRUPO = 60
// sensibilidad de la inclinación (más bajo = más sensible; 1024 = 90°)
let UMBRAL = 500
radio.setGroup(GRUPO)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
    orden = "alto"
    y = input.acceleration(Dimension.Y)
    if (input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)) {
        orden = "alto"
    } else if (input.buttonIsPressed(Button.A)) {
        orden = "izquierda"
    } else if (input.buttonIsPressed(Button.B)) {
        orden = "derecha"
    } else if (y < 0 - UMBRAL) {
        orden = "avanzar"
    } else if (y > UMBRAL) {
        orden = "reversa"
    }
    // Se envía cada 100 ms; el carro se detiene si deja de recibir.
    radio.sendString(orden)
    if (orden != ordenActual) {
        ordenActual = orden
        if (orden == "avanzar") {
            basic.showArrow(ArrowNames.North)
        } else if (orden == "reversa") {
            basic.showArrow(ArrowNames.South)
        } else if (orden == "izquierda") {
            basic.showArrow(ArrowNames.West)
        } else if (orden == "derecha") {
            basic.showArrow(ArrowNames.East)
        } else {
            basic.showIcon(IconNames.No)
        }
    }
    basic.pause(100)
})
