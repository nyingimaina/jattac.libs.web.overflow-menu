import IOverflowMenuItem from '../Data/IOverflowMenuItem';

/**
 * Evaluates a property value that can be a boolean, a synchronous function,
 * or an asynchronous function returning a boolean.
 *
 * @param val - The value to evaluate.
 * @param defaultValue - The default value to return if val is undefined.
 * @returns A promise resolving to the evaluated boolean value.
 */
export const evaluate = async (
  val: IOverflowMenuItem['visible'] | IOverflowMenuItem['enabled'],
  defaultValue: boolean,
): Promise<boolean> => {
  if (val === undefined) return defaultValue;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'function') {
    const result = val();
    if (result instanceof Promise) {
      return await result;
    }
    return result;
  }
  return defaultValue;
};
