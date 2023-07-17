import { ChildProcess, exec as executeCommand } from "child_process";

export interface CommandOptions {
    currentWorkingDirectory?: string,
    environmentVariables?: { [Key: string]: string },
    encoding?: "buffer" | NodeJS.BufferEncoding
    shell?: "string",
    timeout?: number
};

export namespace Command {

    export async function execute(command: string, options: CommandOptions = {}) {
        return await new Promise<ChildProcess>((resolve, reject) => {
            const process = executeCommand(
                command,
                {
                    cwd: options.currentWorkingDirectory,
                    env: options.environmentVariables,
                    encoding: options.encoding as BufferEncoding,
                    shell: options.shell,
                    timeout: options.timeout
                },
                (error) => {
                    if (error !== null) {
                        reject(error);
                    } else {
                        resolve(process);
                    }
                }
            );
        });
    }

}