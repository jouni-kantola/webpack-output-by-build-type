export default new class {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    get sum() {
        return first + second;
    }

    _subtract() {
        return second - first;
    }

    static multiply(a, b) {
        return a * b;
    }
}