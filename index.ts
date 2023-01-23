import * as ws from "ws";
import { httpServer } from "./src/http_server/index.js";
import { CommandsDto } from "./src/dto/Command.js";
import { MouseCommands } from "./src/constants/index";
import { ICommandsDto } from "./src/types/index.js";
import CommandService from "./src/commands.js";

const HTTP_PORT: number = 8181;
const WS_PORT: number = 8080;
const WSServer = new ws.WebSocketServer({ port: WS_PORT });

let commands: ICommandsDto;

WSServer.on("connection", (socket: ws.WebSocket): void => {
    console.log(`User is connected.`);
    socket.on("message", async (data: Buffer) => {
        const { name: command, value, secondValue } = new CommandsDto(data);
        switch (command) {
            case MouseCommands.Up:
                await CommandService.moveUp(socket, value);
                break;
            case MouseCommands.Down:
                await CommandService.moveDown(socket, value);
                break;
            case MouseCommands.Right:
                await CommandService.moveRight(socket, value);
                break;
            case MouseCommands.Left:
                await CommandService.moveLeft(socket, value);
                break;
            case MouseCommands.Position:
                await CommandService.getPosition(socket);
                break;
            case MouseCommands.DrawSquare:
                await CommandService.DrawSquare(socket, value);
                break;
            case MouseCommands.DrawRectangle:
                await CommandService.DrawRectangle(socket, value, secondValue);
                break;
            case MouseCommands.PrintScreen:
                await CommandService.PrintScreen(socket);
                break;
            default:
                break;
        }
    });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

export { commands };
