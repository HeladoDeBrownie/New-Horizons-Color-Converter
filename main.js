void function () {
    'use strict'

    function render(colorString) {
        var acnhColor = convert(colorString)

        if (acnhColor === null) {
            $('hue').textContent = $('vividness').textContent = $('brightness').textContent = ''
        } else {
            $('hue').textContent = acnhColor.hue
            $('vividness').textContent = acnhColor.saturation
            $('brightness').textContent = acnhColor.value
        }
    }

    function convert(hexString) {
        var rgbColor = rgbColorFromHexString(hexString)
        return rgbColor === null ? null : acnhColorFromHsvColor(hsvColorFromRgbColor(rgbColor))
    }

    function rgbColorFromHexString(hexString) {
        var match = /\#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(hexString)

        return match === null ? null : {
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
        var unnormalizedHue = Math.round(hsvColor.hue / 12)
        return {
            hue:        unnormalizedHue == 30 ? 0 : unnormalizedHue,
            saturation: Math.round(hsvColor.saturation * 14),
            value:      Math.round(hsvColor.value * 14),
        }
    }

    function normalizeColorString(colorString) {
        return '#' + colorString.replace(/^\#/, '').toLowerCase()
    }

    var $ = document.getElementById.bind(document)

    $('color-text').addEventListener('input', function () {
        $('color-color').value = normalizeColorString(this.value)
        render(this.value)
    })

    $('color-color').addEventListener('input', function () {
        $('color-text').value = this.value
        render(this.value)
    })

    $('color-color').value = normalizeColorString($('color-text').value)
    render($('color-text').value)
}()
