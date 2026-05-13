// ========================================
// PORTABLE ANALYSIS BRIDGE
// ========================================

export class PortableAnalysisBridge {

    static analyse(html) {

        const report = {

            length: html.length,

            scripts:
                (html.match(/<script/gi) || []).length,

            styles:
                (html.match(/<style/gi) || []).length,

            buttons:
                (html.match(/<button/gi) || []).length,

            divs:
                (html.match(/<div/gi) || []).length,

            possibleInlineEvents:
                (html.match(/onclick=|onchange=|oninput=/gi) || []).length,

            possibleRisks: []
        };

        // --------------------------------
        // DETECT COMMON RISKS
        // --------------------------------

        if (report.scripts > 20) {

            report.possibleRisks.push(
                "High script count detected"
            );
        }

        if (report.possibleInlineEvents > 10) {

            report.possibleRisks.push(
                "Heavy inline event usage"
            );
        }

        if (html.includes("eval(")) {

            report.possibleRisks.push(
                "eval() detected"
            );
        }

        if (html.includes("innerHTML")) {

            report.possibleRisks.push(
                "innerHTML mutation usage"
            );
        }

        return report;
    }
}