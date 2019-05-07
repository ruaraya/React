import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) //first we transform the "items" to a lodash element, and then we take the elements we need
    .slice(startIndex)
    .take(pageSize)
    .value();
}
