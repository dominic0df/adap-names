import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import {InvalidStateException} from "../../adap-b04/common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertFileIsOpen();
    }

    public read(noBytes: number): Int8Array {
        let result: Int8Array = new Int8Array(noBytes);
        // do something

        let tries: number = 0;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch(ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    // Oh no! What @todo?!
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        return 0; // @todo
    }

    public close(): void {
        this.assertFileIsClosed();
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    private assertFileIsOpen(): void{
        InvalidStateException.assertIsNotNullOrUndefined(this.state);
        const condition = this.doGetFileState() == FileState.OPEN;
        InvalidStateException.assertCondition(condition, "Can not open file that has already been opened");
    }

    private assertFileIsClosed(): void{
        InvalidStateException.assertIsNotNullOrUndefined(this.state);
        const condition = this.doGetFileState() == FileState.CLOSED;
        InvalidStateException.assertCondition(condition, "Can not close file that has already been closed");
    }
}