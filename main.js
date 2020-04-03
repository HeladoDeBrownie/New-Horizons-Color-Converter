void function () {
    'use strict'

    function render() {
        $('result').textContent = convert($('color').value)
    }

    function convert(hexString) {
        return formatAcnhColor(acnhColorFromHsvColor(hsvColorFromRgbColor(rgbColorFromHexString(hexString))))
    }

    function rgbColorFromHexString(hexString) {
        // TODO
        return {
            red: 0,
            green: 0,
            blue: 0,
        }
    }

    function hsvColorFromRgbColor(rgbColor) {
        // TODO
        return {
            hue: 0,
            saturation: 0,
            value: 0,
        }
    }

    function acnhColorFromHsvColor(hsvColor) {
        // TODO
        return {
            hue: 0,
            saturation: 0,
            value: 0,
        }
    }

    function formatAcnhColor(acnhColor) {
        return 'Hue: ' + String(acnhColor.hue) + '\nSaturation: ' + String(acnhColor.saturation) + '\nValue: ' + String(acnhColor.value)
    }

    var $ = document.getElementById.bind(document)

    $('color').addEventListener('input', render)
    render()
}()
