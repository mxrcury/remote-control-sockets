import { down, FileType, left, mouse, providerRegistry, Region, right, ScreenClass, up } from "@nut-tree/nut-js";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocket } from "ws";
import { commands } from "..";
import { MouseCommands } from "./constants";

// interface ICommandService {
//   moveUp: (socket: WebSocket, value: number) => Promise<void>;
//   moveDown: (socket: WebSocket, value: number) => Promise<void>;
//   moveRight: (socket: WebSocket, value: number) => Promise<void>;
//   moveLeft: (socket: WebSocket, value: number) => Promise<void>;
// }

class CommandService {
  static async moveUp(socket: WebSocket, value: number): Promise<void> {
    await mouse.move(up(value));
    socket.send(MouseCommands.Up);
  }
  static async moveDown(socket: WebSocket, value: number): Promise<void> {
    await mouse.move(down(value));
    socket.send(MouseCommands.Down);
  }
  static async moveRight(socket: WebSocket, value: number): Promise<void> {
    await mouse.move(right(value));
    socket.send(MouseCommands.Right);
  }
  static async moveLeft(socket: WebSocket, value: number): Promise<void> {
    await mouse.move(left(value));
    socket.send(MouseCommands.Left);
  }
  static async getPosition(socket: WebSocket): Promise<void> {
    const position = await mouse.getPosition();
    socket.send(`${MouseCommands.Position} ${position.x},${position.y}`);
  }
  static async DrawSquare(socket: WebSocket, value: number): Promise<void> {
    await mouse.drag(up(value));
    await mouse.drag(right(value));
    await mouse.drag(down(value));
    await mouse.drag(left(value));
    socket.send(MouseCommands.DrawSquare);
  }
  static async DrawRectangle(socket: WebSocket, value: number, secondValue: number): Promise<void> {
    await mouse.drag(up(value));
    await mouse.drag(right(secondValue));
    await mouse.drag(down(value));
    await mouse.drag(left(secondValue));
    socket.send(MouseCommands.DrawRectangle);
  }
  static async PrintScreen(socket: WebSocket): Promise<void> {
    const screenshotPath = path.join(fileURLToPath(import.meta.url), "../../front/assets/screenshots");
    const screen = new ScreenClass(providerRegistry);
    const screenshotName = "screenshot";
    const screenshot = await screen.captureRegion(
      screenshotName,
      new Region(50, 50, 200, 200),
      FileType.PNG,
      screenshotPath
    );
    socket.send(`${MouseCommands.PrintScreen} ${screenshot}`);
  }
}

export default CommandService;
