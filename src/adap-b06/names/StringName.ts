import { ESCAPE_CHARACTER } from "../common/Printable";
import { AbstractName } from "./AbstractName";
import {Name} from "./Name";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        if (delimiter === undefined){
            super();
        } else {
            super(delimiter);
        }
        this.assertStringIsNotNull(other);
        this.name = other;
        this.noComponents = this.getComponents().length;
    }

    getNoComponents(): number {
        return this.noComponents;
    }

    getComponent(i: number): string {
        this.assertIndexIsInComponentsArrayBounds(i)
        return this.getComponents()[i];
    }

    doCreate(components: string[], delimiter: string): Name {
        const nameAsString = this.getNameStringFromComponentsArray(components)
        return new StringName(nameAsString, delimiter);
    }

    getComponents(): string[] {
        const name = this.name;
        this.assertStringIsNotNull(name);
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

    private getNameStringFromComponentsArray(components: string[]): string {
        this.assertIsValidComponentsArray(components);
        return components
            // escape delimiters in an array
            .map(component => component.replace(this.delimiter, ESCAPE_CHARACTER + this.delimiter))
            .join(this.delimiter);
    }
}