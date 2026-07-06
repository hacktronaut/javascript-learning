# Modules in JS

As our application grows bigger, we want to split it into multiple files, so called “modules”. A module may contain a class or a library of functions for a specific purpose.

For a long time, JavaScript existed without a language-level module syntax. That wasn’t a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.



What is a module?
A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives export and import to interchange functionality, call functions of one module from another one:

export keyword labels variables and functions that should be accessible from outside the current module.
import allows the import of functionality from other modules.



The import directive loads the module by path ./sayHi.js relative to the current file, and assigns exported function sayHi to the corresponding variable.

Let’s run the example in-browser.

As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute <script type="module">.


In the browser, if we talk about HTML pages, independent top-level scope also exists for each <script type="module">.

Here are two scripts on the same page, both type="module". They don’t see each other’s top-level variables:

<script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user is not defined
</script>

## Module Execution Order & Hoisting

When dealing with ES modules in JavaScript, it is important to understand how they are parsed and executed.

1. **Import Hoisting:** When the JavaScript engine parses a module file, it finds all the `import` statements regardless of where they are located in the file. It **hoists** them to the top and resolves and executes those imported modules **before** running any of the actual code inside the importing file.

2. **A module code is evaluated only the first time when imported:** Modules are executed only once and their exports are cached. All other importers get the same exported objects (live reference).

3. **Live References:** ES Modules export live references (not copies) of their values. If an exported object is mutated in one module (e.g., `module1.js` modifies `adminUser.name`), that mutation will be visible in all other modules importing the same object, even if they imported it before the mutation happened, because they refer to the exact same object in memory.

### Execution Order Example
If we have a scenario like:

```javascript
// moduleDemo.js
import { sayHello } from "./sayHi.js";
import { adminUser } from "./admin.js";

console.log(adminUser); // Might log mutated state if another module mutates it!

import { user1 } from "./module1.js"; 
```

1. **All imported files run first:** `sayHi.js`, `admin.js`, and `module1.js` will all be executed fully before `moduleDemo.js` executes its first line of code (the `console.log`).
2. Even though `import { user1 } from "./module1.js"` is at the bottom, `module1.js` is fully executed before the first `console.log(adminUser)` runs. If `module1.js` mutated `adminUser`, that mutation will be reflected in the first `console.log`.