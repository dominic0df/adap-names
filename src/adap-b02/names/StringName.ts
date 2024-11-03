import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
       if(delimiter !== undefined){
        this.delimiter = delimiter;
       }
       this.name = other;
       this.length = other.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.replaceAll(ESCAPE_CHARACTER + this.delimiter, delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.length;
    }

    public getComponent(x: number): string {
        if (this.isIndexInComponentsArrayBounds(x)) {
            return this.getComponentsOfNameString(this.name)[x];
        }
        throw new Error("index is out of bounds");
    }

    public setComponent(n: number, c: string): void {
        if (this.isIndexInComponentsArrayBounds(n)) {
            if(c !== null){
                let components = this.getComponentsOfNameString(this.name);
                components[n] = c;
                this.setNameGivenComponentsArray(components);
            } else {
                throw new Error("component string must not be null");
            }
        } else {
            throw new Error("index is out of bounds");
        }
    }

    public insert(n: number, c: string): void {
        if (n !== undefined && n >= 0 && n <= this.length) {
            if(c !== null){
                let components = this.getComponentsOfNameString(this.name);
                components.splice(n, 0, c);
                this.length++;
                this.setNameGivenComponentsArray(components);
            } else {
                throw new Error("component string must not be null");
            }
        } else {
            throw new Error("index is out of bounds");
        }
    }

    public append(c: string): void {
        let components = this.getComponentsOfNameString(this.name);
        components.push(c);
        this.length++;
        this.setNameGivenComponentsArray(components);
    }

    public remove(n: number): void {
        if (this.isIndexInComponentsArrayBounds(n)) {
            let components = this.getComponentsOfNameString(this.name);
            components.splice(n, 1);
            this.length--;
            this.setNameGivenComponentsArray(components);
        } else {
            throw new Error("index is out of bounds");
        }
    }

    public concat(other: Name): void {
        let otherAsName = other.asDataString();
        let otherAsComponents = this.getComponentsOfNameString(otherAsName);
        for(let component of otherAsComponents){
            this.append(component);
        }
    }

    private getComponentsOfNameString(name: string): string[] {
        return name.split(ESCAPE_CHARACTER + this.delimiter);
    }

    private setNameGivenComponentsArray(components: string[]): void {
        this.name = components.join(ESCAPE_CHARACTER + this.delimiter);
    }

    private isIndexInComponentsArrayBounds(i: number): boolean {
        return i !== undefined && i >= 0 && i < this.length;
    }
}