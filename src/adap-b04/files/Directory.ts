import { Node } from "./Node";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.assertNodeIsValid(cn);
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.assertDirectoryContainsNode(cn);
        this.childNodes.delete(cn);
    }

    private assertDirectoryContainsNode(cn: Node): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(cn);
        const condition = this.childNodes.has(cn);
        IllegalArgumentException.assertCondition(condition, "The required node does not exist in childNodes");
    }
}