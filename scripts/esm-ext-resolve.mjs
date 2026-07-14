/**
 * Node ESM resolve hook: allow CRA-style extensionless relative imports.
 */
export async function resolve(specifier, context, nextResolve) {
  if (
    specifier.startsWith(".") &&
    !/\.(js|mjs|cjs|json|node|wasm)$/i.test(specifier) &&
    !specifier.includes("?")
  ) {
    try {
      return await nextResolve(`${specifier}.js`, context);
    } catch {
      /* fall through */
    }
  }
  return nextResolve(specifier, context);
}
