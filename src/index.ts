const isNull = (val: unknown): val is null =>
	val === null

const isString = (val: unknown): val is string =>
	typeof val === "string"

const isBoolean = (val: unknown): val is boolean =>
	typeof val === "boolean"

const isUndefined = (val: unknown): val is undefined =>
	val === undefined

const isUpperCase = (x: string): boolean =>
	x === x.toUpperCase()

const isEmpty = (val: string | unknown[]) =>
	val.length === 0

export interface ClassType {
	remove?: boolean,
	ignore?: boolean,
	className: string,
}

export type BemInput =
	ClassType | string | boolean | null | undefined

export interface BemPropTypes {
	className?: BemInput,
}

const normalizeInput = (classNames: BemInput[]): ClassType[] =>
	classNames
		.map(className => {
			if (isBoolean(className) || isNull(className) || isUndefined(className)) {
				return { className: "", remove: true }
			} else if (isString(className)) {
				if (isEmpty(className)) {
					return { className }
				} else if (isUpperCase(className.charAt(0))) {
					return { className, ignore: true }
				} else {
					return { className }
				}
			} else {
				return className
			}
		})

const filterRemove = (classNames: ClassType[]) =>
	classNames.filter(({ remove }) => remove)

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
		(...classNames: BemInput[]): string => {
			const input = filterRemove(normalizeInput(classNames))
			const mappedInput = mapBemValues(componentName)(input)
			const bem = joinToString(mappedInput)
			return bem
		}