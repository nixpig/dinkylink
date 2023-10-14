export declare const listenToStream: (streamKey: string, groupName: string, consumerName: string, onMessage: (messageData: any, messageId: string) => Promise<void>) => Promise<never>;
