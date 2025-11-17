const is_exec = (value) => {
    return Array.isArray(value) && (typeof value[0] === 'string') && value[0].startsWith('@');
};

const flatten = (...css) => 
    css.reduce((acc, group) => acc.concat(group), []);

const exec = (refs, [predicate, ...args]) => {
    const core = {
        '@': (name) => refs[name],
        '@!': (name) => name,
        // '@x': (name, ...args) => process({ ...refs, ...process(refs, args) }, refs[name]),
        '@@': (extension, expression) => process({ ...refs, ...process(refs, extension) }, expression),

        '@if': (condition, a, b) => process(refs, condition) ? process(refs, a) : process(refs, b),
        '@==': (a, b) => process(refs, a) === process(refs, b),

        // Array stuff
        '@at': (cs, key) => process(refs, cs)[process({ ...refs, key }, key)] ?? null,
        '@concat': (...css) => flatten(...css.map((cs) => process(refs, cs))),
        '@len': (cs) => process(refs, cs).length,
        '@slice': (cs, a) => process(refs, cs).slice(process(refs, a)),
        
        // Calc
        '@*': (a, b) => process(refs, a) * process(refs, b),
        '@/': (a, b) => process(refs, a) / process(refs, b),
        '@-': (a, b) => process(refs, a) - process(refs, b),
        '@+': (a, b) => process(refs, a) + process(refs, b),

        // Objects
        // '@at'
        // '@merge': (a, b) => ({ ...process(refs, a), ...process(refs, b) }),
    };

    for (let key in refs) {
        if (is_exec(refs[key])) {
            core['@' + key] = (...args) => process({ ...refs, ...process(refs, args) }, refs[key]);
        }
    }

    if (!core[predicate]) {
        throw new Error(`Ref ${predicate} is not defined`);
    }

    return core[predicate](...args);
};

export const process = (refs, value) => {
    if (is_exec(value)) {
        return exec(refs, value);
    }

    if (Array.isArray(value)) {
        return value.map((item, index) => {
            return process({ ...refs, index }, item);
        });
    }

    if (value === null) {
        return null;
    }

    if (typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([index, $]) => {
                return [index, process({ ...refs, index }, $)];
            })
        );
    }

    return value;
};
