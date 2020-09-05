const isNull = (val: unknown): val is null =>
	val === null

const isEmpty = (val: string) =>
	val.length === 0

const isString = (val: unknown): val is string =>
	typeof val === "string"

const isUndefined = (val: unknown): val is undefined =>
	val === undefined

const isUpperCase = (x: string): boolean =>
	x === x.toUpperCase()

export interface ClassType {
	ignore: boolean,
	className: string,
}

export type BemInput =
	ClassType | string | null | undefined

export interface BemPropTypes {
	className: BemInput,
}

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
		(...classNames: BemInput[]): string => {
			const input = normalizeInput(classNames)
			const mappedInput = mapBemValues(componentName)(input)
			const bem = joinToString(mappedInput)
			return bem
		}