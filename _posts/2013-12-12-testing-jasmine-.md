---
layout: post
title: "Setting Up Testing with Jasmine"
date:   2014-12-12 19:55:00
categories: testing javascript jasmine
---
Here's a quick rundown on how I setup Jasmine for testing, as taught briefly in class. I hope to outline things in as much of a step-by-step manner as possible.

<!-- {% highlight javascript linenos %}

describe("HelloWorld", function() {
	it("returns 'Hello World!", function() {
		
	})
});

{% endhighlight %} -->

```javascript
describe("HelloWorld", function() {
	it("returns 'Hello World!", function() {
		
	})
});
```

1. `git clone https://github.com/pivotal/jasmine.git`
2. `mkdir js_testing`
3. `cp jasmine/dist/jasmine-standalone-2.1.3.zip js_testing`
4. `unzip jasmine-standalone-2.1.3.zip`

open specrunner.html
tree
rm spec/PlayerSpec.js
rm spec/Spechelper.js
rm src/Player.js
rm src/Song.js


  <!-- include source files here... -->
  <script src="src/HelloWorld.js"></script>
  <script src="src/Calculator.js"></script>  
  <!-- include spec files here... -->
  <script src="spec/HelloWorldSpec.js"></script>
  <script src="spec/CalculatorSpec.js"></script>


`touch spec/CalculatorSpec.js`
`touch src/Calculator.js`

```javascript
describe("HelloWorld", function() {
	it("returns 'Hello World!", function() {
		
	})
});
```
The describe bit groups all the tests related to Hello World
it() is the particular example.

CalculatorSpec.js
```
describe("Calculator", function() {
	describe(".add", function() {
		it("performs addition of two numbers", function() {
			var calc = new Calculator();
			var result = calc.add(2, 3);
			expect(calc.add(2, 3)).toBe(5);
		});
	});
});
```
Calculator.js
```
var Calculator = function() {

}

Calculator.prototype.add = function(firstNumber, secondNumber) {
	return firstNumber + secondNumber;
}

```