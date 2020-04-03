void function () {
    'use strict'

    function render() {
        $('result').textContent = convert($('color').value)
    }

    function convert(hexString) {
        return formatAcnhColor(acnhColorFromHsvColor(hsvColorFromRgbColor(rgbColorFromHexString(hexString))))
    }

    function rgbColorFromHexString(hexString) {
        var match = /\#(..)(..)(..)/.exec(hexString)

        return {
            red:    parseInt(match[1], 16),
            green:  parseInt(match[2], 16),
            blue:   parseInt(match[3], 16),
        }
    }

    function hsvColorFromRgbColor(rgbColor) {
        // Algorithm adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB

        var red = rgbColor.red / 255
        var green = rgbColor.green / 255
        var blue = rgbColor.blue / 255

        var value = Math.max(red, green, blue)
        var chroma = value - Math.min(red, green, blue)

        var hue =
            chroma == 0     ? 0 :
            value == red    ? 60 * (0 + (green - blue) / chroma) :
            value == green  ? 60 * (2 + (blue - red) / chroma) :
                              60 * (4 + (red - green) / chroma)

        var saturation = value == 0 ? 0 : chroma / value

        return {
            hue:        normalizeAngle(hue),
            saturation: saturation,
            value:      value,
        }
    }

    function normalizeAngle(degrees) {
        if (degrees < 0) {
            return normalizeAngle(degrees + 360)
        } else if (degrees >= 360) {
            return normalizeAngle(degrees - 360)
        } else {
            return degrees
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
