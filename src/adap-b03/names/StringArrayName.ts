import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        if (this.isIndexInComponentsArrayBounds(i)) {
            return this.components[i];
        }
    }

    setComponent(i: number, c: string) {
        if (this.isIndexInComponentsArrayBounds(i)) {
            if (this.isStringNotNull(c)) {
                this.components[i] = c;
            }
        }
    }

    insert(i: number, c: string) {
        if (this.isStringInsertableAtIndex(i)) {
            if (this.isStringNotNull(c)) {
                this.components.splice(i, 0, c);
            }
        }
    }

    append(c: string) {
        this.components.push(c);
    }

    remove(i: number) {
        if (this.isIndexInComponentsArrayBounds(i)) {
            this.components.splice(i, 1);
        }
    }
}