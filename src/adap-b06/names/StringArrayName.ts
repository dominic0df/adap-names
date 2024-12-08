import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        if (delimiter === undefined){
            super();
        } else {
            super(delimiter);
        }
        this.assertIsValidComponentsArray(other);
        this.components = [...other];
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.assertIndexIsInComponentsArrayBounds(i);
        return this.components[i];
    }

    getComponents(): string[] {
        return [...this.components];
    }

    protected doCreate(components: string[], delimiter: string){
        return new StringArrayName(components, delimiter);
    }

}