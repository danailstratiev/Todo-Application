export type Listener = {
    targetId: string,
    eventType: string,
    callback(): void
}