import {AbstractName} from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        if (delimiter === undefined){
            super();
        } else {
            super(delimiter);
        }
        this.assertIsValidComponentsArray(other);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.assertIndexIsInComponentsArrayBounds(i);
        return this.components[i];
    }

    setComponent(i: number, c: string) {
        this.assertIndexIsInComponentsArrayBounds(i);
        this.assertStringIsNotNull(c)
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        this.assertStringIsInsertableAtIndex(i)
        this.assertStringIsNotNull(c)
        this.components.splice(i, 0, c);
    }

    append(c: string) {
        this.assertStringIsNotNull(c);
        this.components.push(c);
    }

    remove(i: number) {
        this.assertIndexIsInComponentsArrayBounds(i)
        this.components.splice(i, 1);
    }
}