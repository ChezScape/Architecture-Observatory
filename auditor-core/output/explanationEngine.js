export function explain(event) {

    return {
        title: event.type,
        description: `${event.type} triggered at ${event.timestamp}`
    };
}