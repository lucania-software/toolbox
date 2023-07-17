export type TimerCallback = (label: string, duration: number) => void;

export class Clock {

    private _creationTime: number;
    private _lastTimeCheck: number;
    private _timers: {
        [Label: string]: {
            duration: number,
            lastTriggerTime: number,
            callback?: TimerCallback;
        }
    };

    public constructor() {
        this._creationTime = this.now;
        this._lastTimeCheck = this._creationTime;
        this._timers = {};
    }

    public get now() {
        return performance.now() / 1000;
    }

    public get deltaTime() {
        const deltaTime = this.now - this._lastTimeCheck;
        this._lastTimeCheck = this.now;
        return deltaTime;
    }

    public get age() {
        return this.now - this._creationTime;
    }

    /**
     * Creates a timer that can be queried for completion with {@link hasTimerElapsed}.
     * @param label The identifier for this timer.
     * @param duration The duration of the timer in seconds.
     * @param callback An optional callback to execute when the timer completes.
     */
    public createTimer(label: string, duration: number, callback?: TimerCallback) {
        this._timers[label] = { duration, lastTriggerTime: this.now };
        if (callback !== undefined) {
            setTimeout(() => callback(label, duration), duration);
        }
    }

    public removeTimer(label: string) {
        delete this._timers[label];
    }

    public hasTimerElapsed(label: string) {
        if (label in this._timers) {
            const timer = this._timers[label];
            if (this.now - timer.lastTriggerTime > timer.duration) {
                timer.lastTriggerTime = this.now;
                return true;
            }
            return false;
        } else {
            throw new Error(`No timer exists with label ${label}. Make sure to create one first with Clock.createTimer().`);
        }
    }

}