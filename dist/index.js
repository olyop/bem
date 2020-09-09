const isNull = (val) => val === null;
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isUndefined = (val) => val === undefined;
const isUpperCase = (x) => x === x.toUpperCase();
const isEmpty = (val) => val.length === 0;
const normalizeInput = (classNames) => classNames
    .map(className => {
    if (isBoolean(className) || isNull(className) || isUndefined(className)) {
        return { className: "", remove: true };
    }
    else if (isString(className)) {
        if (isEmpty(className)) {
            return { className };
        }
        else if (isUpperCase(className.charAt(0))) {
            return { className, ignore: true };
        }
        else {
            return { className };
        }
    }
    else {
        return className;
    }
});
const filterRemove = (classNames) => classNames.filter(({ remove }) => remove);
const mapBemValues = (componentName) => (classNames) => classNames.map(({ ignore, className }) => {
    if (ignore) {
        return className;
    }
    else if (isEmpty(className)) {
        return componentName;
    }
    else {
        return `${componentName}__${className}`;
    }
});
const joinToString = (classNames) => classNames.join(" ");
export const createBem = (componentName) => (...classNames) => {
    const input = filterRemove(normalizeInput(classNames));
    const mappedInput = mapBemValues(componentName)(input);
    const bem = joinToString(mappedInput);
    return bem;
};
