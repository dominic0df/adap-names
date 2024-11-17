import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = other.split(this.delimiter).length;
    }

    getNoComponents(): number {
        return this.length;
    }

    getComponent(i: number): string {
        if (this.isIndexInComponentsArrayBounds(i)) {
            return this.getComponentsOfNameString(this.name)[i];
        }
        // is achieved also by the superclass method, but this is not recognized
        throw new Error("index is out of bounds");
    }

    setComponent(i: number, c: string) {
        if (this.isIndexInComponentsArrayBounds(i)) {
            if (this.isStringNotNull(c)) {
                let components = this.getComponentsOfNameString(this.name);
                components[i] = c;
                this.setNameGivenComponentsArray(components);
            }
        }
    }

    insert(i: number, c: string) {
        if (this.isStringInsertableAtIndex(i)) {
            if (this.isStringNotNull(c)) {
                let components = this.getComponentsOfNameString(this.name);
                components.splice(i, 0, c);
                this.length++;
                this.setNameGivenComponentsArray(components);
            }
        }
    }

    append(c: string) {
        let components = this.getComponentsOfNameString(this.name);
        components.push(c);
        this.length++;
        this.setNameGivenComponentsArray(components);
    }
    remove(i: number) {
        if (this.isIndexInComponentsArrayBounds(i)) {
            let components = this.getComponentsOfNameString(this.name);
            components.splice(i, 1);
            this.length--;
            this.setNameGivenComponentsArray(components);
        }
    }

    private getComponentsOfNameString(name: string): string[] {
        let components: string[] = [];
        let currentComponent: string = "";
        let charIndex = 0;

        while (charIndex < name.length) {
            if (name[charIndex] === ESCAPE_CHARACTER && charIndex + 1 < name.length && name[charIndex + 1] === this.delimiter) {
                // next char is delimiter, skip escape
                currentComponent += this.delimiter;
                charIndex += 2;
            } else if (name[charIndex] === this.delimiter) {
                // unescaped delimiter -> split
                components.push(currentComponent);
                currentComponent = "";
                charIndex++;
            } else {
                currentComponent += name[charIndex];
                charIndex++;
            }
        }
        components.push(currentComponent);

        return components;
    }


    private setNameGivenComponentsArray(components: string[]): void {
        this.name = components
            // escape delimiters in an array
            .map(component => component.replace(this.delimiter, ESCAPE_CHARACTER + this.delimiter))
            .join(this.delimiter);
    }
}