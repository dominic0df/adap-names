import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter !== undefined && delimiter !== null) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        for (let component = 0; component < this.getNoComponents(); component++) {
            const part = this.getComponent(component).replaceAll(ESCAPE_CHARACTER, '');
            result = result + delimiter + part;
        }
        return result;
    }

    public toString(): string {
        return this.asString();
    }

    public asDataString(): string {
        let result = "";
        for (let component = 0; component < this.getNoComponents(); component++) {
            const part = this.getComponent(component).replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
            result = result + this.delimiter + part;
        }
        return result;
    }

    public isEqual(other: Name): boolean {
        return this.getHashCode() === other.getHashCode();
    }

    // polynomial hashing like in Java's hashCode function
    public getHashCode(): number {
        const prime = 31;
        const dataAsString = this.asDataString();
        let hash = 0;
        for (let charIndex = 0; charIndex < dataAsString.length; charIndex++) {
            hash = Math.imul(hash, prime) + dataAsString.charCodeAt(charIndex);
        }
        return hash;

    }

    public clone(): Name {
        return structuredClone(this);
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let component = 0; component < other.getNoComponents(); component++) {
            this.append(other.getComponent(component));
        }
    }

    protected isIndexInComponentsArrayBounds(i: number): boolean {
        if (i !== undefined && i >= 0 && i < this.getNoComponents()){
            return true;
        } else {
            throw new Error("index is out of bounds");
        };
    }

    protected isStringInsertableAtIndex(i: number): boolean{
        if (i !== undefined && i >= 0 && i <= this.getNoComponents()) {
            return true;
        } else {
            throw new Error("index is out of bounds");
        }
    }

    protected isStringNotNull(c: string): boolean {
        if(c!== null){
            return true;
        } else {
            throw new Error("component string must not be null");
        }
    }
}