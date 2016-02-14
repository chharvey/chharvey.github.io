<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Limits Test Answers</title>
    meta(name="viewport" content="width=device-width, initial-scale=1")
<link rel="stylesheet" href="images/limstyles.css"/>
</head>

<body>
<h1>Limits Test Answers</h1>
<h6 class="-ta-c"><a href="intro.html">Site Map</a></h6>
<?php
$yourscore = 0;
$totalscore=0;

$OneAl = $_POST['OneAl'];
$OneBl = $_POST['OneBl'];
$OneCl = $_POST['OneCl'];
$OneDl = $_POST['OneDl'];
$OneEl = $_POST['OneEl'];
$OneFl = $_POST['OneFl'];
$OneGl = $_POST['OneGl'];

$OneAr = $_POST['OneAr'];
$OneBr = $_POST['OneBr'];
$OneCr = $_POST['OneCr'];
$OneDr = $_POST['OneDr'];
$OneEr = $_POST['OneEr'];
$OneFr = $_POST['OneFr'];
$OneGr = $_POST['OneGr'];

$OneA = $_POST['OneA'];
$OneB = $_POST['OneB'];
$OneC = $_POST['OneC'];
$OneD = $_POST['OneD'];
$OneE = $_POST['OneE'];
$OneF = $_POST['OneF'];
$OneG = $_POST['OneG'];


echo '
<table border="2" class="even">
    <tbody>
        <tr>
            <td colspan="14"><img src="images/piece.png" width="100%"></td>
        </tr>
        <tr>
            <td>lim<sub><i>x</i>&rarr;-12<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneAl,'</td>
            <td>lim<sub><i>x</i>&rarr;-8<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneBl,'</td>
            <td>lim<sub><i>x</i>&rarr;-4<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneCl,'</td>
            <td>lim<sub><i>x</i>&rarr;0<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneDl,'</td>
            <td>lim<sub><i>x</i>&rarr;4<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneEl,'</td>
            <td>lim<sub><i>x</i>&rarr;8<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneFl,'</td>
            <td>lim<sub><i>x</i>&rarr;12<sup>-</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneGl,'</td>
        </tr>
        <tr>
            <td>lim<sub><i>x</i>&rarr;-12<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneAr,'</td>
            <td>lim<sub><i>x</i>&rarr;-8<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneBr,'</td>
            <td>lim<sub><i>x</i>&rarr;-4<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneCr,'</td>
            <td>lim<sub><i>x</i>&rarr;0<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneDr,'</td>
            <td>lim<sub><i>x</i>&rarr;4<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneEr,'</td>
            <td>lim<sub><i>x</i>&rarr;8<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneFr,'</td>
            <td>lim<sub><i>x</i>&rarr;12<sup>+</sup></sub> &#131;(<i>x</i>)</td>
                <td>',$OneGr,'</td>
        </tr>
        <tr><td colspan="14"></td></tr>
        <tr>
            <td>lim<sub><i>x</i>&rarr;-12</sub> &#131;(<i>x</i>)</td>
                <td>',$OneA,'</td>
            <td>lim<sub><i>x</i>&rarr;-8</sub> &#131;(<i>x</i>)</td>
                <td>',$OneB,'</td>
            <td>lim<sub><i>x</i>&rarr;-4</sub> &#131;(<i>x</i>)</td>
                <td>',$OneC,'</td>
            <td>lim<sub><i>x</i>&rarr;0</sub> &#131;(<i>x</i>)</td>
                <td>',$OneD,'</td>
            <td>lim<sub><i>x</i>&rarr;4</sub> &#131;(<i>x</i>)</td>
                <td>',$OneE,'</td>
            <td>lim<sub><i>x</i>&rarr;8</sub> &#131;(<i>x</i>)</td>
                <td>',$OneF,'</td>
            <td>lim<sub><i>x</i>&rarr;12</sub> &#131;(<i>x</i>)</td>
                <td>',$OneG,'</td>
        </tr>
    </tbody>
</table>';
?>
</body>
</html>
