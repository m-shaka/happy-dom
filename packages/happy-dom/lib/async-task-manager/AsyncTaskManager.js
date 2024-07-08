// We need to set this as a global constant, so that using fake timers in Jest and Vitest won't override this on the global object.
const TIMER = {
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    clearImmediate: globalThis.clearImmediate.bind(globalThis)
};
/**
 * Handles async tasks.
 */
class AsyncTaskManager {
    constructor() {
        this.runningTasks = {};
        this.runningTaskCount = 0;
        this.runningTimers = [];
        this.runningImmediates = [];
        this.waitUntilCompleteTimer = null;
        this.waitUntilCompleteResolvers = [];
    }
    /**
     * Returns a promise that is resolved when async tasks are complete.
     *
     * @returns Promise.
     */
    waitUntilComplete() {
        return new Promise((resolve) => {
            this.waitUntilCompleteResolvers.push(resolve);
            this.endTask(this.startTask());
        });
    }
    /**
     * Aborts all tasks.
     */
    abort() {
        return this.abortAll(false);
    }
    /**
     * Destroys the manager.
     */
    destroy() {
        return this.abortAll(true);
    }
    /**
     * Starts a timer.
     *
     * @param timerID Timer ID.
     */
    startTimer(timerID) {
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        this.runningTimers.push(timerID);
    }
    /**
     * Ends a timer.
     *
     * @param timerID Timer ID.
     */
    endTimer(timerID) {
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        const index = this.runningTimers.indexOf(timerID);
        if (index !== -1) {
            this.runningTimers.splice(index, 1);
        }
        if (!this.runningTaskCount && !this.runningTimers.length && !this.runningImmediates.length) {
            this.resolveWhenComplete();
        }
    }
    /**
     * Starts an immediate.
     *
     * @param immediateID Immediate ID.
     */
    startImmediate(immediateID) {
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        this.runningImmediates.push(immediateID);
    }
    /**
     * Ends an immediate.
     *
     * @param immediateID Immediate ID.
     */
    endImmediate(immediateID) {
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        const index = this.runningImmediates.indexOf(immediateID);
        if (index !== -1) {
            this.runningImmediates.splice(index, 1);
        }
        if (!this.runningTaskCount && !this.runningTimers.length && !this.runningImmediates.length) {
            this.resolveWhenComplete();
        }
    }
    /**
     * Starts an async task.
     *
     * @param abortHandler Abort handler.
     * @returns Task ID.
     */
    startTask(abortHandler) {
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        const taskID = this.newTaskID();
        this.runningTasks[taskID] = abortHandler ? abortHandler : () => { };
        this.runningTaskCount++;
        return taskID;
    }
    /**
     * Ends an async task.
     *
     * @param taskID Task ID.
     */
    endTask(taskID) {
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        if (this.runningTasks[taskID]) {
            delete this.runningTasks[taskID];
            this.runningTaskCount--;
        }
        if (!this.runningTaskCount && !this.runningTimers.length && !this.runningImmediates.length) {
            this.resolveWhenComplete();
        }
    }
    /**
     * Returns the amount of running tasks.
     *
     * @returns Count.
     */
    getTaskCount() {
        return this.runningTaskCount;
    }
    /**
     * Returns a new task ID.
     *
     * @returns Task ID.
     */
    newTaskID() {
        this.constructor.taskID++;
        return this.constructor.taskID;
    }
    /**
     * Resolves when complete.
     */
    resolveWhenComplete() {
        if (this.runningTaskCount || this.runningTimers.length || this.runningImmediates.length) {
            return;
        }
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        // It is not possible to detect when all microtasks are complete (such as process.nextTick() or promises).
        // To cater for this we use setTimeout() which has the lowest priority and will be executed last.
        // @see https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
        this.waitUntilCompleteTimer = TIMER.setTimeout(() => {
            this.waitUntilCompleteTimer = null;
            if (!this.runningTaskCount && !this.runningTimers.length && !this.runningImmediates.length) {
                const resolvers = this.waitUntilCompleteResolvers;
                this.waitUntilCompleteResolvers = [];
                for (const resolver of resolvers) {
                    resolver();
                }
            }
        });
    }
    /**
     * Aborts all tasks.
     *
     * @param destroy Destroy.
     */
    abortAll(destroy) {
        const runningTimers = this.runningTimers;
        const runningImmediates = this.runningImmediates;
        const runningTasks = this.runningTasks;
        this.runningTasks = {};
        this.runningTaskCount = 0;
        this.runningImmediates = [];
        this.runningTimers = [];
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        for (const immediate of runningImmediates) {
            TIMER.clearImmediate(immediate);
        }
        for (const timer of runningTimers) {
            TIMER.clearTimeout(timer);
        }
        const taskPromises = [];
        for (const key of Object.keys(runningTasks)) {
            const returnValue = runningTasks[key](destroy);
            if (returnValue instanceof Promise) {
                taskPromises.push(returnValue);
            }
        }
        if (taskPromises.length) {
            return Promise.all(taskPromises)
                .then(() => this.waitUntilComplete())
                .catch((error) => {
                /* eslint-disable-next-line no-console */
                console.error(error);
                throw error;
            });
        }
        // We need to wait for microtasks to complete before resolving.
        return this.waitUntilComplete();
    }
}
AsyncTaskManager.taskID = 0;
export default AsyncTaskManager;
//# sourceMappingURL=AsyncTaskManager.js.map