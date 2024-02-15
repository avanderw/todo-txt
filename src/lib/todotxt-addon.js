// @ts-nocheck

export function isRecur(todo) {
    for (let key in todo.addons()) {
        if (key === 'due') {
            return todo.addons()[key].includes('R');
        }
    }
    return false;
}

export function recurDue(due) {
    if (!due.includes('R')) {
        return due;
    }

	const [oldDate, recur] = due.split('R');
    const dateParts = oldDate.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);

    const regex = /(.*)(\d+)(\w)/;
    const match = recur.match(regex);
    if (!match) {
        throw new Error('Invalid recurrence format');
    }

    const operator = match[1];
    const value = parseInt(match[2], 10);
    const unit = match[3];

    let newDate;
    switch (unit) {
        case 'd':
            newDate = recurDay(date, operator, value);
            break;
        case 'w':
            newDate = recurWeek(date, operator, value);
            break;
        case 'm':
            newDate = recurMonth(date, operator, value);
            break;
        case 'y':
            newDate = recurYear(date, operator, value);
            break;
        default:
            throw new Error('Invalid recurrence unit');
    }

    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1; // Adding 1 because months are zero-based
    const newDay = newDate.getDate();

    // Ensure the output date is in the 'yyyy-MM-dd' format
    const newDateStr = `${newYear}-${newMonth.toString().padStart(2, '0')}-${newDay
        .toString()
        .padStart(2, '0')}`;

    return newDateStr+"R"+recur;
}

function recurDay(date, operator, value) {
    let newDate = new Date(date);
    switch (operator) {
        case '+':
            newDate.setDate(date.getDate() + value);
            break;
        case '.+':
            newDate = new Date(Date.now());
            newDate.setDate(newDate.getDate() + value);
            break;
        case '++':
            newDate.setDate(newDate.getDate() + value);
            while (newDate < Date.now()) {
                newDate.setDate(newDate.getDate() + value);
            }
            break;
        default:
            throw new Error('Invalid recurrence operator');
    }
    return newDate;
}

function recurWeek(date, operator, value) {
    let newDate = new Date(date);
    switch (operator) {
        case '+':
            newDate.setDate(date.getDate() + value * 7);
            break;
        case '.+':
            newDate = new Date(Date.now());
            newDate.setDate(newDate.getDate() + value * 7);
            break;
        case '++':
            newDate.setDate(newDate.getDate() + value * 7);
            while (newDate < Date.now()) {
                newDate.setDate(newDate.getDate() + value * 7);
            }
            break;
        default:
            throw new Error('Invalid recurrence operator');
    }
    return newDate;
}

function recurMonth(date, operator, value) {
    let newDate = new Date(date);
    switch (operator) {
        case '+':
            newDate.setMonth(date.getMonth() + value);
            break;
        case '.+':
            newDate = new Date(Date.now());
            newDate.setMonth(newDate.getMonth() + value);
            break;
        case '++':
            newDate.setMonth(newDate.getMonth() + value);
            while (newDate < Date.now()) {
                newDate.setMonth(newDate.getMonth() + value);
            }
            break;
        default:
            throw new Error('Invalid recurrence operator');
    }
    return newDate;
}

function recurYear(date, operator, value) {
    let newDate = new Date(date);
    switch (operator) {
        case '+':
            newDate.setFullYear(date.getFullYear() + value);
            break;
        case '.+':
            newDate = new Date(Date.now());
            newDate.setFullYear(newDate.getFullYear() + value);
            break;
        case '++':
            newDate.setFullYear(newDate.getFullYear() + value);
            while (newDate < Date.now()) {
                newDate.setFullYear(newDate.getFullYear() + value);
            }
            break;
        default:
            throw new Error('Invalid recurrence operator');
    }
    return newDate;
}