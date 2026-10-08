/**
 * `Promise.withResolvers` ships in ES2024 and runs on the supported Node (>=24), but the repo's
 * `lib` is es2023. This ambient declaration adds only that method so it typechecks repo-wide.
 */

interface PromiseConstructor {
	withResolvers<T>(): PromiseWithResolvers<T>;
}
