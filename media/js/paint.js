/*jslint browser: true, node : true*/
/*jslint devel : true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
    var canvas, context, colorContour, colorInterne, colorShadow, largeur, shadow, pos, type, trait, rectangleCreux, rectanglePlein, cercleCreux, cerclePlein, url, departClique, departMove, image, picture, sizeText, font, styleText, resize, crop, canvasPaint, urlPaint, browser, whichBrowser;
    colorContour = document.getElementById('colorContour').value;
    colorInterne = document.getElementById('colorInterne').value;
    largeur = document.getElementById('largeur').value;
    canvas = document.getElementById('paint');
    context = canvas.getContext('2d');
    pos = $('canvas#paint').offset();
    trait = [];
    rectangleCreux = [];
    rectanglePlein = [];
    cercleCreux = [];
    cerclePlein = [];
    resize = [];
    crop = [];
    departClique = false;
    departMove = false;
    browser = navigator.userAgent;
    whichBrowser = browser.match(/Firefox/);
    $('input#colorContour').change(function () {
        colorContour = document.getElementById('colorContour').value;
    });
    $('input#colorInterne').change(function () {
        colorInterne = document.getElementById('colorInterne').value;
    });
    $('input#colorShadow').change(function () {
        colorShadow = document.getElementById('colorShadow').value;
    });
    $('input#largeur').change(function () {
        largeur = document.getElementById('largeur').value;
        $('div#valueLargeur').html(largeur);
    });
    $('input#shadow').change(function () {
        shadow = document.getElementById('shadow').value;
        $('div#valueShadow').html(shadow);
    });
    $('select#font').change(function () {
        font = document.getElementById('font').value;
    });
    $('input#tailleText').change(function () {
        sizeText = document.getElementById('tailleText').value + "px";
        $('div#valueText').html(sizeText);
    });
    $('input#ajouter').click(function () {
        type = 'image';
        image = document.getElementById('image').value;
        picture = new Image(document.getElementById('width').value, document.getElementById('height').value);
        picture.src = image;
        $('div#picture').html(picture);
    });
    $('input#validerText').click(function () {
        type = 'text';
    });
    $('button#trait').click(function () {
        type = 'trait';
    });
    $('button#rectangleCreux').click(function () {
        type = 'rectangleCreux';
    });
    $('button#rectanglePlein').click(function () {
        type = 'rectanglePlein';
    });
    $('button#cercleCreux').click(function () {
        type = 'cercleCreux';
    });
    $('button#cerclePlein').click(function () {
        type = 'cerclePlein';
    });
    $('button#crayon').click(function () {
        type = 'crayon';
    });
    $('button#gomme').click(function () {
        type = 'gomme';
    });
    $('button#coeur').click(function () {
        type = 'coeur';
    });
    $('button#resize').click(function () {
        type = 'resize';
    });
    $('button#crop').click(function () {
        if (whichBrowser !== null) {
            alert('Vous ne pouvez pas utiliser cette fonctionnalité car vous êtes sur Firefox !!');
            type = '';
        } else {
            type = 'crop';
            canvasPaint = new Image(context.canvas.width, context.canvas.height);
            urlPaint = canvas.toDataURL("image/png", 1.0);
            canvasPaint.src = urlPaint;
            $('div#picturePaint').html(canvasPaint);
        }
    });
    $('button#erase').click(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
    $('button#save').click(function () {
        url = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        window.location.href = url;
    });
    $('canvas#paint').on("mousedown", function () {
        if (type === 'crayon' || type === 'gomme') {
            departClique = true;
        }
    });
    $('canvas#paint').on("mouseup", function () {
        if (type === 'crayon' || type === 'gomme') {
            departClique = false;
            departMove = false;
        }
    });
    $('canvas#paint').click(function (event) {
        if (type === 'trait') {
            trait.push(event.pageX - pos.left, event.pageY - pos.top);
            context.beginPath();
            context.shadowBlur = shadow;
            context.shadowColor = colorShadow;
            context.moveTo(trait[0], trait[1]);
            context.lineTo(trait[2], trait[3]);
            context.strokeStyle = colorInterne;
            context.lineWidth = largeur;
            context.stroke();
        }
        if (trait.length >= 4) {
            trait = [];
        }
        if (type === 'rectangleCreux') {
            rectangleCreux.push(event.pageX - pos.left, event.pageY - pos.top);
            context.beginPath();
            context.shadowBlur = shadow;
            context.shadowColor = colorShadow;
            context.rect(rectangleCreux[0], rectangleCreux[1], (rectangleCreux[2] - rectangleCreux[0]), (rectangleCreux[3] - rectangleCreux[1]));
            context.strokeStyle = colorContour;
            context.lineWidth = largeur;
            context.stroke();
        }
        if (rectangleCreux.length >= 3) {
            rectangleCreux = [];
        }
        if (type === 'rectanglePlein') {
            rectanglePlein.push(event.pageX - pos.left, event.pageY - pos.top);
            context.beginPath();
            context.shadowBlur = shadow;
            context.shadowColor = colorShadow;
            context.fillRect(rectanglePlein[0], rectanglePlein[1], (rectanglePlein[2] - rectanglePlein[0]), (rectanglePlein[3] - rectanglePlein[1]));
            context.fillStyle = colorInterne;
            context.strokeStyle = colorContour;
            context.lineWidth = largeur;
            context.stroke();
        }
        if (rectanglePlein.length >= 3) {
            rectanglePlein = [];
        }
        if (type === 'cercleCreux') {
            cercleCreux.push(event.pageX - pos.left, event.pageY - pos.top);
            context.beginPath();
            if (cercleCreux[0] > cercleCreux[2]) {
                context.shadowBlur = shadow;
                context.shadowColor = colorShadow;
                context.arc(cercleCreux[0], cercleCreux[1], Math.sqrt(Math.pow(cercleCreux[0] - cercleCreux[2], 2) + Math.pow(cercleCreux[1] - cercleCreux[3], 2)), 0, 2 * Math.PI);
                context.strokeStyle = colorContour;
                context.lineWidth = largeur;
                context.stroke();
            } else {
                context.shadowBlur = shadow;
                context.shadowColor = colorShadow;
                context.arc(cercleCreux[0], cercleCreux[1], Math.sqrt(Math.pow(cercleCreux[2] - cercleCreux[0], 2) + Math.pow(cercleCreux[3] - cercleCreux[1], 2)), 0, 2 * Math.PI);
                context.strokeStyle = colorContour;
                context.lineWidth = largeur;
                context.stroke();
            }
        }
        if (cercleCreux.length >= 3) {
            cercleCreux = [];
        }
        if (type === 'cerclePlein') {
            cerclePlein.push(event.pageX - pos.left, event.pageY - pos.top);
            context.beginPath();
            if (cerclePlein[0] > cerclePlein[2]) {
                context.shadowBlur = shadow;
                context.shadowColor = colorShadow;
                context.arc(cerclePlein[0], cerclePlein[1], Math.sqrt(Math.pow(cerclePlein[0] - cerclePlein[2], 2) + Math.pow(cerclePlein[1] - cerclePlein[3], 2)), 0, 2 * Math.PI);
                context.fill();
                context.fillStyle = colorInterne;
                context.strokeStyle = colorContour;
                context.lineWidth = largeur;
                context.stroke();
            } else {
                context.shadowBlur = shadow;
                context.shadowColor = colorShadow;
                context.arc(cerclePlein[0], cerclePlein[1], Math.sqrt(Math.pow(cerclePlein[2] - cerclePlein[0], 2) + Math.pow(cerclePlein[3] - cerclePlein[1], 2)), 0, 2 * Math.PI);
                context.fill();
                context.fillStyle = colorInterne;
                context.strokeStyle = colorContour;
                context.lineWidth = largeur;
                context.stroke();
            }
        }
        if (cerclePlein.length >= 3) {
            cerclePlein = [];
        }
        if (type === 'image') {
            context.beginPath();
            context.shadowBlur = shadow;
            context.shadowColor = colorShadow;
            context.drawImage(document.getElementById('picture').children[0], event.pageX - pos.left, event.pageY - pos.top, document.getElementById('width').value, document.getElementById('height').value);
        }
        if (type === 'crop') {
            crop.push(event.pageX - pos.left, event.pageY - pos.top);
        }
        if (crop.length > 3) {
            context.canvas.width = crop[2] - crop[0];
            context.canvas.height = crop[3] - crop[1];
            context.drawImage(document.getElementById('picturePaint').children[0], crop[0], crop[1], crop[2] - crop[0], crop[3] - crop[1], 0, 0, crop[2] - crop[0], crop[3] - crop[1]);
            crop = [];
            type = '';
        }
        if (type === 'coeur') {
            context.beginPath();
            context.shadowBlur = shadow;
            context.shadowColor = colorShadow;
            context.moveTo(event.pageX - pos.left, event.pageY - pos.top);
            context.bezierCurveTo((event.pageX - pos.left), (event.pageY - pos.top - 3), (event.pageX - pos.left - 5), (event.pageY - pos.top - 15), (event.pageX - pos.left - 25), (event.pageY - pos.top - 15));
            context.bezierCurveTo((event.pageX - pos.left - 55), (event.pageY - pos.top - 15), (event.pageX - pos.left - 55), (event.pageY - pos.top + 22.5), (event.pageX - pos.left - 55), (event.pageY - pos.top + 22));
            context.bezierCurveTo((event.pageX - pos.left - 55), (event.pageY - pos.top + 40), (event.pageX - pos.left - 35), (event.pageY - pos.top + 62), (event.pageX - pos.left), (event.pageY - pos.top + 80));
            context.bezierCurveTo((event.pageX - pos.left + 35), (event.pageY - pos.top + 62), (event.pageX - pos.left + 55), (event.pageY - pos.top + 40), (event.pageX - pos.left + 55), (event.pageY - pos.top + 22));
            context.bezierCurveTo((event.pageX - pos.left + 55), (event.pageY - pos.top + 22), (event.pageX - pos.left + 55), (event.pageY - pos.top - 15), (event.pageX - pos.left + 25), (event.pageY - pos.top - 15));
            context.bezierCurveTo((event.pageX - pos.left + 10), (event.pageY - pos.top - 15), (event.pageX - pos.left), (event.pageY - pos.top - 3), (event.pageX - pos.left), (event.pageY - pos.top));
            context.fillStyle = colorInterne;
            context.strokeStyle = colorContour;
            context.lineWidth = largeur;
            context.fill();
            context.stroke();
        }
        if (type === 'text') {
            styleText = sizeText + " " + font;
            context.font = styleText;
            context.shadowBlur = shadow;
            context.shadowColor = colorShadow;
            context.fillStyle = colorInterne;
            context.strokeStyle = colorContour;
            context.fill();
            context.fillText(document.getElementById('text').value, event.pageX - pos.left, event.pageY - pos.top);
        }
    });
    $('canvas#paint').on("mousemove", function (event) {
        if (type === 'crayon' || type === 'gomme') {
            if (departClique === true) {
                if (departMove === false) {
                    context.beginPath();
                    context.moveTo(event.pageX - pos.left, event.pageY - pos.top);
                    departMove = true;
                } else {
                    context.lineTo(event.pageX - pos.left, event.pageY - pos.top);
                    if (type === 'crayon') {
                        context.shadowBlur = shadow;
                        context.shadowColor = colorShadow;
                        context.strokeStyle = colorInterne;
                        context.lineWidth = largeur;
                    }
                    if (type === 'gomme') {
                        context.shadowBlur = 0;
                        context.shadowColor = colorShadow;
                        context.strokeStyle = '#ffffff';
                        context.lineWidth = largeur;
                    }
                    context.stroke();
                }
            }
        }
    });
    $(document).click(function (event) {
        if (type === 'resize') {
            resize.push(event.pageX, event.pageY);
            if (resize[2] < resize[4]) {
                context.canvas.width = resize[4] - resize[2];
            }
            if (resize[4] < resize[2]) {
                context.canvas.width = resize[2] - resize[4];
            }
            if (resize[3] < resize[5]) {
                context.canvas.height = resize[5] - resize[3];
            }
            if (resize[5] < resize[3]) {
                context.canvas.height = resize[3] - resize[5];
            }
            if (resize.length >= 6) {
                resize = [];
                type = "";
            }
        }
    });
});