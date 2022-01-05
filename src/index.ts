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

const isUpperCase =
	(x: string): boolean =>
		x === x.toUpperCase()

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
						} else if (isUpperCase(className.charAt(0))) {
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
	(classNames: BEMClassType[], componentName: string) =>
		classNames.map(
			({ ignore, className }) => {
				if (ignore) {
					return className
				} else if (isEmpty(componentName)) {
					return className
				} else if (isEmpty(className)) {
					return componentName
				} else {
					return `${componentName}__${className}`
				}
			},
		)

const joinToString =
	(classNames: string[]) => (
		isEmpty(classNames) ?
			undefined :
			classNames.join(" ")
	)

export const createBEM =
	(componentName: string) =>
		(...classNames: BEMInput[]) =>
			joinToString(
				mapBEMValues(
					filterRemove(
						normalizeInput(classNames),
					),
					componentName,
				),
			)

export interface BEMClassType {
	remove?: boolean,
	ignore?: boolean,
	className: string,
}

export type BEMInput =
	BEMClassType | string | boolean | undefined | null