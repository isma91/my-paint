<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Paint Campus</title>
    <meta charset="utf-8" />
    <meta name="description" content="Montrer nous votre immagination et faites des dessins !!" />
    <link href="media/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="media/css/bootstrap.css.map" rel="stylesheet" type="text/css" />
    <link href="media/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css" />
    <link href="media/css/bootstrap-theme.css.map" rel="stylesheet" type="text/css" />
    <!--[if lt IE 9]>
<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>
<body>
    <div class="container">
        <h1>Bienvenue à Paint Campus !!!</h1>
        <canvas id="paint" width="1000" height="500" style='border:1px solid black'></canvas>
        <h2>Vos accesoires :</h2>
        <div class="jumbotron">
            <noscript>VOUS DEVEZ ACTIVER JAVASCRIPT SI IL VOUS PLAIT !! MERCI BEAUCOUP</noscript>
            <div class="selectedColor"></div>
            <br/>
            <label>La couleur du contour :</label>
            <input type="color" name="colorContour" id="colorContour" />
            <label>La couleur interne :</label>
            <input type="color" name="colorInterne" id="colorInterne" />
            <label>La couleur de l'ombre :</label>
            <input type="color" name="colorShadow" id="colorShadow" />
            <br/>
            <label>largeur du contour :</label>
            <div id="valueLargeur"></div>
            <input type="range" name="largeur" id="largeur" value="5" min="1" max="20" />
            <label>largeur de l'ombre :</label>
            <div id="valueShadow"></div>
            <input type="range" name="shadow" id="shadow" value="0" min="0" max="30" />
            <br/>
            <label>Rectangle creux:</label>
            <button id="rectangleCreux"><img src="media/icones/rectangleCreux.png" alt="un rectangle creux" /></button>
            <label>Rectangle plein:</label>
            <button id="rectanglePlein"><img src="media/icones/rectangleRempli.png" alt="un rectangle plein" /></button>
            <br/>
            <label>Un trait:</label>
            <button id="trait"><img src="media/icones/trait.jpg" alt="un trait" /></button>
            <label>Crayon:</label>
            <button id="crayon"><img src="media/icones/crayon.png" alt="un crayon" /></button>
            <br/>
            <label>Cercle creux:</label>
            <button id="cercleCreux"><img src="media/icones/cercleCreux.png" alt="un cercle creux" /></button>
            <label>Cercle plein:</label>
            <button id="cerclePlein"><img src="media/icones/cerclePlein.PNG" alt="un cercle rempli" /></button>
            <br/>
            <label>Gomme:</label>
            <button id="gomme"><img src="media/icones/gomme.png" alt="une gomme pour effacer" /></button>
            <br/>
            <label>Ajouter une image (mettre un url):</label>
            <input type="text" name="image" id="image" />
            <label>Dimension de l'image (en px) :</label>
            <select name="width" id="width">
                <?php
                for ($i=50; $i <= 500; $i = $i + 50) {
                    ?>
                    <option value='<?php echo $i;?>'><?php echo $i;?></option>
                    <?php
                }
                ?>
            </select>
            <select name="height" id="height">
                <?php
                for ($i=50; $i <= 500; $i = $i + 50) {
                    ?>
                    <option value='<?php echo $i;?>'><?php echo $i;?></option>
                    <?php
                }
                ?>
            </select>
            <input type="submit" name="valider" id="ajouter" value="Ajouter l'image" />
            <br/>
            <label>Faire un coeur *kawai desu ne*</label>
            <button id="coeur">&lt;3</button>
            <br/>
            <label>Ajouter du texte :</label>
            <input type="text" name="text" id="text" />
            <select id="font">
                <option value="Times New Roman">Times New Roman</option>
                <option value="Times">Times</option>
                <option value="Georgia">Georgia</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Verdana">Verdana</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Comic Sans MS">Shame on you if you use that font !!</option>
            </select>
            <br/>
            <label>Taille du text :</label>
            <div id="valueText"></div>
            <input type="range" name="tailleText" id="tailleText" value="10" min="10" max="50" />
            <input type="submit" name="validerText" value="Ajouter le text" id="validerText">
            <br/>
            <button id="erase">Effacer le dessin</button>
            <button id="save">Afficher le dessin dans une nouvelle page</button>
            <button id="resize">Agrandir ou reduire la taille du canvas</button>
            <button id="crop">CROP</button>
        </div>
    </div>
    <div id="picture" style="visibility: hidden;"></div>
    <div id="picturePaint" style="visibility: hidden;"></div>
    <script type="text/javascript" src="media/js/jquery-2.1.3.js"></script>
    <script type="text/javascript" src="media/js/paint.js"></script>
</body>
</html>