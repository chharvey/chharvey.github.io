<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Media Files</title>
  <link rel="stylesheet" type="text/css" href="images/ContStyles.css" />
</head>
<body>
<header>
	<h1>Media Files</h1>
	<?php include('images/contnavbar.php'); ?>
</header>

<table width="100%">
  <tbody>
    <tr>
      <td>Link to mp3 file served via HTTP download</td>
      <td><a href="images/AmzngGraceRadioFeature08.mp3">Marching Virginians Amazing Grace Radio Feature</a></td>
    </tr>
    <tr>
      <td>Embedded mp3 file in QT container served via HTTPdownload <br />
      <q>Sanctuary</q>, Utada Hikaru </td>
      <td>
      	<!--embed src="images/sanctuarymusic.mp3"></embed-->
	  </td>
    </tr>
    <tr>
      <td>embedded wma file in QT container served as a reference movie via RTSP download<br />
      <q>Windows XP Title</q>, Microsoft</td>
      <td>
      <!--script language="JavaScript" type="text/javascript">QT_WriteOBJECT_XHTML('images/XPtitle.wma', '240', '20', '','controller', 'true', 'autoplay', 'false');</script-->
	  </td>
    </tr>
  </tbody>
</table>
</body>
</html>
