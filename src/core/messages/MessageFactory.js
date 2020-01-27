import Message from './Message';
import Data from './Data';
import Command from './Command';

export default class MessageFactory {
    init(item) {
        const {type, value} = item;

        switch(type) {
            case Message.TYPE_COMMAND: return new Command(value);
            case Message.TYPE_DATA: return new Data(value);
        }

        return new Message(value);
    }
}