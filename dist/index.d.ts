export interface ClassType {
    ignore: boolean;
    className: string;
}
export declare type BemInput = ClassType | string | null | undefined;
export declare type BemInputType = BemInput;
export declare const createBem: (componentName: string) => (...classNames: BemInput[]) => string;
