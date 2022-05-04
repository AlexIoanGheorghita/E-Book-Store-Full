const binarySearch = (arr, name) => {
    let start = 0;
    let finish = arr.length - 1;
    let found = 0;

    while (start <= finish) {
        let mid = start + Math.floor((finish - start) / 2);

        if (arr[mid].toLowerCase() === name) {
            found = 1;
            break;
        }

        if (name > arr[mid]) {
            start = mid + 1;
        } else {
            finish = mid - 1;
        }
    }

    return found;
}

const bubbleSort = (arr) => {
    let isSwapped = false;

    for (let i = 0; i < arr.length - 1; i++) {
        isSwapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                isSwapped = true;
            }
        }
        
        if (isSwapped === false) {
            break;
        }
    }

    return arr;
}

module.exports = {
    binarySearch,
    bubbleSort
};