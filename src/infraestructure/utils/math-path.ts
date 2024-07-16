export function matchPath(path: string, routePath: string): boolean {
  const pathParts = path.split('/').filter(Boolean);
  const routeParts = routePath.split('/').filter(Boolean);

  if (pathParts.length !== routeParts.length) {
    return false;
  }

  return routeParts.every((part, index) => {
    return part.startsWith(':') || part === pathParts[index];
  });
}
