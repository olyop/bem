export interface ClassType {
    remove?: boolean;
    ignore?: boolean;
    className: string;
}
export declare type BemInput = ClassType | string | boolean | null | undefined;
export interface BemPropTypes {
    className?: BemInput;
}
export declare const createBem: (componentName: string) => (...classNames: BemInput[]) => string;
