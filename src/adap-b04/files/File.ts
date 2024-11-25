import { Node } from "./Node";
import { Directory } from "./Directory";
import {InvalidStateException} from "../common/InvalidStateException";

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