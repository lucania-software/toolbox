export type TimerCallback = (label: string, duration: number) => void;
export declare class Clock {
    private _creationTime;
    private _lastTimeCheck;
    private _timers;
    constructor();
    get now(): number;
    get deltaTime(): number;
    get age(): number;
    /**
     * Creates a timer that can be queried for completion with {@link hasTimerElapsed}.
     * @param label The identifier for this timer.
     * @param duration The duration of the timer in seconds.
     * @param callback An optional callback to execute when the timer completes.
     */
    createTimer(label: string, duration: number, callback?: TimerCallback): void;
    removeTimer(label: string): void;
    hasTimerElapsed(label: string): boolean;
}
