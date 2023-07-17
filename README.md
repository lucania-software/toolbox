# A JavaScript/TypeScript Toolbox
A utility library delivering many quality of life improvements to both browser and node environments.

This project has 3 sections.

* __Shared__ - _@jeremy-bankes/toolbox/shared_ - Contains general features purely for manipulating data and works irrespective of environment, I.E. runs in both the client and server.
* __Server__ - _@jeremy-bankes/toolbox/server_ - Contains features to aid in server-side development and requires a node environment to run. Do not import this library in your client-side codebase.
* __Client__ - _@jeremy-bankes/toolbox/client_ - Contains features to aid in client-side development and requires a browser environment to run. Do not import this library in your server-side codebase.

# Getting started

## Install the package

This project uses NPM, thus can be installed with...

```bash
npm install --save @jeremy-bankes/toolbox
```

## Use the libraries

### Example usage of the "Shared" library.

```javascript
// "Shared" currently exports 3 namespaces
import { Data, Error, Text } from "@jeremy-bankes/toolbox/shared";

// Example usage of functions from the "Data" namespace.
const weatherReport = {
    weather: {
        type: "sunny",
        temperature: 21
    }
}
const weatherType = Data.get(weatherReport, "weather.type", "unknown");
Data.assert(weatherType === "sunny", "The weather is too bad to go shopping!");

// Example usage of functions from the "Error" namespace.
throw new Error.Fatal("Something unrecoverably bad happened!");

// Example usage of functions from the "Text" namespace.
const women = ["Catherine", "Kathrynne"];
const distance = Text.getLevenshteinDistance(women[0], women[1]);
const message = `${Text.toPrettyList(women)} have names that sound the same, but differ by ${distance} characters in spelling!`;

// See inline documentation for more usage details and to see what is available.
```

### Example usage of the "Server" library.
```javascript
import { ConsoleColor, File } from "@jeremy-bankes/toolbox/server";

// Example usage of functions from the "ConsoleColor" namespace.
const { red, green, blue, reset } = ConsoleColor.Common;
console.log(`Unpopular opinion, I prefer my computer without ${red}R${green}G${blue}B${reset}.`);

// Example usage of functions from the "File" namespace.
let fiona = await File.read("C:/Fiona Dossier.txt", "utf8");
fiona = fiona.replaceAll("life", "death");
await File.write("C:/Fiona Dossier.txt", fiona, "utf8");

/** {@link https://pastebin.com/E8af0zei Fiona Dossier} */
```

### Example usage of the "Client" library.
```javascript
import { Network, Dom, Cookies  } from "@jeremy-bankes/toolbox/client";

// I got tired, so gave up on this section. I'll get to it... eventually.
// Just look at the source...
```

| :warning: | This project uses [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) only supported in Node v12.7.0+. Ensure you use one of Node's new module resolution strategies, I.E. NodeNext. |
|-|:-|