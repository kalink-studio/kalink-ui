export type PathSegments = (string | number)[] | string;

export const toPathSegments = (path: PathSegments) => {
  if (typeof path === 'string') {
    return path.split(/[[\].]+?/).filter(Boolean);
  }

  if (Array.isArray(path)) {
    return path;
  }

  throw new Error('Path must be a string or an array of path segments');
};
