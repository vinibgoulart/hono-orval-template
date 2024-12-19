export enum QUEUE_CONTENT_NAME_ENUM {
  SYNCRONIZE = "SYNCRONIZE",
}

export type QueueContent = {
  name: QUEUE_CONTENT_NAME_ENUM;
};

export const MAIN_QUEUE = "main_queue";
