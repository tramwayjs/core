import Message from "./Message";

export default class Command extends Message {
    type = Message.TYPE_COMMAND;
}