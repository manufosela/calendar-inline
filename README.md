# \<calendar-inline>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i calendar-inline
```

## Usage

```html
<script type="module">
  import 'calendar-inline/calendar-inline.js';
</script>

<calendar-inline></calendar-inline>
```

## Events

- **set-public-holidays**: Emitted to set the public holidays. Send detail with id and array of objects with holidays. The object holidays has title and date.
- **set-holidays**: Emitted to set the holidays. Send detail with id and array of objects with holidays. The object holidays has title and date.
- **set-month**: Emitted to horizontal scroll to the month. Send detail with id and month with letters.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
