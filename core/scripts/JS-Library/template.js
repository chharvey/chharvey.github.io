// to create a Class constructor:
function Person(fname, lname, age, lotterynumber) {
  // to create private instance fields (only accessible to constructor)
  var winner = 777;

  // to create private instance methods:
  // (must be inner functions inside constructor, only accessible to constructor)
  function isLucky() { return lotterynumber == winner; }

  // to create public instance fields (accessible to outside):
  this.firstname = fname;
  this.lastname = lname;
  this.age = age;

  // to create "privelaged" instance methods
  // (has access to private fields and methods but is itself accessible to the outside)
  // more access than public instance methods but takes up more space
  // (a new method is created for each instance)
  this.setBirthYear = function (changed) { return birth_year = changed; }
}

// to create public instance methods:
// less access than "privelaged" instance methods but takes up more space
// (one method is created and shared for all instances)
Person.prototype.sayHello = function (greeting) {
  return greeting + '!  I’m ' + this.firstname + this.lastname + '.'; // may use `this` inside prototype method
};

// to create public CLASS fields:
Person.IS_HUMAN = true;

// to create public CLASS methods:
Person.species = function(language) {
  var returned = null;
  if (language === 'Latin') returned = 'sapien';
  else if (language == 'English') returned = 'human';
  return returned;
  // switch(language) {
  //   case 'Latin':
  //     return 'sapien';
  //   case 'English':
  //     return 'human';
  //   default:
  //     return null;
  // }
}

// to create Global fields:
var e = 2.718281828;

// to create Global methods:
function add(x, y) { return x + y; }


var x;

// to create a new object:
var me = new Person('Chris', 'Harvey', 26);

// to get public instance fields:
x = me.firstname;

// to call privelaged instance methods:
x = me.setBirthYear(1987);

// to call public instance methods:
x = Person.prototype.sayHello('Hey there');

// to call public CLASS fields:
x = Person.IS_HUMAN;

// to call public CLASS methods:
x = Person.species('Latin');

// to call Global fields:
x = e;

// to call Global methods:
x = add(2, 3);



// to create a subclass:
function Student(fname, lname, age, studentnumber, major) {
  Person.call(this, fname, lname, age, lotterynumber);

  this.major = major;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.sayHello = function (greeting) {
  console.log(greeting + '! I’m ' + this.firstName + '. I’m studying ' + this.major + '!');
};
