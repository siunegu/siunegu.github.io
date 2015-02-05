---
layout: post
title: "Testing with Rspec: an example using people."
date:   2015-01-15 19:27:00
categories: 
---

"There is no Testing Boilerplate." Simply, testing follows a simple model of "if I do a thing, then I should get this other thing" course of events, and with each test usecase in a project we should simply adopt this mentality. Here we'll run out a simple case using the example of people ( yeah the ones in real life ) of how a test can be run, using [rspec](https://github.com/rspec/rspec).

So take for example the imaginary class Person, who can walk, talk, eat, & think. For the usecase of *walk*,
let's say we expect Person walks at an average of 4.7km per hour, so after an hour we expect the distance covered to be 4.7km from the starting distance. 

Let's begin by setting up a couple of spec files for testing. Note that this will not be done in rails, but vanilla ruby. We can run these commands in terminal to get started. 
`mkdir lib spec`
`mkdir lib/sims spec/sims`
`touch spec/sims/person_spec.rb`

We can begin by opening the **person_spec.rb** we just created.

```
module Sims
	describe Sims::Person do
		
	end
end
```

running rspec we'll get our first error:

    `<module:Sims>': undefined local variable or method `person' for Sims:Module (NameError)

```
# person_spec.rb
require "sims/person"

module Sims
	describe Sims::Person do
		
	end
end
```

running rspec again we get that there's no file.

    `require': cannot load such file -- sims/person (LoadError)


So let's make one person model. 
`touch lib/sims/person.rb`

```
# person.rb
module Sims
	class Person 
		
	end
end
```

#### Case for Walk
Describe a Sims person, describe how they walk.

```
require "sims/person"

module Sims
	describe Sims::Person do
		describe ".walk" do
			
		end
 	end
end
```
Start with the simple case,

```
# person_spec.rb
require "sims/person"

module Sims
	describe Sims::Person do
		describe ".walk" do
			it "changes location" do

			end
		end
 	end
end
```
rspec

    Finished in 0.00049 seconds (files took 0.146 seconds to load) 1 example, 0 failures

> Let's say you want to make better rspec info.
> Create a *.rspec* file in the top level directory of the project.
> Add these lines for color, and description of what we're working with: 
> ```
> //.rspec
> -c 
> --format=doc
> ```

```
# person_spec.rb
require "sims/person"

module Sims
	describe Sims::Person do
		describe ".walk" do
			it "changes location" do
				expect(1).to eq(2)
			end
		end
 	end
end
```
rspec

    Failures:

	  1) Sims::Person.walk changes location
	     Failure/Error: expect(1).to eq(2)

	       expected: 2
	            got: 1

You never want to fix multiple tests at once. Rspec gives you a specific failure on a specific line, in a nifty command:

    rspec ./spec/sims/person_spec.rb:6 

Usually tests using BDD and TDD follow a "Given, When, Then" flow.
**Given** a thing
**When** the thing does this
**Then** the thing should have this result

```
# person_spec.rb
require "sims/person"

module Sims
	describe Sims::Person do
		describe ".walk" do
			it "changes location" do
				# GIVEN
				person = Sims::Person.new

				# WHEN
				person.walk(4.5)

				# THEN
				expect(person.location).to eq(4.5)
			end
		end
 	end
end
```
rspec

    
	  1) Sims::Person.walk changes location
	     Failure/Error: person.walk(4.5)
	     NoMethodError:
	       undefined method `walk'

```
# person.rb
module Sims
	class Person 
		def walk(distance)

		end
	end
end
```
rspec
We now get our first logic error:

     1) Sims::Person.walk changes location
     Failure/Error: expect(person.location).to eq(4.5)

       expected: 4.5
            got: nil

```
# person.rb
module Sims
	class Person 
		
		attr_reader :location

		def walk(distance)
			@location = 4.5
		end
	end
end
```
rspec

    Sims::Person
		  .walk
		    changes location

		1 example, 0 failures

> General steps we take for TDD are:
> st=>Red
> op=>Green
> e=>Refactor
> You are not allowed to let your test go red while refactoring, undo.

Just because it was green, doesn't mean it's always correct. In this case, it should increase the distance, not set it to distance, as such:
```
module Sims
	class Person 
		
		attr_reader :location

		def walk(distance)
			@location += distance
		end
	end
end
```
rspec

     1) Sims::Person.walk changes location
     Failure/Error: person.walk(4.5)
     NoMethodError:
       undefined method `+' for nil:NilClass

We rectify this simply by initializing the distance to 0

```
# person_spec.rb
require "sims/person"

module Sims
	describe Sims::Person do
		describe ".walk" do
			it "changes location" do
				# GIVEN
				person = Sims::Person.new

				# WHEN
				person.walk(4.5)
				person.walk(10)

				# THEN
				expect(person.location).to eq(14.5)
			end
		end
 	end
end
```
Initialize it
```
# person.rb
module Sims
	class Person 
		
		attr_reader :location

		def initialize 
			@location = 0
		end

		def walk(distance)
			@location += distance
		end
	end
end
```

#### Case for Eat

	describe ".eat" do
			it "changes hunger" do
				person = Sims::Person.new
				food = Food::Food.new
				person.hunger = 10
				food.weight = 2

				person.eat(food)

				expect(person.hunger).to eq(8)
			end
		end

```
# food.rb
module Food
	class Food
		attr_accessor :weight
	end	
end
```

```
# person.rb
def eat(food)
	@hunger -= food.weight
end
```