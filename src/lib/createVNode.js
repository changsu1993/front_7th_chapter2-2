export function createVNode(type, props, ...children) {
  // children 배열을 평탄화 (flatten)
  const flattenChildren = (arr) => {
    return arr.reduce((acc, child) => {
      if (Array.isArray(child)) {
        return acc.concat(flattenChildren(child));
      }
      return acc.concat(child);
    }, []);
  };

  return {
    type,
    props,
    children: flattenChildren(children),
  };
}
