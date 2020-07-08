"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBem = void 0;
const pipe_1 = require("@oly_op/pipe");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const isNull = (val) => val === null;
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
        if (isEmpty_1.default(className)) {
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
    else if (isEmpty_1.default(className)) {
        return componentName;
    }
    else {
        return `${componentName}__${className}`;
    }
});
const joinToString = (classNames) => classNames.join(" ");
exports.createBem = (componentName) => (...classNames) => pipe_1.pipe(normalizeInput, mapBemValues(componentName), joinToString)(classNames);
