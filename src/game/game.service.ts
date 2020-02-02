import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {
  createGame(data) {
    return Math.floor(Math.random() * 11);
  }
  getGame(id) {
    return {
      stepNumber: 0,
      sequences: ["X", "0"],
      squares: Array(Math.pow(3, 2)).fill(null)
    };
  }

  updateGame(id, data) {
    return {
      stepNumber: 0,
      sequences: ["X", "0"],
      squares: Array(Math.pow(3, 2)).fill(null)
    };
  }
}
