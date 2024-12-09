import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {InvalidStateException} from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
        this.assertClassInvariants();
    }

    public clone(): Name {
        this.assertClassInvariants();
        return structuredClone(this);
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertIsValidDelimiterCharacter(delimiter);
        let result = "";
        for (let component = 0; component < this.getNoComponents(); component++) {
            let part = this.getComponent(component).replaceAll(ESCAPE_CHARACTER, '');
            if (result !== ""){
                result = result + delimiter + part;
            } else {
                result = part;
            }
        }
        return result;
    }

    public toString(): string {
        this.assertClassInvariants();
        return this.asString();
    }

    public asDataString(): string {
        this.assertClassInvariants();
        let result = "";
        for (let component = 0; component < this.getNoComponents(); component++) {
            const part = this.getComponent(component).replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
            result = result + this.delimiter + part;
        }
        return result;
    }

    public isEqual(other: Name): boolean {
        if (other === null || !(other instanceof AbstractName)) return false;
        return this.asDataString() === other.asDataString();
    }

    // polynomial hashing like in Java's hashCode function
    public getHashCode(): number {
        this.assertClassInvariants();
        const prime = 31;
        const dataAsString = this.asDataString();
        let hash = 0;
        for (let charIndex = 0; charIndex < dataAsString.length; charIndex++) {
            hash = Math.imul(hash, prime) + dataAsString.charCodeAt(charIndex);
        }
        return hash;
    }

    public isEmpty(): boolean {
        this.assertClassInvariants();
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        this.assertClassInvariants();
        return this.delimiter;
    }

    public setComponent(i: number, c: string): Name {
        this.assertIndexIsInComponentsArrayBounds(i);
        this.assertStringIsNotNull(c);
        const newComponents = [...this.getComponents()];
        newComponents[i] = c;
        return this.doCreate(newComponents, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        this.assertStringIsInsertableAtIndex(i);
        this.assertStringIsNotNull(c);
        const newComponents = [...this.getComponents()];
        newComponents.splice(i, 0, c);
        return this.doCreate(newComponents, this.delimiter);
    }

    public append(c: string): Name {
        this.assertStringIsNotNull(c);
        const newComponents = [...this.getComponents()];
        newComponents.push(c);
        return this.doCreate(newComponents, this.delimiter);
    }

    public remove(i: number): Name {
        this.assertIndexIsInComponentsArrayBounds(i)
        const newComponents = [...this.getComponents()];
        newComponents.splice(i, 1);
        return this.doCreate(newComponents, this.delimiter);
    }

    public concat(other: Name): Name {
        const myComponents = this.getComponents();
        const otherComponents = other.getComponents();
        const combined = [...myComponents, ...otherComponents];
        return this.doCreate(combined, this.delimiter);
    }

    public abstract getNoComponents(): number;

    public abstract getComponent(i: number): string;

    public abstract getComponents(): string[];

    public abstract doCreate(components: string[], delimiter: string): Name;

    //#############################################################//
    // Design by Contract helper methods

    protected assertIndexIsInComponentsArrayBounds(i: number) {
        const condition = i >= 0 && i < this.getNoComponents();
        IllegalArgumentException.assert(condition, "index out of bounds");
    }

    protected assertStringIsInsertableAtIndex(i: number) {
        const condition = i >= 0 && i <= this.getNoComponents();
        IllegalArgumentException.assert(condition, "index out of bounds");
    }

    protected assertStringIsNotNull(c: string) {
        const isNotUndefined = c != undefined;
        IllegalArgumentException.assert(isNotUndefined, "input string must not be undefined");
    }

    protected assertValidDelimiterCharacter(delimiter: string){
        let condition: boolean = delimiter.length == 1;
        InvalidStateException.assert(condition, "invalid delimiter char");
    }

    protected assertIsValidDelimiterCharacter(delimiter: string){
        const isNotUndefined = delimiter != undefined;
        IllegalArgumentException.assert(isNotUndefined, "delimiter must not be undefined");
        this.assertValidDelimiterCharacter(delimiter);
    }

    protected assertClassInvariants(){
        this.assertValidDelimiterCharacter(this.delimiter);
    }

    protected assertIsValidComponentsArray(other: string[]){
        const condition = other.length > 0;
        IllegalArgumentException.assert(condition, "string array must have components");
    }
}