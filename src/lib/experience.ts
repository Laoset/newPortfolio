export function hasWorkingAchievements(
  keys: string[] | null | undefined
): keys is string[] {
  return Array.isArray(keys) && keys.length > 0;
}
