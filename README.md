# Architecture-Observatory

auditor-core/
  static/
    domGraph.js
    jsGraph.js
    cssGraph.js

  runtime/
    tracer.js
    domInterceptor.js
    eventInterceptor.js
    stateTracker.js

  pipeline/
    instrumenter.js
    executionRecorder.js

  analysis/
    couplingEngine.js
    rootCauseEngine.js
    anomalyDetector.js

  output/
    graphBuilder.js
    explanationEngine.js

  viewer/
    traceViewer.js