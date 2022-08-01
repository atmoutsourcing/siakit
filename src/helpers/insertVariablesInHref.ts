export function insertVariablesInHref(
  text: string,
  item:
    | { [key: string]: string | number }
    | { [key: string]: { [key: string]: string } },
): string {
  const itemSplitted = text.split('/');

  let path = '';

  itemSplitted.forEach((value, index) => {
    if (value.includes('[')) {
      const key = value.replace('[', '').replace(']', '');

      const obj = item[key];

      if (index > 0) {
        path =
          typeof obj !== 'object' ? `${path}/${obj}` : `${path}/${obj.value}`;
      } else {
        path =
          typeof obj === 'object'
            ? obj.value
            : typeof obj === 'string'
            ? obj
            : String(obj);
      }
    }

    if (!value.includes('[')) {
      if (index > 0) {
        path = `${path}/${value}`;
      } else {
        path = value;
      }
    }
  });

  return path;
}
