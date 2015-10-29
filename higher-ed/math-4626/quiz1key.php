<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Limit Definitions Quiz Answers</title>
<link rel="stylesheet" href="images/limstyles.css"/>
</head>
<body>
<h1>Limit Definitions Quiz Answers</h1>
<h6 class="!ta:c"><a href="intro.html">Site Map</a></h6>
<?php
$yourscore = 0;
$totalscore = 0;


$a1 = $_POST['delta-neighborhood'];
$b1 = $_POST['point-c'];
$c1 = $_POST['x-axis'];
$d1 = $_POST['epsilon-neighborhood'];
$e1 = $_POST['point-L'];
$f1 = $_POST['f-axis'];

echo'<ol>
    <li>Categorize the following terms into like groups:
        <table border="1"><tbody align="center">
            <tr><th>DOMAIN</th><th>RANGE</th></tr>
            <tr>
                <td>';
                    if($a1==delta)
                    {
                        echo'The &delta; -neighborhood (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'The &epsilon; -neighborhood (incorrect)<br>';
                        $totalscore++;
                    }
                    if($b1==c)
                    {
                        echo'lies around c (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'lies around L (incorrect)<br>';
                        $totalscore++;
                    }
                    if($c1==x)
                    {
                        echo'on the x -axis (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'on the &#131;(x) -axis (incorrect)<br>';
                        $totalscore++;
                    }
echo'
                </td>
                <td>';
                    if($d1==epsilon)
                    {
                        echo'The &epsilon; -neighborhood (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'The &delta; -neighborhood (incorrect)<br>';
                        $totalscore++;
                    }
                    if($e1==L)
                    {
                        echo'lies around L (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'lies around c (incorrect)<br>';
                        $totalscore++;
                    }
                    if($f1==f)
                    {
                        echo'on the &#131;(x) -axis (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'on the x -axis (incorrect)<br>';
                        $totalscore++;
                    }
echo'
                </td>
            </tr>
        </tbody></table>
    </li>';


$a2 = $_POST['fig1'];
$b2 = $_POST['fig2'];
$c2 = $_POST['fig3'];

echo'
    <li>Choose the correct "layman" explanation of the following figures.<br>
        <table class="even" border="1"><tbody>
            <tr>
                <td>
                    <img src="images/realex.png" height="300"><br>';
                    if($a2==conv)
                    {
                        echo'We can make &#131;(<i>x</i>) as close as we want to <i>L</i> as long as we can find an <i>x</i> large enough</i>.<br>(incorrect: You are describing a limit at infinity.)<br>';
                        $totalscore++;
                    }
                    elseif($a2==real)
                    {
                        echo'We can make &#131;(<i>x</i>) as close as we want to <i>L</i> as long as we can find an <i>x</i> close enough, but not equal, to <i>c</i>. (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    elseif($a2==inf)
                    {
                        echo'We can make &#131;(<i>x</i>) as large as we want as long as we can find an <i>x</i> close enough, but not equal, to <i>c</i>.<br>(incorrect: You are describing an infinite limit.)<br>';
                        $totalscore++;
                    }
                    else
                    {
                        echo'You did not choose an answer. (incorrect)<br>';
                        $totalscore++;
                    }
echo'
                </td>
            </tr>
            <tr>
                <td><img src="images/convex.png" width="400"><br>';
                    if($b2==conv)
                    {
                        echo'We can make &#131;(<i>x</i>) as close as we want to <i>L</i> as long as we can find an <i>x</i> large enough</i>. (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    elseif($b2==real)
                    {
                        echo'We can make &#131;(<i>x</i>) as close as we want to <i>L</i> as long as we can find an <i>x</i> close enough, but not equal, to <i>c</i>.<br>(incorrect: You are describing a real limit.)<br>';
                        $totalscore++;
                    }
                    elseif($b2==inf)
                    {
                        echo'We can make &#131;(<i>x</i>) as large as we want as long as we can find an <i>x</i> close enough, but not equal, to <i>c</i>.<br>(incorrect: You are describing an infinite limit.)<br>';
                        $totalscore++;
                    }
                    else
                    {
                        echo'You did not choose an answer. (incorrect)<br>';
                        $totalscore++;
                    }
echo'
                </td>
            </tr>
                <td><img src="images/infex.png" height="400"><br>';
                    if($c2==conv)
                    {
                        echo'We can make &#131;(<i>x</i>) as close as we want to <i>L</i> as long as we can find an <i>x</i> large enough</i>.<br>(incorrect: You are describing a limit at infinity.)<br>';
                        $totalscore++;
                    }
                    elseif($c2==real)
                    {
                        echo'We can make &#131;(<i>x</i>) as close as we want to <i>L</i> as long as we can find an <i>x</i> close enough, but not equal, to <i>c</i>.<br>(incorrect: You are describing a real limit.)<br>';
                        $totalscore++;
                    }
                    elseif($c2==inf)
                    {
                        echo'We can make &#131;(<i>x</i>) as large as we want as long as we can find an <i>x</i> close enough, but not equal, to <i>c</i>. (correct!)<br>';
                        $yourscore++;
                        $totalscore++;
                    }
                    else
                    {
                        echo'You did not choose an answer. (incorrect)<br>';
                        $totalscore++;
                    }
echo'
                </td>
            </tr>
        </tbody></table>
    </li>';


$a3 = $_POST['num3'];

echo'
    <li>An infinite limit...<br>';
        if($a3[0]!=horiz)
        {
            echo'(Box 1 is unchecked.) (correct!)<br>';
            $yourscore++;
            $totalscore++;
            if($a3[0]!=DNE)
            {
                echo'(Box 2 is unchecked.) (incorrect: An infinite limit does not exist because there is no value that &#131;(<i>x</i>) approaches.)<br>';
                $totalscore++;
                if($a3[0]!=infdef)
                {
                    echo'(Box 3 is unchecked.) (incorrect: This is the definition of an infinite limit.)';
                    $totalscore++;
                }
                else//$a3[0]==infdef
                {
                    echo'means we can make &#131;(<i>x</i>) arbitrarily large, provided we choose the right <i>x</i> &ne; <i>c</i>. (correct!)<br>';
                    $yourscore++;
                    $totalscore++;
                }
            }
            else//$a3[0]==DNE
            {
                echo'does not exist. (correct!)<br>';
                $yourscore++;
                $totalscore++;
                if($a3[1]!=infdef)
                {
                    echo'(Box 3 is unchecked.) (incorrect: This is the definition of an infinite limit.)';
                    $totalscore++;
                }
                else//$a3[1]==infdef
                {
                    echo'means we can make &#131;(<i>x</i>) arbitrarily large, provided we choose the right <i>x</i> &ne; <i>c</i>. (correct!)<br>';
                    $yourscore++;
                    $totalscore++;
                }
            }
        }
        else//$a3[0]==horiz
        {
            echo'is a value that &#131;(<i>x</i>) will never reach due to a horizontal asymptote. (incorrect: This is describing a convergence limit.)<br>';
            $totalscore++;
            if($a3[1]!=DNE)
            {
                echo'(Box 2 is unchecked.) (incorrect: An infinite limit does not exist because there is no value that &#131;(<i>x</i>) approaches.)<br>';
                $totalscore++;
                if($a3[1]!=infdef)
                {
                    echo'(Box 3 is unchecked.) (incorrect: This is the definition of an infinite limit.)';
                    $totalscore++;
                }
                else//$a3[1]==infdef
                {
                    echo'means we can make &#131;(<i>x</i>) arbitrarily large, provided we choose the right <i>x</i> &ne; <i>c</i>. (correct!)<br>';
                    $yourscore++;
                    $totalscore++;
                }
            }
            else//$a3[1]==DNE
            {
                echo'does not exist. (correct!)<br>';
                $yourscore++;
                $totalscore++;
                if($a3[2]!=infdef)
                {
                    echo'(Box 3 is unchecked.) (incorrect: This is the definition of an infinite limit.)';
                    $totalscore++;
                }
                else//$a3[2]==infdef
                {
                    echo'means we can make &#131;(<i>x</i>) arbitrarily large, provided we choose the right <i>x</i> &ne; <i>c</i>. (correct!)<br>';
                    $yourscore++;
                    $totalscore++;
                }
          }
      }
echo'
    </li>';


$a4 = $_POST['num4'];

echo'
    <li>True or False:<br>
        A limit that does not exist is an infinite limit.<br>';
        if($a4==Tru)
        {
            echo'True (incorrect: An arbitrary oscillation or a break in a curve are two examples of limits that do not exist that are not infinite.)';
            $totalscore++;
        }
        elseif($a4==Fal)
        {
            echo'False (correct!)';
            $yourscore++;
            $totalscore++;
        }
        else
        {
            echo'You did not choose an answer. (incorrect)';
            $totalscore++;
        }
echo'
    </li>
</ol>';


$percentage = $yourscore*100/$totalscore;
echo'<h3>You scored:<br>',$yourscore,' out of ',$totalscore,'<br>',$percentage,'%<br>';
if($percentage>=80)
{
    echo': )';
}
elseif($percentage<=50)
{
    echo': (';
}
else
{
}
echo'</h3>';
?>

<h2 class="!ta:c"><a href="intro.html">Site Map</a></h2>

</body>
</html>
