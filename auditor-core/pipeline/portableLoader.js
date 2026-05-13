// ========================================
// PORTABLE LOADER
// ========================================

export const PortableLoader = {

    async load(file) {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = () => {

                resolve({
                    name: file.name,
                    size: file.size,
                    html: reader.result
                });
            };

            reader.onerror = reject;

            reader.readAsText(file);
        });
    }
};