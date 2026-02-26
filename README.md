<!-- 1 -->

What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans :
getElementById:
Finds one unique element by its id. Fast and straightforward.

getElementsByClassName:
Finds all elements with the same class. The list updates if the DOM changes.

querySelector:
Uses CSS selectors and returns only the first match. More flexible.

querySelectorAll:
Uses CSS selectors and returns all matches. Easy to loop through.

<!-- 2 -->

How do you create and insert a new element into the DOM?

Ans :
To create and insert a new element into the DOM, you follow three simple steps:

Create the element using document.createElement().

Add content or attributes like text or class.

Insert it into the DOM using methods like append, appendChild, or prepend.

<!-- 3 -->

What is Event Bubbling? And how does it work?

Ans :
Event Bubbling is how an event moves up the DOM tree.

When an event happens on an element, it first runs on that element, then on its parent, then the parent’s parent, and so on until it reaches the document.

So the flow is:
child → parent → grandparent → document

This is useful because a parent can handle events from its children.
If you want to stop this behavior, you can use event.stopPropagation().

<!-- 4 -->

What is Event Delegation in JavaScript? Why is it useful?

Ans :
Event Delegation is when you attach one event listener to a parent instead of adding listeners to every child.
The event on a child bubbles up to the parent, and the parent handles it.

Why it’s useful:

Less code, fewer listeners → faster performance

Works for elements added later dynamically

Keeps your code clean and easy to manage

<!-- 5 -->

What is the difference between preventDefault() and stopPropagation() methods?

Ans :
preventDefault() → stops the default action of an element.
Example: clicking a link won’t navigate, submitting a form won’t reload the page.

stopPropagation() → stops the event from bubbling up the DOM.
Example: a click on a child won’t trigger the parent’s click listener.
