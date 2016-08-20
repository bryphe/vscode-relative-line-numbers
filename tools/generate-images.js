/**
 * Helper script to generate images used for relative line numbers
 */

"use strict";


for (var i = 0; i < 99; i++) {

    console.log("Generating image: " + i.toString())
    var page = require('webpage').create();
    page.viewportSize = { width: 20, height: 20 };
    page.clipRect = { top: 0, left: 0, width: 20, height: 20 };
    page.content = '<html><body><script>window.numberToRender="' + i.toString() + '";</script><canvas id="surface"></canvas></body></html>';
    page.evaluate(function () {
        var el = document.getElementById("surface");
        var context = el.getContext("2d");
        var width = window.innerWidth;
        var height = window.innerHeight;

        context.font = "14px Consolas";
        context.fillStyle = "rgb(100, 100, 100)";
        context.fillText(window.numberToRender, 4, 14);

        document.body.style.backgroundColor = "transparent";
        document.body.style.margin = "0px";
    });

    var imagePath = "images/" + i.toString() + ".png";
    page.render(imagePath);
    console.log(imagePath);
}

phantom.exit();