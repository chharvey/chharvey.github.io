<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<title>Christopher Harvey | Media Gallery</title>
<!--link href="images/Portfolio.css" rel="stylesheet" type="text/css" /-->
<style>
#feature {
	width: 70% !important; /* identified as "!important" because PHP internal styles do not override external styles */
}
h2 {
	text-align: center;
}
#tabs {
	margin-bottom: 20px;
}
#tabs-3 {
}
</style>
<link href="../../images/jquery-ui-1.8.9.custom/css/custom-theme/jquery-ui-1.8.9.custom.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../images/jquery-ui-1.8.9.custom/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="../../images/jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
<script type="text/javascript" src="../../images/jquery-ui-1.8.9.custom/js/UIs.js"></script>
</head>

<body>
<header>
	<?php include('../images/hubbar.php'); ?>
	<?php include('images/portfoliobar.php'); ?>
	<!--div class="folioTitle">
		<h1>Electronic Portfolio</h1>
		<h2>Christopher H. Harvey</h2>
	</div-->
</header>

<section id="feature">
	<header class="FeatureHeader">
		<h1 class="folio"><img src="images/field-gallery.png" alt="Media Gallery" /></h1>
	</header>
	<h2>Audio Department</h2>
	<div id="tabs">
		<ul>
			<li><a class="tabHeading" href="#tabs-1">MIDI Applications</a></li>
			<li><a class="tabHeading" href="#tabs-2">HAMS Lab</a></li>
			<li><a class="tabHeading" href="#tabs-3">Continuation</a></li>
			<li><a class="tabHeading" href="#tabs-4">Music &amp; Media Production</a></li>
			<li><a class="tabHeading" href="#tabs-5">Orchestration &amp; Analysis</a></li>
		</ul>
		<section id="tabs-1">
			<div class="onecolmid">
				<div title="A composition using Sibellius. 21-MAR-2007">
					<h3 class="title">Sibelius Project | Spring 2007</h3>
					<a class="box-block-a" target="_blank" href="../../MUS-2054/07SibProj.pdf">PDF of score</a>
					<a class="box-block-a" target="_blank" href="../../MUS-2054/07SibProj.mid">MIDI soundfile</a>
				</div>
			</div><!-- end onecolmid class -->
		</section><!-- end MIDI Applications title -->
		<section id="tabs-2">
			<div class="twocolleft">
				<div title="Lab Project 2. 11-APR-2008">
					<h3 class="title">Impressionist Composition | Spring 2008</h3>
					<p class="cap">My composition incorporating the idiomatic elements of impressionist music.</p>
					<a class="box-block-a" target="_blank" href="../../MUS-3146/08ImprProj.pdf">PDF of score</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3146/08ImprProj.mid">MIDI soundfile</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3146/08ImprProj.mp3">Synthesized MP3 file</a>
					<a class="box-block-a" target="_blank" title="A short report on impressionist components.">Elements of Impressionism</a>
				</div><!-- end Lab Project 2 title -->
			</div><!-- end twocolleft div -->
			<div class="twocolright">
				<div title="Lab Project 3. 24-APR-2008">
					<h3 class="title">Expressionist Composition | Spring 2008</h3>
					<p class="cap">My composition incorporating the idiomatic elements of expressionist music.</p>
					<a class="box-block-a" target="_blank" href="../../MUS-3146/08ExprProj.pdf">PDF of score</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3146/08ExprProj.mid">MIDI soundfile</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3146/08ExprProj.mp3">Synthesized MP3 file</a> 
					<a class="box-block-a" target="_blank" title="A short report on impressionist components.">Elements of Expressionism</a>
				</div><!-- end Lab Project 3 title -->
			</div><!-- end twocolright div -->
			<div class="endcolumns"></div>
		</section><!-- end History &amp; Analysis of Musical Styles title -->
		<section id="tabs-3">
			<div class="onecolmid">
				<h3 class="title">Continuation Exam</h3>
				<p class="cap">My continuation performance was on <time>May 5, 2008</time>. All Music major sophomores are required to prepare a major performance and pass a continuation exam before enrolling in upper-level classes.</p>
				<a class="box-block-a" target="_blank">Fugue No. 21 in B-Flat Major, BWV 866<br />J.S. Bach (1685&ndash;1750)</a>
				<a class="box-block-a" target="_blank">Sonata No. 38 in F Major, Hob. XVI/23, I. Moderato<br />J. Haydn (1732&ndash;1809)</a>
				<a class="box-block-a" target="_blank">Prelude No. 1 in C Major, Op. 28 No. 1<br />F. Chopin (1810&ndash;1849)</a>
				<a class="box-block-a" target="_blank">Prelude No. 9 in E Major, Op. 28 No. 9<br />F. Chopin (1810&ndash;1849)</a>
				<a class="box-block-a" target="_blank">Prelude No. 1<br />G. Gershwin (1898&ndash;1937)</a>
				<a class="box-block-a" target="_blank">Blue Lullaby<br />G. Gershwin (1898&ndash;1937)</a>
			</div>
		</section><!-- end Continuation title -->
		<section id="tabs-4">
			<div class="onecolmid">
				<div title="Final Tracking and Mixing Project. 17-DEC-2008">
					<h3 class="title">Final Project | Fall 2008</h3>
					<p class="cap">In this composition, I perform on the the piano and trombone. The other tracks are either pre-recorded or synthesized.</p>
					<a class="box-block-a" target="_blank" href="../../MUS-3055/Fall08Proj.mp3">MP3 mix</a>
				</div><!-- end Final Tracking and Mixing Project title -->
			</div><!-- end onecolmid class -->
		</section><!-- end Music &amp; Media Production title -->
		<section id="tabs-5">
			<div class="threecol-left">
				<div title="My transcription for woodwinds. 23-SEP-2009">
					<h3 class="title">Woodwind Transcription<br />Fall 2009</h3>
					<p class="cap">My transcription of Haydn's <i>Op. 76, No. 3 &quot;Emperor&quot; Mov. II</i> for woodwinds.</p>
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09WWProj.pdf">PDF of score</a>
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09WWProj.mid">MIDI soundfile</a>
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09WWProj.mp3">MP3 Colleague Recording</a>
				</div><!-- end My transcription for woodwinds. title -->
			</div><!-- end threecolleft class -->
			<div class="threecol-mid">
				<div title="My transcription for brass. 14-OCT-2009">
					<h3 class="title">Brass Transcription<br />Fall 2009</h3>
					<p class="cap">My transcription of Handel's <i>&quot;See the Conquering Hero Come&quot; from Act III of <i>Judas Maccabeus</i></i> for brass.</p>
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09BrassProj.pdf">PDF of score</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09BrassProj.mid">MIDI soundfile</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09BrassProj.mp3">MP3 colleague recording</a> 
				</div><!-- end My transcription for brass. tite -->
			</div><!-- end threecolmid class -->
			<div class="threecol-right">
				<div title="My transcription for woodwinds, brass, percussion. 09-DEC-2009">
					<h3 class="title">Final Transcription<br />Fall 2009</h3>
					<p class="cap">My transcription of Tchaikovsky's <i>&quot;Russian Hymn&quot; from <i>1812 Overture</i></i> for woodwinds, brass, percussion.</p>
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09FinalProj.pdf">PDF of score</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09FinalProj.mid">MIDI soundfile</a> 
					<a class="box-block-a" target="_blank" href="../../MUS-3044/09FinalProj.mp3">MP3 colleague recording</a> 
				</div><!-- end My transcription for woodwinds, brass, percussion. tite -->
			</div><!-- end threecolright class -->
			<div class="endcolumns"></div>
		</section><!-- end Orchestration &amp; Analysis title -->
	</div><!-- end tabs id -->
</section><!-- end feature id -->

</body>
</html>
