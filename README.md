# Playwright Automation Framework

[![Playwright Tests](https://github.com/charles-nwokotubo/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/charles-nwokotubo/playwright-automation-framework/actions/workflows/playwright.yml)

- API Tests - https://petstore.swagger.io/
- UI Tests - https://www.saucedemo.com/

## Install

```bash
# Install npm packages
npm install

# Install Playwright
npx playwright install
```

## Run tests

```bash
# Run all tests
npm test

# Run test in headless mode
npm test <path-to.spec.ts>

# Run test in headed mode
npm run test-debug <path-to.spec.ts>

# Run test with playwright inspector
npm run test-inspect <path-to.spec.ts>
```

## Debug

If using VS Code, you can just press `F5` to launch the built-in debugger. You can also use the `test-debug` and `test-inspect` scripts for debugging.

## Visual Comparisons

To update snapshots, you will need to run `--update-snapshots` via Docker so that the snapshots are updated within an ephemeral environment.

To run in Docker:

```bash
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright /bin/bash
npm install
npx playwright test --update-snapshots
```

## Additional scripts

```bash
# Launch playwright report
npx run report

# Build and lint the code
npm run build