import { ChildProcess } from "child_process";
export interface CommandOptions {
    currentWorkingDirectory?: string;
    environmentVariables?: {
        [Key: string]: string;
    };
    encoding?: "buffer" | NodeJS.BufferEncoding;
    shell?: "string";
    timeout?: number;
}
export declare namespace Command {
    function execute(command: string, options?: CommandOptions): Promise<ChildProcess>;
}
