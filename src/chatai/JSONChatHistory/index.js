/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { BaseListChatMessageHistory } from "@langchain/core/chat_history";
import {
  // type BaseMessage,
  // type StoredMessage,
  mapChatMessagesToStoredMessages,
  mapStoredMessagesToChatMessages,
} from "@langchain/core/messages";
import fs from "node:fs";
import path from "node:path";

// export interface JSONChatHistoryInput {
//   sessionId: string;
//   dir: string;
// }

export class JSONChatHistory extends BaseListChatMessageHistory {
  lc_namespace = ["langchain", "stores", "message"];

  sessionId;
  dir;

  constructor(fields) {
    super(fields);
    this.sessionId = fields.sessionId;
    this.dir = fields.dir;
  }

  async getMessages() {
    const filePath = path.join(this.dir, `${this.sessionId}.json`);
    
    try {
      if (!fs.existsSync(filePath)) {
        await this.saveMessagesToFile([]);
        return [];
      }

      const data = fs.readFileSync(filePath, { encoding: "utf-8" });
      const storedMessages = JSON.parse(data);
      return mapStoredMessagesToChatMessages(storedMessages);
    } catch (error) {
      console.error(`Failed to read chat history from ${filePath}`, error);
      return [];
    }
  }

  async addMessage(message) {
    const messages = await this.getMessages();
    messages.push(message);
    await this.saveMessagesToFile(messages);
  }

  async addMessages(messages) {
    const existingMessages = await this.getMessages();
    const allMessages = existingMessages.concat(messages);
    await this.saveMessagesToFile(allMessages);
  }

  async clear() {
    const filePath = path.join(this.dir, `${this.sessionId}.json`);
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error(`Failed to clear chat history from ${filePath}`, error);
    }
  }

  async saveMessagesToFile(messages) {
    const filePath = path.join(this.dir, `${this.sessionId}.json`);
    const serializedMessages = mapChatMessagesToStoredMessages(messages);
    try {
      fs.writeFileSync(filePath, JSON.stringify(serializedMessages, null, 2), {
        encoding: "utf-8",
      });
    } catch (error) {
      console.error(`Failed to save chat history to ${filePath}`, error);
    }
  }
}
