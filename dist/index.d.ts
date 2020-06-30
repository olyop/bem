export interface ClassType {
    ignore: boolean;
    className: string;
}
export declare type BemInputType = ClassType | string | null | undefined;
export declare const createBem: (componentName: string) => (...classNames: BemInputType[]) => string;
