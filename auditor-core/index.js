// ========================================
// OBSERVATORY CORE ORCHESTRATOR
// ========================================

import { CONFIG } from "../config/config.js";
import { Trace } from "./runtime/tracer.js";
import { RuntimeStore } from "./runtime/runtimeStore.js";
import { Bus } from "./runtime/bus.js";

export const Observatory = {

    started: false,

    start() {

        if (this.started) return;

        this.started = true;

        RuntimeStore.init?.();
        Bus.init?.();

        Trace.log({
            type: "SYSTEM_BOOT",
            source: "Observatory",
            message: `${CONFIG.APP_NAME} booting`
        });

        Trace.log({
            type: "SYSTEM_READY",
            source: "Observatory",
            message: `${CONFIG.APP_NAME} ready`
        });
    }
};