export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter !== null && delimiter !== undefined) {
            this.delimiter = delimiter;
        }
    }

    /** Returns human-readable representation of Name instance */
    /** @methodtype: conversion method */
    public asNameString(delimiter: string = this.delimiter): string {
        const escapedComponents = this.components.map(name =>
            name.includes(delimiter) ? name.replace(new RegExp(delimiter, 'g'), this.ESCAPE_CHARACTER + delimiter) : name
        );
        return escapedComponents.join(delimiter);
    }

    /** @methodtype: getter method */
    public getComponent(i: number): string {
        if (this.isNumberInRange(i)) {
            return this.components[i];
        }
        throw new Error("IndexOutOfBoundsException");
    }

    /** @methodtype: setter method */
    public setComponent(i: number, c: string): void {
        if (this.isNumberInRange(i)) {
            this.components[i] = c;
        } else {
            throw new Error("IndexOutOfBoundsException");
        }
    }

    /** Returns number of components in Name instance */
    /** @methodtype: getter method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** @methodtype: command-method */
    public insert(i: number, c: string): void {
        if (i !== undefined && i >= 0 && i <= this.components.length) {
            this.components.splice(i, 0, c);
        } else {
            throw new Error("IndexOutOfBoundsException");
        }
    }

    /** @methodtype: command-method */
    public append(c: string): void {
        this.components.push(c);
    }

    /** @methodtype: command-method */
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

    /** @methodtype: boolean query method */
    private isNumberInRange(i: number): boolean {
        return i !== undefined && i >= 0 && i < this.components.length;
    }

}