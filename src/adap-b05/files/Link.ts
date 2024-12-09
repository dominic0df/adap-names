import {Node} from "./Node";
import {Directory} from "./Directory";
import {ExceptionType} from "../common/AssertionDispatcher";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        this.assertIsValidBaseName(bn, ExceptionType.PRECONDITION);
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        const result: Node = this.targetNode as Node;
        return result;
    }

    public findNodes(bn: string): Set<Node> {
        let nodes = super.findNodes(bn);
        const targetNode = this.ensureTargetNode(this.targetNode);
        targetNode.findNodes(bn).forEach(node => nodes.add(node));
        this.assertClassInvariants()
        return nodes;
    }
}