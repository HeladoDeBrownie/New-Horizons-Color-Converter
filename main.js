void function () {
    'use strict'

    function convert() {
        $('result').textContent = formatAcnhColor()
    }

    function formatAcnhColor() {
        return 'TODO'
    }

    var $ = document.getElementById.bind(document)

    $('color').addEventListener('input', convert)
    convert()
}()
