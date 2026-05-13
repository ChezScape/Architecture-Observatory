const executionStore = [];

export function recordExecution(event) {

    executionStore.push({
        timestamp: Date.now(),
        ...event
    });
}

export function getExecutions() {
    return executionStore;
}