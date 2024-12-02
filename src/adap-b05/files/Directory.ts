import {Node} from "./Node";
import {IllegalArgumentException} from "../../adap-b04/common/IllegalArgumentException";
import {ServiceFailureException} from "../common/ServiceFailureException";

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

    public findNodes(bn: string): Set<Node> {
        try {
            let nodes = super.findNodes(bn);
            this.childNodes.forEach((child) => {
                child.findNodes(bn).forEach((node) => nodes.add(node));
            })
            this.assertClassInvariants();
            return nodes;
        } catch (error) {
            const message = 'Failed to find nodes with basename ' + bn;
            throw new ServiceFailureException(message, error);
        }
    }
}