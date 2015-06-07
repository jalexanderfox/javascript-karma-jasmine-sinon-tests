describe("A suite", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});


// Source
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types
describe("Evaluating variables, a variable", function() {
	var _variable;
	var nullVariable = null;

	it("declared without assigned value", function() {
		expect(_variable).toBeUndefined();
	});

	it("declared without assigned value", function() {
		expect(_variable).toBeFalsy();
	});

	it("declared without assigned value in numeric context", function() {
		expect(_variable + 2).toBeNaN();
	});

	it("declared without assigned null in numeric context", function() {
		expect(nullVariable * 32).toEqual(0);
	});

	it("declared without assigned null in boolean context", function() {
		expect(nullVariable).toBeFalsy();
	});

	it("undeclared", function() {
		var _undeclaredVariable = function() {
			return undeclaredVariable + 2;
		}
		expect(_undeclaredVariable).toThrow();
		// if accessing undeclaredVariable without typeof, it would throw Reference Error
		expect(typeof(undeclaredVariable)).toEqual('undefined');
	});

});


describe("Evaluating variables scope, a variable", function() {

	it("declared var in if block statement in global scope", function() {
		if (true) {
			var x = 5;
		}
		expect(x).toEqual(5);
	});

	// ES6
	it("declared let in if block statement in global scope", function() {
		if (true) {
			var x = 5;
		}
		expect(x).toBeUndefined();
		pending("ES6: 'let' sets variable scope to the block");
	});

});

describe("Variable Hoisting, a variable", function() {

	it("declared var anywhere in block gets hoisted 'declared at top of block' but the value at current line interpreted", function() {
		expect(hoistedVariable).toBeUndefined();
		var hoistedVariable = 3;
		expect(hoistedVariable).toEqual(3);

		//change hoisted variable value
		hoistedVariable = "my value";

		(function(outerHoistedVariable) {
			expect(hoistedVariable).toBeUndefined();
			expect(outerHoistedVariable).toEqual("my value");
			var hoistedVariable = "local value";
			expect(hoistedVariable).toEqual("local value");
		})(hoistedVariable);
	});

});

describe("Constants", function() {

	it("can not change value through assignement or re-declaration", function() {

	});

	it("scope rules are the same as those for let variable declarations", function() {

	});

	it("cannot be declared with same name as functions", function() {

	});

	pending("ES6");

});


describe("Data structures and types", function() {
/*
The latest ECMAScript standard defines seven data types:

Six data types that are primitives:

Boolean. true and false.
null. A special keyword denoting a null value. Because JavaScript is case-sensitive, null is not the same as Null, NULL, or any other variant.
undefined. A top-level property whose value is undefined.
Number. 42 or 3.14159.
String. "Howdy"
Symbol (new in ECMAScript 6). A data type whose instances are unique and immutable.


and Object
 */

	describe("Primitive Type: boolean", function() {
		it("true and false", function() {
			var true_booleanVariable = true; // boolean literal
			expect(true_booleanVariable).toEqual(true);
			expect(typeof true_booleanVariable).toEqual('boolean');
			expect(typeof true_booleanVariable).toEqual(typeof true);
			expect(true).not.toEqual(1);
			expect(false).not.toEqual(0);
			expect(false).not.toEqual(null);
			expect(true).toBeTruthy();
			expect(false).toBeFalsy();
		});
	});

	describe("Primitive Type: null", function() {
		it("is case-sensitive and is not the same as Null, NULL or other variants", function() {
			var nullVariable = null;
			expect(typeof nullVariable).toEqual('object');
			expect(typeof nullVariable).toEqual(typeof null);
			expect(typeof nullVariable).not.toEqual(typeof Null);
			expect(typeof nullVariable).not.toEqual(typeof NULL);
			expect(typeof nullVariable).not.toEqual(typeof NUll);
			expect(null).toBeFalsy();
		});
	});

	describe("Primitive Type: undefined", function() {
		it("is a top-level property whose value is undefined.", function() {
			var undefinedVariable;
			expect(undefinedVariable).toEqual(undefined);
			expect(typeof undefinedVariable).toEqual(typeof undefined);
			expect(typeof undefinedVariable).not.toEqual(typeof null);
			expect(undefined).toBeFalsy();
		});
	});

	describe("Primitive Type: Number", function() {
		it("integer or float: 42 or 3.14159", function() {
			var numberVariable = 11; // number literal
			expect(numberVariable).toEqual(11);
			expect(typeof numberVariable).toEqual(typeof Number()); // Number function returns a number type
			expect(typeof numberVariable).not.toEqual(typeof Number); // Number is a function
			expect(typeof numberVariable).not.toEqual(typeof new Number()); // new Number() is an object
			expect(typeof numberVariable).toEqual(typeof 22.22);
			expect(numberVariable).toBeTruthy();
		});
	});

	describe("Primitive Type: String", function() {
		it("group of alphanumeric characters", function() {
			var stringVariable = "my string"; //string literal
			expect(stringVariable).toEqual('my string'); // same string as literal
			expect(stringVariable).not.toEqual('My String'); // differnt case characters
			expect(typeof stringVariable).toEqual(typeof String()); // String function returns a string type
			expect(typeof stringVariable).not.toEqual(typeof String); // String is a function
			expect(typeof stringVariable).not.toEqual(typeof new String()); // new String() is an object
			expect(typeof stringVariable).toEqual(typeof ""); // type of empty string literal
			expect(typeof stringVariable).toEqual(typeof "My String"); // type of different case characters string literal
			expect(stringVariable).toBeTruthy(); //string that is not empty
			expect("").toBeFalsy(); //empty string
		});
	});

	describe("Primitive Type: Symbol", function() {
		it("is a data type whose instances are unique and immutable.", function() {
			pending('ES6');
		});
	});

	describe("Object", function() {
		/*
		Although these data types are a relatively small amount,
		they enable you to perform useful functions with your applications.
		Objects and functions are the other fundamental elements in the language.
		You can think of objects as named containers for values, and functions as
		procedures that your application can perform.
		*/
		it("named containers for values", function() {
			var objectVariable = {}; // object literal
			expect(typeof objectVariable).toEqual(typeof {});
			expect(typeof objectVariable).toEqual(typeof Object()); // Object function returns a object type
			expect(typeof objectVariable).toEqual(typeof new Object()); // new Object() is an object
			expect(typeof objectVariable).not.toEqual(typeof Object); // Object is a function according to typeof
			expect(typeof Object.create).toEqual('function') // Object is also a object that has methods
		});
	});

});




describe("Data type conversion", function() {
/*
JavaScript is a dynamically typed language. That means you don't have to
specify the data type of a variable when you declare it, and data types are
converted automatically as needed during script execution. So, for example,
you could define a variable as follows:
 */
	it("can change value and type through assignement", function() {
		var typeConversion = function() {
			var x = 42;
			x = 'Thanks for all the fish...';
			return x;
		};

		expect(typeConversion).not.toThrow();
		expect(typeConversion()).toEqual('Thanks for all the fish...');

	});

	it("converts numeric values to strings in expressions where numeric and string values with the + operator", function(){
		expect("The answer is " + 42).toEqual("The answer is 42");
		expect(42 + " is the answer").toEqual("42 is the answer");
	});

	it("but does not convert with other operators", function(){
		expect("37" - 7).toEqual(30);
		expect("37" + 7).toEqual("377");
	});

	it("alternative method of retrieving a number from a string is with the + (unary plus) operator", function(){
		expect("1.1" + "1.1").toEqual("1.11.1");
		expect( (+"1.1") + (+"1.1") ).toEqual(2.2);
		expect(  +"1.1" + +"1.1" ).toEqual(2.2);
	});

	describe("parseInt", function(){
		it("function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems)", function(){
			expect(parseInt(" 0xF", 16)).toEqual(15);
			expect(parseInt(" F", 16)).toEqual(15);
			expect(parseInt("17", 8)).toEqual(15);
			expect(parseInt(021, 8)).toEqual(15);
			expect(parseInt("015", 10)).toEqual(15);
			expect(parseInt(15.99, 10)).toEqual(15);
			expect(parseInt("FXX123", 16)).toEqual(15);
			expect(parseInt("1111", 2)).toEqual(15);
			expect(parseInt("15*3", 10)).toEqual(15);
			expect(parseInt("15e2", 10)).toEqual(15);
			expect(parseInt("15px", 10)).toEqual(15);
			expect(parseInt("12", 13)).toEqual(15);


			expect(parseInt("Hello", 8)).toEqual(NaN); // Not a number at all
			expect(parseInt("546", 2)).toEqual(NaN);   // Digits are not valid for binary representations

			expect(parseInt("-F", 16)).toEqual(-15);
			expect(parseInt("-0F", 16)).toEqual(-15);
			expect(parseInt("-0XF", 16)).toEqual(-15);
			expect(parseInt(-15.1, 10)).toEqual(-15);
			expect(parseInt(" -17", 8)).toEqual(-15);
			expect(parseInt(" -15", 10)).toEqual(-15);
			expect(parseInt("-1111", 2)).toEqual(-15);
			expect(parseInt("-15e1", 10)).toEqual(-15);
			expect(parseInt("-12", 13)).toEqual(-15);
		});
	});

	describe("parseFloat", function(){
		it("function parses a string argument and returns a floating point number.", function(){
			expect(parseFloat("3.14")).toEqual(3.14);
			expect(parseFloat("314e-2")).toEqual(3.14);
			expect(parseFloat("0.0314E+2")).toEqual(3.14);
			expect(parseFloat("3.14more non-digit characters")).toEqual(3.14);

			expect(parseFloat("FF2")).toEqual(NaN);
		});
	});

});


describe("Literals", function(){

/*
You use literals to represent values in JavaScript. These are fixed values, not variables, that you literally provide in your script. This section describes the following types of literals:

Array literals
Boolean literals
Floating-point literals
Integers
Object literals
String literals
 */

	describe("Array Literals", function(){

		it("array literal is a type of object initializer", function(){
			var coffees = ["French Roast", "Colombian", "Kona"];
			expect(typeof coffees).toEqual('object'); //because arrays are objects
			expect(Array.isArray(coffees)).toBeTruthy();
			expect(coffees.length).toEqual(3);

		});

		it("Extra commas in array literals", function(){
			var fish = ["Lion", , "Angel"];
			expect(fish[0]).toEqual("Lion");
			expect(fish[1]).toEqual(undefined);
			expect(fish[2]).toEqual("Angel");
			expect(fish.length).toEqual(3);

			var myList = ['home', , 'school', ];
			expect(myList[1]).toEqual(undefined);
			expect(myList[2]).toEqual('school');
			expect(myList.length).toEqual(3); // because trailing commas are not added to the array
		});
	});


	describe("Boolean Literals and Boolean Object", function(){
	/*
	Do not confuse the primitive Boolean values true and false with the
	true and false values of the Boolean object. The Boolean object is a wrapper
	around the primitive Boolean data type. See Boolean for more information.
	 */

	/*
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

	Do not use a Boolean object to convert a non-boolean value to a boolean value.
	Instead, use Boolean as a function to perform this task:

	var x = Boolean(expression);     // preferred
	var x = new Boolean(expression); // don't use
	 */
		it("If you specify any object, including a Boolean object whose value is false, as the initial value of a Boolean object, the new Boolean object has a value of true.", function(){
			var myFalse = new Boolean(false);   // initial value of false
			expect( myFalse ).toEqual(false);
			expect( new Boolean(myFalse) ).toEqual(true);       // initial value of true
			var myString =  new String('Hello'); // string object
			expect( new Boolean(myString) ).toEqual(true);      // initial value of true
		});

	});

	describe("Integer Literals", function(){
	/*
	Integers can be expressed in decimal (base 10), hexadecimal (base 16), octal (base 8) and binary (base 2).

	Decimal integer literal consists of a sequence of digits without a leading 0 (zero).
	Leading 0 (zero) on an integer literal indicates it is in octal. Octal integers can include only the digits 0-7.
	Leading 0x (or 0X) indicates hexadecimal. Hexadecimal integers can include digits (0-9) and the letters a-f and A-F.
	 */

	/*
	0, 117 and -345 (decimal, base 10)
	015, 0001 and -077 (octal, base 8)
	0x1123, 0x00111 and -0xF1A7 (hexadecimal, "hex" or base 16)
	*/

	});

	describe("Integer Literals", function(){
	/*
	A floating-point literal can have the following parts:

	A decimal integer which can be signed (preceded by "+" or "-"),
	A decimal point ("."),
	A fraction (another decimal number),
	An exponent.
	The exponent part is an "e" or "E" followed by an integer, which can be signed (preceded by "+" or "-"). A floating-point literal must have at least one digit and either a decimal point or "e" (or "E").

	Some examples of floating-point literals are 3.1415, -3.1E12, .1e12, and 2E-12.

	More succinctly, the syntax is:

	[(+|-)][digits][.digits][(E|e)[(+|-)]digits]

	For Example:
	3.14
	2345.789
	.3333333333333333333
	-.283185307179586
	*/

	});

	describe("Object Literals", function(){
	/*
	An object literal is a list of zero or more pairs of property names and associated
	values of an object, enclosed in curly braces ({}). You should not use an object literal
	at the beginning of a statement. This will lead to an error or not behave as you expect,
	because the { will be interpreted as the beginning of a block.
	*/

		it("Object literal differnt member assignments.", function(){
			/*
			The following is an example of an object literal. The first element of the car object defines a
			property, myCar, and assigns to it a new string, "Saturn"; the second element, the getCar property,
			is immediately assigned the result of invoking the function (CarTypes("Honda")); the third element,
			the special property, uses an existing variable (Sales).
			 */
			var Sales = "Toyota";

			function CarTypes(name) {
			  if (name == "Honda") {
			    return name;
			  } else {
			    return "Sorry, we don't sell " + name + ".";
			  }
			}

			var car = { myCar: "Saturn", getCar: CarTypes("Honda"), special: Sales }; // this is the object literal :)

			expect(car.myCar).toEqual("Saturn");   // Saturn
			expect(car.getCar).toEqual("Honda");  // Honda
			expect(car.special).toEqual("Toyota"); // Toyota

		});

	});

	describe("String Literals", function(){
	/*
	A string literal is zero or more characters enclosed in double (") or single (')
	quotation marks. A string must be delimited by quotation marks of the same type; that is,
	either both single quotation marks or both double quotation marks. The following are examples of string literals:

	"foo"
	'bar'
	"1234"
	"one line \n another line"
	"John's cat"


	You can call any of the methods of the String object on a string literal value—JavaScript automatically
	converts the string literal to a temporary String object, calls the method, then discards the temporary
	String object. You can also use the String.length property with a string literal:
	*/

		it("call methods of a String object on string literal", function(){
			expect("John's cat".length).toEqual(10);
		});

		it("can use special characters", function(){
			expect("\"").toEqual('"');
			var quote = "He read \"The Cremation of Sam McGee\" by R.W. Service.";
			expect(quote).toEqual('He read "The Cremation of Sam McGee" by R.W. Service.');
		});



	});

});









