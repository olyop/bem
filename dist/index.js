"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBem = void 0;
const pipe_1 = require("@oly_op/pipe");
const lodash_1 = require("lodash");
const isUpperCase = (x) => x === x.toUpperCase();
const createClassType = (className, ignore = false) => ({ ignore, className });
const normalizeInput = (classNames) => classNames
    .map((className) => {
    if (lodash_1.isNull(className) || lodash_1.isUndefined(className)) {
        return createClassType("", true);
    }
    else if (lodash_1.isString(className)) {
        if (lodash_1.isEmpty(className)) {
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
    else if (lodash_1.isEmpty(className)) {
        return componentName;
    }
    else {
        return `${componentName}__${className}`;
    }
});
const joinToString = (classNames) => classNames.join(" ");
exports.createBem = (componentName) => (...classNames) => pipe_1.pipe(normalizeInput, mapBemValues(componentName), joinToString)(classNames);
//# sourceMappingURL=index.js.map