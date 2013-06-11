// JavaScript Document


/** Assigns a title to mark elements of the "rel_math" class. */
var marks = document.getElementsByTagName('mark');
function titleMarks() {
	for (i = 0; i < marks.length; i++) {
		if (marks[i].className == 'rel_math') {
			marks[i].title = 'relevant to mathematics';
		}
	}
}

