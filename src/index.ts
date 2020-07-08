import { pipe } from "@oly_op/pipe"
import isEmpty from "lodash/isEmpty"

const isNull = (val: any): val is null =>
	val === null

const isString = (val: any): val is string =>
	typeof val === "string"

const isUndefined = (val: any): val is undefined =>
	val === undefined

export interface ClassType {
	ignore: boolean,
	className: string,
}

export type BemInput =
	ClassType | string | null | undefined

export type BemInputType = BemInput

const isUpperCase = (x: string): boolean =>
	x === x.toUpperCase()

const createClassType = (className: string, ignore = false): ClassType =>
	({ ignore, className })

const normalizeInput = (classNames: BemInput[]): ClassType[] =>
	classNames
		.map((className) => {
			if (isNull(className) || isUndefined(className)) {
				return createClassType("", true)
			} else if (isString(className)) {
				if (isEmpty(className)) {
					return createClassType(className)
				} else if (isUpperCase(className.charAt(0))) {
					return createClassType(className, true)
				} else {
					return createClassType(className)
				}
			} else {
				return className
			}
		})
		.filter((className) => className !== null)

const mapBemValues = (componentName: string) => (classNames: ClassType[]) =>
	classNames.map(
		({ ignore, className }) => {
			if (ignore) {
				return className
			} else if (isEmpty(className)) {
				return componentName
			} else {
				return `${componentName}__${className}`
			}
		},
	)

const joinToString = (classNames: string[]) =>
	classNames.join(" ")

export const createBem =
	(componentName: string) =>
		(...classNames: BemInput[]): string =>
			pipe(normalizeInput, mapBemValues(componentName), joinToString)(classNames)