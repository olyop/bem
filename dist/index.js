const isNull = (val) => val === null;
const isEmpty = (val) => val.length === 0;
const isString = (val) => typeof val === "string";
const isUndefined = (val) => val === undefined;
const isUpperCase = (x) => x === x.toUpperCase();
const createClassType = (className, ignore = false) => ({ ignore, className });
const normalizeInput = (classNames) => classNames
    .map((className) => {
    if (isNull(className) || isUndefined(className)) {
        return createClassType("", true);
    }
    else if (isString(className)) {
        if (isEmpty(className)) {
            return createClassType(className);
        }
        else if (isUpperCase(className.charAt(0))) {
            return createClassType(className, true);
        }
        else {
            return createClassType(className);
        }
    }
    else {
        return className;
    }
})
    .filter((className) => className !== null);
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
    const input = normalizeInput(classNames);
    const mappedInput = mapBemValues(componentName)(input);
    const bem = joinToString(mappedInput);
    return bem;
};
//# sourceMappingURL=index.js.map