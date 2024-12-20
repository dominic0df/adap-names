import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected length: number = 0;

    // @methodtype initialization method
    constructor(other: string, delimiter?: string) {
        if(delimiter !== undefined){
            this.delimiter = delimiter;
        }
        this.name = other;
        this.length = other.split(this.delimiter).length;
    }

    // @methodtype conversion method
    public asString(delimiter: string = this.delimiter): string {
        return this.name.replaceAll(this.delimiter, delimiter);
    }

    // @methodtype conversion method
    public asDataString(): string {
        return this.name;
    }

    // @methodtype boolean query method
    public isEmpty(): boolean {
        return this.length === 0;
    }

    // @methodtype get method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype get method
    public getNoComponents(): number {
        return this.length;
    }

    // @methodtype get method
    public getComponent(x: number): string {
        if (this.isIndexInComponentsArrayBounds(x)) {
            return this.getComponentsOfNameString(this.name)[x];
        }
        throw new Error("index is out of bounds");
    }

    // @methodtype set method
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

    // @methodtype command method
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

    // @methodtype command method
    public append(c: string): void {
        let components = this.getComponentsOfNameString(this.name);
        components.push(c);
        this.length++;
        this.setNameGivenComponentsArray(components);
    }

    // @methodtype command method
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

    // @methodtype command method
    public concat(other: Name): void {
        let otherAsName = other.asDataString();
        let otherAsComponents = this.getComponentsOfNameString(otherAsName);
        for(let component of otherAsComponents){
            this.append(component);
        }
    }

    // @methodtype helper method
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

    // @methodtype assertion method
    private isIndexInComponentsArrayBounds(i: number): boolean {
        return i !== undefined && i >= 0 && i < this.length;
    }
}