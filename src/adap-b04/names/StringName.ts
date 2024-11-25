import {ESCAPE_CHARACTER} from "../common/Printable";
import {AbstractName} from "./AbstractName";

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
        this.noComponents = other.split(this.delimiter).length;
    }

    getNoComponents(): number {
        return this.noComponents;
    }

    getComponent(i: number): string {
        this.assertIndexIsInComponentsArrayBounds(i)
        return this.getComponentsOfNameString(this.name)[i];
    }

    setComponent(i: number, c: string) {
        this.assertIndexIsInComponentsArrayBounds(i)
        this.assertStringIsNotNull(c)
        let components = this.getComponentsOfNameString(this.name);
        components[i] = c;
        this.setNameGivenComponentsArray(components);


    }

    insert(i: number, c: string) {
        this.assertStringIsInsertableAtIndex(i)
        this.assertStringIsNotNull(c)
        let components = this.getComponentsOfNameString(this.name);
        components.splice(i, 0, c);
        this.noComponents++;
        this.setNameGivenComponentsArray(components);

    }

    append(c: string) {
        this.assertStringIsNotNull(c);
        let components = this.getComponentsOfNameString(this.name);
        components.push(c);
        this.noComponents++;
        this.setNameGivenComponentsArray(components);
    }

    remove(i: number) {
        this.assertIndexIsInComponentsArrayBounds(i)
        let components = this.getComponentsOfNameString(this.name);
        components.splice(i, 1);
        this.noComponents--;
        this.setNameGivenComponentsArray(components);

    }

    private getComponentsOfNameString(name: string): string[] {
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


    private setNameGivenComponentsArray(components: string[]): void {
        this.assertIsValidComponentsArray(components);
        this.name = components
            // escape delimiters in an array
            .map(component => component.replace(this.delimiter, ESCAPE_CHARACTER + this.delimiter))
            .join(this.delimiter);
    }

}