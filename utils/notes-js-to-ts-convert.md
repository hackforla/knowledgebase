1. yarn add typescript
2. yarn
   tsc config:init
3. Change one or more src files from js to ts
4. Add "skipLibs": "true" to tsconfig.json
5. Change extension of all test files from test.js to test.ts
6. Set test_pattern in tsconfig.json to

```
testMatch: [
  "**/__tests__/**/*.test.[jt]s?(x)",
  // "**/?(*.)+(spec|test).[tj]s?(x)",
],
```

7. Run yarn jest
8. Potentially get rid of dangling commas if you get invalid JSON
