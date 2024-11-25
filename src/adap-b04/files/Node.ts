import { Name } from "../names/Name";
import { Directory } from "./Directory";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.assertIsValidBaseName(bn);
        this.assertIsValidDirectory(pn);
        this.doSetBaseName(bn);
        this.parentNode = pn;
    }

    public move(to: Directory): void {
        this.assertIsValidDirectory(to);
        this.parentNode.remove(this);
        to.add(this);
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertIsValidBaseName(bn);
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.assertIsValidBaseName(bn);
        this.baseName = bn;
    }

    public getParentNode(): Node {
        return this.parentNode;
    }

    protected assertIsValidBaseName(baseName: string): void{
        IllegalArgumentException.assertIsNotNullOrUndefined(baseName);
        const condition = baseName.length > 0;
        IllegalArgumentException.assertCondition(condition, "base name must not be empty")
    }

    protected assertIsValidDirectory(directory: Directory): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(directory);
    }

    protected assertNodeIsValid(cn: Node): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(cn);
    }
}
