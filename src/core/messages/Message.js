export default class Message {
    static TYPE_COMMAND = 'COMMAND';
    static TYPE_DATA = 'DATA';

    constructor(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    getType() {
        return this.type;
    }
}