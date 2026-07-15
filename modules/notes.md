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


### `import.meta`

The `import.meta` object contains metadata about the current module.

Its content depends on the execution environment. 

**In the browser:**
It contains the URL of the script, or the current webpage URL if it's inside an inline HTML script:

```javascript
<script type="module">
  alert(import.meta.url); // Script URL
  // For an inline script, this is the URL of the current HTML page
</script>
```

**In Node.js:**
You can use it similarly on the backend:

```javascript
console.log("This is a meta module");

export let data = {
    firstName: "Kirito"
};

export let printMetaInformation = () => {
    console.log(import.meta);
};
```

---

### In a Module, `this` is Always `undefined`

In a module, the top-level `this` keyword is `undefined`.

Compare this to non-module scripts, where `this` refers to the global object (e.g., `window` in browsers):

```html
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

This happens because modules are always executed in **strict mode** (`"use strict"`). In strict mode, JavaScript does not allow variables or the `this` context to silently fall back to the global object. This behavior helps maintain encapsulation and prevents accidental global state pollution.

---

### Browser-Specific Features

There are several browser-specific differences when using `<script type="module">` compared to regular scripts. 

*(You may want to skip this section if you're not using JavaScript in a browser context just yet.)*

#### 1. Module Scripts are Deferred

Module scripts are always deferred by default. This has the same effect as the `defer` attribute for both external and inline scripts.

In other words:
- Downloading external module scripts (`<script type="module" src="...">`) doesn't block HTML processing; they load in parallel with other resources.
- Module scripts wait until the HTML document is fully ready (even if they load faster than the HTML) and then run.
- The relative order of scripts is maintained: scripts that appear first in the document execute first.

As a side effect, module scripts always "see" the fully loaded HTML page, including the elements located below them.

```html
<script type="module">
  alert(typeof button); // "object" - The script can 'see' the button below
  // As modules are deferred, the script runs after the whole page is loaded
</script>

<!-- Compare to a regular script below: -->
<script>
  alert(typeof button); // "undefined" - The script can't see elements below it yet
  // Regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>
```

> **Note:** The second (regular) script actually runs before the first (module) script! You will see `undefined` first, and then `object`.

Because modules run after the HTML page loads, users might see the UI before the JavaScript application is ready. Ensure you implement loading indicators to avoid confusing visitors if certain functionality isn't immediately available.

#### 2. External Scripts Run Only Once

External scripts with `type="module"` and the same `src` are fetched and executed only once:

```html
<!-- The script 'my.js' is fetched and executed only once -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>
```

#### 3. Cross-Origin Fetch Requires CORS Headers

External scripts fetched from another origin (e.g., another domain) require CORS (Cross-Origin Resource Sharing) headers. The remote server must supply an `Access-Control-Allow-Origin` header allowing the fetch; otherwise, the script won't execute.

```html
<!-- another-site.com must supply Access-Control-Allow-Origin -->
<!-- otherwise, the script won't execute -->
<script type="module" src="http://another-site.com/their.js"></script>
```
This ensures better security by default.

#### 4. No "Bare" Modules Allowed

In the browser, `import` must specify either a relative or an absolute URL. Modules without a path are called "bare" modules, and they are not allowed.

For instance, this import is invalid in a browser:

```javascript
import { sayHi } from 'sayHi'; // Error: "bare" module
// The module must have a path, e.g., './sayHi.js'
```

*Note: Environments like Node.js or bundlers (Webpack, Vite) allow bare modules because they have custom resolution logic, but native browsers do not.*

#### 5. Compatibility & the `nomodule` Attribute

Older browsers that do not understand `type="module"` will simply ignore those scripts. You can provide a fallback for these legacy browsers using the `nomodule` attribute:

```html
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so they skip this.");
  alert("Old browsers ignore the script with an unknown type=module, but execute this one.");
</script>
```



### Export and Import

Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let’s explore more examples.

Export before declarations
We can label any declaration as exported by placing export before it, be it a variable, function or a class.

#### Export apart from declarations

Also, we can put export separately.

Here we first declare, and then export:


```javascript
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
```


Or, technically we could put export above functions as well.

Import *
Usually, we put a list of what to import in curly braces import {...}, like this:

// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
But if there’s a lot to import, we can import everything as an object using import * as <obj>, for instance:

// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');


>> At first sight, “import everything” seems such a cool thing, short to write, why should we ever explicitly list what we need to import?

Well, there are few reasons.

Explicitly listing what to import gives shorter names: sayHi() instead of say.sayHi().
Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

NOTE: Modern build tools, such as webpack and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you import * as library from a huge code library, and then use only few methods, then unused ones will not be included into the optimized bundle.

We can also use as to import under different names.

For instance, let’s import sayHi into the local variable hi for brevity, and import sayBye as bye:

// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!