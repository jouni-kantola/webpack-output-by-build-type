class Math {
    static multiply(a, b) {
        return a * b;
    }

    get sum() {
        return this.first + this.second;
    }

    _subtract(second, first) {
        return second - first;
    }
}

export class TwoNumbers extends Math {
    constructor(first, second) {
        super();
        this.first = first;
        this.second = second;
    }
}

export class OneNumber {
    constructor(a) {
        this.a = a;
    }

    get valueOfOneNumber() {
        return this.a;
    }
}

export const aNumber = 2;
