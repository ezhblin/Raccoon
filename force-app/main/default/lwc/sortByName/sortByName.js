export function sortByName(records, orderASC) {
    let sortedArray = [...records];
    sortedArray.sort((r1, r2) => {
        if (r1.Name < r2.Name) {
            return orderASC ? -1 : 1;
        } else if (r1.Name > r2.Name) {
            return orderASC ? 1 : -1;
        }
        return 0;
    });

    return sortedArray;
}