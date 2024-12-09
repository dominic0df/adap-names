import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {IllegalArgumentException} from "../../adap-b04/common/IllegalArgumentException";
import {InvalidStateException} from "../../adap-b04/common/InvalidStateException";

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
        return this.getHashCode() === other.getHashCode();
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

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;

    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;

    abstract append(c: string): void;

    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.assertClassInvariants();
        for (let component = 0; component < other.getNoComponents(); component++) {
            this.append(other.getComponent(component));
        }
    }

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