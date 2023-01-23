import { Region, ScreenClass, centerOf, down, left, mouse, providerRegistry, right, straightTo, up, FileType } from "@nut-tree/nut-js";
import * as ws from 'ws';
import { httpServer } from "./src/http_server/index.js";
import { CommandsDto } from "./src/dto/Command.js";
import { MouseCommands } from './src/constants/index';
import path from "path";
import { fileURLToPath } from "url";
const HTTP_PORT = 8181;
const WS_PORT = 8080;
const WSServer = new ws.WebSocketServer({ port: WS_PORT });
WSServer.on('connection', (socket) => {
    console.log(`User is connected.`);
    socket.on('message', async (data) => {
        // console.log(data.toString());
        const { name: command, value, secondValue } = new CommandsDto(data);
        console.log(command);
        switch (command) {
            case MouseCommands.Up:
                console.log(command, value);
                await mouse.move(up(value));
                socket.send(MouseCommands.Up);
                break;
            case MouseCommands.Down:
                await mouse.move(down(value));
                socket.send(MouseCommands.Down);
                break;
            case MouseCommands.Right:
                await mouse.move(right(value));
                socket.send(MouseCommands.Right);
                break;
            case MouseCommands.Left:
                await mouse.move(left(value));
                socket.send(MouseCommands.Left);
                break;
            case MouseCommands.Position:
                const position = await mouse.getPosition();
                socket.send(`${MouseCommands.Position} ${position.x},${position.y}`);
                break;
            // MOuses are ready
            case MouseCommands.DrawSquare:
                await mouse.drag(straightTo(centerOf(new Region(value, secondValue, value, secondValue))));
                // await mouse.drag(up(value))
                // await mouse.drag(right(value))
                // await mouse.drag(down(value))
                // await mouse.drag(left(value))
                break;
            case MouseCommands.DrawRectangle:
                await mouse.drag(up(value));
                await mouse.drag(right(secondValue));
                await mouse.drag(down(value));
                await mouse.drag(left(secondValue));
                break;
            case MouseCommands.PrintScreen:
                const screenshotPath = path.join(fileURLToPath(import.meta.url), '../front/assets/screenshots');
                const screen = new ScreenClass(providerRegistry);
                const screenshotName = 'screenshot';
                const screenshot = await screen.captureRegion(screenshotName, new Region(50, 50, 200, 200), FileType.PNG, screenshotPath);
                socket.send(`${MouseCommands.PrintScreen} ${screenshot}`);
                break;
            default:
                break;
        }
    });
});
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
(async () => {
    // centerOf(new Region(0, 100, 200, 100))
    // await mouse.drag();
    // await mouse.drag(new Region())
    // await mouse.drag(right(100))
    // await mouse.drag(down(100))
    // await mouse.drag(left(100))
})();
