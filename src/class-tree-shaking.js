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

class TwoNumbers extends Math {
    constructor(first, second) {
        super();
        this.first = first;
        this.second = second;
    }
}

class OneNumber {
    constructor(a) {
        this.a = a;
    }

    get valueOfOneNumber() {
        return this.a;
    }
}

export { OneNumber, TwoNumbers };

export const aNumber = 2;
