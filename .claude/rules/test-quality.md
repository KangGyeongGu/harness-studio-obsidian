---
paths:
  - "tests/**/*.ts"
---

# Test Quality Rules

You are writing tests for the harness-studio-obsidian project.
These rules prevent tautological tests (tests that always pass regardless of correctness).

## Falsifiability Requirement

Before writing any assertion, ask: "If I introduce a one-line bug in the production function,
would this assertion fail?" If no → the assertion is tautological → do not write it.

## Forbidden Matchers (never use these alone)

```ts
expect(x).toBeDefined()   // always true for any non-undefined value
expect(x).toBeTruthy()    // always true for any non-empty/non-zero value
expect(x).toBeFalsy()     // too broad
expect(x).not.toBeNull()  // use positive assertion instead
```

Use concrete value assertions instead:
```ts
expect(result.status).toBe('error')
expect(result.errors).toHaveLength(1)
expect(result.errors[0]).toBe('statement is required')
```

## Forbidden Oracle Pattern

Never derive the expected value from the same function call as the actual:
```ts
// FORBIDDEN
expect(validate(input)).toEqual(validate(input));
const r = validate(input);
expect(r.status).toBe(validate(input).status);
```

## Required Test Categories (per public function)

Every public function must have tests in ALL 4 categories:
1. **Happy path** — valid input, verify concrete output values
2. **Boundary** — empty string, zero, null, undefined, max-length, single-element array
3. **Negative/Invalid** — missing required field, wrong type, value outside valid range
4. **Error path** — thrown exception with specific message, async rejection, status=blocked

## Async Tests

Always use `expect.assertions(N)` in async tests:
```ts
it('should reject when api returns 500', async () => {
  expect.assertions(1);
  await expect(apiClient.fetch('/bad')).rejects.toThrow('Internal Server Error');
});
```

## Method-Level Focus

Write tests targeting ONE method/function per describe block.
Do not write a single test that calls 3+ different production methods — this is an Eager Test.

## Test Name Format

`should [expected behavior] when [condition]`

Examples:
- `should return status=error when statement field is missing`
- `should throw when nodeId is undefined`
- `should return empty array when no annotations match the filter`
