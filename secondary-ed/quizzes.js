/*
 * new class HTMLtext
 * field string text
 *
 * new class AnswerChoice
 * field HTMLtext answertext
 * field double award must be >= 0 but lt= 1
 *
 *
 * new class Question_MultChoice
 * field HTMLtext questiontext
 * var answer;
 * var distractors = new AnswerChoice[3];
 * method addAnswer(text) {
 *  answer = new AnswerChoice(text, 1);
 * }
 * method addDistractor(n, text) {
 *  distractors[n].answertext = text;
 * }
 *
 * new class Question-SelAll
 * field int answers must be > 0
 * field AnswerChoice answer2
 * field AnswerChoice answer3
 * field int distractors must be > 0
 *  * field htmltext distractor1
 */

function addAnswer(text) {
  answer = new AnswerChoice(text, 1)
}
