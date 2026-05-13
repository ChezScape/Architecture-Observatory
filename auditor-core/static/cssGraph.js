export function createCSSGraph() {

    return Array.from(document.styleSheets)
        .map((sheet) => ({
            href: sheet.href
        }));
}