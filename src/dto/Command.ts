import { MouseCommands } from "../constants";
import { ICommandsDto } from "../types/index";

class CommandsDto implements ICommandsDto {
    name: string = "";
    value: number = 0;
    secondValue: number = 0;
    constructor(command: Buffer) {
        this.setCommand(command.toString());
    }
    private setCommand(command: string): void {
        let whitespaceIndex: number;
        whitespaceIndex = command.indexOf(" ");
        if (command.slice(0, whitespaceIndex) === MouseCommands.DrawRectangle) {
            console.log(`ok`);

            this.name = command.slice(0, whitespaceIndex);
            this.value = Number(command.slice(whitespaceIndex, command.lastIndexOf(" ")));
            this.secondValue = Number(command.slice(command.lastIndexOf(" "), command.length));
            return;
        }
        if (whitespaceIndex <= -1) this.name = command;
        else {
            this.name = command.slice(0, whitespaceIndex);
            this.value = Number(command.slice(whitespaceIndex, command.length));
        }
    }
}

export { CommandsDto };
