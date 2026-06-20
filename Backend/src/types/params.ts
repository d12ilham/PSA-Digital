/**
 * Express route params are typed as `string | string[]`.
 * This helper safely extracts a string value.
 */
export function param(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}
