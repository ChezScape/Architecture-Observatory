// ========================================
// PORTABLE ANALYSIS BRIDGE
// ========================================

export class PortableAnalysisBridge {

    static analyse(html = "") {

        const report = {

            size:
                html.length,

            scripts:
                (html.match(/<script/gi) || []).length,

            styles:
                (html.match(/<style/gi) || []).length,

            buttons:
                (html.match(/<button/gi) || []).length,

            divs:
                (html.match(/<div/gi) || []).length,

            inlineEvents:
                (
                    html.match(
                        /onclick=|onchange=|oninput=|onmouseover=/gi
                    ) || []
                ).length,

            evalUsage:
                html.includes("eval("),

            innerHTMLUsage:
                html.includes("innerHTML"),

            possibleRisks: [],

            architectureScore: 100
        };

        // ====================================
        // RISK DETECTION
        // ====================================

        if (report.scripts > 20) {

            report.possibleRisks.push(
                "High script count"
            );

            report.architectureScore -= 10;
        }

        if (report.inlineEvents > 10) {

            report.possibleRisks.push(
                "Heavy inline event usage"
            );

            report.architectureScore -= 15;
        }

        if (report.evalUsage) {

            report.possibleRisks.push(
                "eval() detected"
            );

            report.architectureScore -= 20;
        }

        if (report.innerHTMLUsage) {

            report.possibleRisks.push(
                "innerHTML mutations detected"
            );

            report.architectureScore -= 10;
        }

        if (report.divs > 300) {

            report.possibleRisks.push(
                "Possible DOM bloat"
            );

            report.architectureScore -= 10;
        }

        if (report.architectureScore < 0) {

            report.architectureScore = 0;
        }

        return report;
    }
}