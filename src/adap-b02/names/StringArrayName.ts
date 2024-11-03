import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter !== null && delimiter !== undefined) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components
            .map((substring) =>
                substring.replaceAll(ESCAPE_CHARACTER, ''))
            .join(delimiter);
    }

    public asDataString(): string {
        return this.components.map((substring) => substring
            .replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter))
            .join(this.delimiter);
    }

    /** @methodtype: boolean query method */
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    /** @methodtype: getter method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /** Returns number of components in Name instance */
    /** @methodtype: getter method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** @methodtype: getter method */
    public getComponent(i: number): string {
        if (this.isIndexInComponentsArrayBounds(i)) {
            return this.components[i];
        }
        throw new Error("index is out of bounds");
    }

    /** @methodtype: setter method */
    public setComponent(i: number, c: string): void {
        if (this.isIndexInComponentsArrayBounds(i)) {
            if (c !== null) {
                this.components[i] = c;
            } else {
                throw new Error("component string must not be null");
            }
        } else {
            throw new Error("index is out of bounds");
        }
    }

    /** @methodtype: command-method */
    public insert(i: number, c: string): void {
        if (i !== undefined && i >= 0 && i <= this.components.length) {
            if (c !== null) {
                this.components.splice(i, 0, c);
            } else {
                throw new Error("component string must not be null");
            }
        } else {
            throw new Error("index is out of bounds");
        }
    }

    /** @methodtype: command-method */
    public append(c: string): void {
        this.components.push(c);
    }

    /** @methodtype: command-method */
    public remove(i: number): void {
        if (this.isIndexInComponentsArrayBounds(i)) {
            this.components.splice(i, 1);
        } else {
            throw new Error("index is out of bounds");
        }
    }

    public concat(other: Name): void {
        if (this.delimiter !== other.getDelimiterCharacter()) {
            throw new Error("names must have the same delimiters for concatination");
        }
        for (let componentIndex = 0; componentIndex < other.getNoComponents(); componentIndex++) {
            let component = other.getComponent(componentIndex);
            this.append(component);
        }
    }

    private isIndexInComponentsArrayBounds(i: number): boolean {
        return i !== undefined && i >= 0 && i < this.components.length;
    }
}