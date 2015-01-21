---
layout: post
title: Agile Methodology

---

**Some notes I made on the Agile Methodology**

### The most common roles in an Agile team.

  - Product Owner/Stakeholder
  - Scrum master (Agile Leader)
  - Developers
  - Designers
  - QA Tester
  - BA

### Phases

#### 1. Project Planning

We begin by writing down ** every possible idea ** and tasks that could be involved in the project. We do this by talking about "user stories", things that users can do with this application. 

> Fig.1.0 List everything someone using the system can do:
eg. ** For a Forum Application, A user can do these things: **

> "Show groups, Enter Comments, Post on Events, Change Avatar, Edit Posts, Receive notifications, Search Groups, Cancelling Events, Flag Posts, Block User, Create Account, Cancel Account, Sign Up, and Sign Out."

##### Key Procedures in Project Planning:
* Write out every possible idea.
* We focus on the ideas based around user stories.

-----------------

#### 2. Dividing Tasks

We Divide the Project Board into a table format, where columns specify the stage of a project, and rows are allocated to each task in the project.
In the first column we have the "Backlog", the next "Analysis", "In Development", "QA Testing" and the "Done" stages in their respective columns in that order. We will discuss these stages in greater detail in the following section, which brings us to...

##### Key Procedures in Project Planning:
* Use Trello/ Whiteboard with columns to organize columns into Backlog, Planned, In Progress, Done, Deployed, Iteration 0, Iteration 1.

-----------------

#### 3. Iteration Zero - The first wave.

In this stage, we have no idea about how difficult things are going to be yet. Sizing up what tools we use, divide up the problem, do the 'how things are going to work for the rest of the thing'. Here we'll look through the Backlog and put in the most important tasks for the project, such as 'creating an account, creating a group' - ie. the things that are most important to the stakeholder; and place it into analysis Column. Now we go through each of these cards and talk about them, what we need to do to get them working, and prioritise which one is the most important. Now we have the team members - eg. BA, QA - and paste a sticker tab next to each card; then you have these team members analyzing this task. Once the task is complete they take the tabs off, and move the card to the in-between for the next column - 'In Development'. The QA and the BA then moves onto the next task to analyze.

In Development stage,  the devs put their tags on the task. Once the task is done with one quick trip through the whole user journey, we move the task with the dev's tag still attached to the QA, and he/she will analyze the work to make sure there is no bugs, document them - and if you fucked it up will return it back in between 'Analysis' & 'In Development' to re consider. 

** "Velocity" Point System **
The overal point scoring system that is used to rate one iteration. We calculate this based on a relative score for each task to be completed, and however many tasks we are able to complete in this time is totalled into our "Velocity" Score.
Following "Iterations" attempt to beat or maintain Velocity at a level similar or better (A Higher Score) than the previous iteration.
Once past the QA testing, it will be passed onto the 'Done' stage.
Now we will rate each of these tasks completed in the short period of time had to complete the key tasks - based on the fibonacci numbers, because humans are bad at time management but good at relative estimates. Write and rate each card done in this iteration and add their numbers together, this is now the 'Velocity'. Now you can make a solid estimate in one iteration, your velocity rating for one iteration ie. the total amount of points you can complete in one iteration. 

Now once iteration zero is over, everyone comes and rates the cards in comparison to the tasks rated and completed in iteration zero. Now the devs can see if they believe they can complete the tasks and beat their past velocity. 

Now for the next iteration, if their velocity is lowered, then the tasks scoped to be completed after that will be relative to this velocity data.

Backlog - contains stories
Chore - these are things that will not affect the velocity ( Blue )

Bugs (red): already had points but just mistakes that need to taken care of asap.
Tech Tasks (green): like chores, fairly regular doesnt affect velocity.
Chores (blue): general overhead. these are things that will not affect the velocity≈no points. eg. deploying, usability testing.
Stories (yellow): points, can be measured as how many stories are being delivered.

What if there the fibonacci 13 rating is not high enough for the kind of huge task that comes up? Then we use an 'Epic'. Break this 'Epic' task into things that are as small as possible, as individual tasks with relative rating to othersmaller tasks.