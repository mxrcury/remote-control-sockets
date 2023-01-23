import { MouseCommands } from '../constants';
class CommandsDto {
    constructor(command) {
        this.name = '';
        this.value = 0;
        this.secondValue = 0;
        this.setCommand(command.toString());
    }
    setCommand(command) {
        let whitespaceIndex;
        whitespaceIndex = command.indexOf(' ');
        if (command.slice(0, whitespaceIndex) === MouseCommands.DrawRectangle) {
            console.log(`ok`);
            this.name = command.slice(0, whitespaceIndex);
            this.value = Number(command.slice(whitespaceIndex, command.lastIndexOf(' ')));
            this.secondValue = Number(command.slice(command.lastIndexOf(' '), command.length));
            return;
        }
        if (whitespaceIndex <= -1)
            this.name = command;
        else {
            this.name = command.slice(0, whitespaceIndex);
            this.value = Number(command.slice(whitespaceIndex, command.length));
        }
    }
}
export { CommandsDto };
