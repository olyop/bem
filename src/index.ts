import pipe from "@oly_op/pipe"

const isNull =
	(val: unknown): val is null =>
		val === null

const isString =
	(val: unknown): val is string =>
		typeof val === "string"

const isBoolean =
	(val: unknown): val is boolean =>
		typeof val === "boolean"

const isUndefined =
	(val: unknown): val is undefined =>
		val === undefined

const isFirstCharUpperCase =
	(x: string): boolean =>
		x === x.charAt(0).toUpperCase()

const isEmpty =
	(val: string | unknown[]) =>
		val.length === 0

const normalizeInput =
	(classNames: BEMInput[]): BEMClassType[] =>
		classNames
			.map(
				className => {
					if (isBoolean(className) || isNull(className) || isUndefined(className)) {
						return { className: "", remove: true }
					} else if (isString(className)) {
						if (isEmpty(className)) {
							return { className }
						} else if (isFirstCharUpperCase(className)) {
							return { className, ignore: true }
						} else {
							return { className }
						}
					} else {
						return className
					}
				},
			)

const filterRemove =
	(classNames: BEMClassType[]) =>
		classNames.filter(({ remove }) => !remove)

const mapBEMValues =
	(componentName: string) =>
		(classNames: BEMClassType[]) =>
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

const joinToString =
	(classNames: string[]) =>
		classNames.join(" ")

export const createBEM =
	(componentName: string) =>
		(...classNames: BEMInput[]): string =>
			pipe(
				normalizeInput,
				filterRemove,
				mapBEMValues(componentName),
				joinToString,
			)(classNames)

export interface BEMClassType {
	remove?: boolean,
	ignore?: boolean,
	className: string,
}

export type BEMInput =
	BEMClassType | string | boolean | null | undefined

export interface BEMPropTypes {
	className?: BEMInput,
}