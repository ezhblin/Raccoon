export function sortByName(records, orderASC) {
  console.log("order: " + orderASC);
  let count = 1;
  console.log("start: " + records);
  records.sort((r1, r2) => {
    console.log("r1: " + r1.Name);
    console.log("r2: " + r2.Name);
    console.log("count: " + count++);
    if (r1.Name < r2.Name) {
      return orderASC ? -1 : 1;
    } else if (r1.Name > r2.Name) {
      return orderASC ? 1 : -1;
    }
    return 0;
  });
  console.log("finish: " + records);
  console.log("count: " + count);
}
