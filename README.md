[![Build Status](https://travis-ci.org/vandium-io/env-restorer.svg?branch=master)](https://travis-ci.org/vandium-io/env-restorer)
[![npm version](https://badge.fury.io/js/env-restorer.svg)](https://badge.fury.io/js/env-restorer)

# env-restorer

Utility that snapshots the environment variables from `process.env` and can restore
them on demand. Initially developed for testing [vandium](https://github.com/vandium-io/vandium-node/).

## Features

* Automatically snapshots environment variable state
* Nested snapshots are allowed
* No dependencies

## Installation
Install via npm.

	npm install env-restorer

## Getting Started

A snapshot of the environment variables is created automatically when the library is loaded.

```js
const envRestorer = require( 'env-restorer' );

// change environment variables
process.env.MY_SPECIAL_VALUE = '42';

envRestorer.restore();
// restore environment variables back to initial state (MY_SPECIAL_VALUE will no longer exist)
```

To create another snapshot of the environment variables state, simply call `snapshot()`:

```js
const envRestorer = require( 'env-restorer' );

// change environment variables
process.env.MY_SPECIAL_VALUE = '42';

const snapshot = envRestorer.snapshot();

// change environment variables
process.env.MY_SPECIAL_VALUE = '43';

snapshot.restore();
// process.env.MY_SPECIAL_VALUE will now equal '42'

envRestorer.restore();
// restore environment variables back to initial state (MY_SPECIAL_VALUE will no longer exist)
```

## Feedback

We'd love to get feedback on how to make this tool better. Feel free to contact us at `feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
