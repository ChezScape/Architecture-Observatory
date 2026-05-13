import fs from "fs";

export const BuildController = {

    mode: "dev",

    setMode(mode) {
        this.mode = mode;
    },

    getMode() {
        return this.mode;
    },

    log(message) {
        console.log(`[BUILD:${this.mode.toUpperCase()}]`, message);
    }
};