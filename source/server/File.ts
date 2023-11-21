import FileSystem from "fs";
import Path from "path";

export interface FileMeta {
    path: string;
    size: number;
    directory: boolean;
    creation: Date;
    lastModified: Date;
    lastAccess: Date;
}

export namespace File {

    /**
     * Reads a file's contents from disk into a buffer.
     * @param path The path of the file to read from
     */
    export async function read(path: string): Promise<Buffer>;
    /**
     * Reads a file's contents and decodes them into a string.
     * @param path The path of the file to read from.
     * @param encoding The encoding to use to convert the file's bytes into a string.
     */
    export async function read(path: string, encoding: BufferEncoding): Promise<string>;
    export async function read(path: string, encoding: BufferEncoding | null = null): Promise<string | Buffer> {
        return await new Promise((resolve, reject) => {
            FileSystem.readFile(path, encoding, (error, data) => {
                if (error === null) {
                    resolve(data);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Writes data to a file on disk.
     * @param path The path of the file to write to.
     * @param data The data to write to the file.
     * @param encoding The encoding to use to write the file.
     */
    export async function write(path: string, data: string | NodeJS.ArrayBufferView, encoding: BufferEncoding = "utf8") {
        await new Promise<void>((resolve, reject) => {
            ensureDirectoryExists(Path.dirname(path)).then(() => {
                FileSystem.writeFile(path, data, encoding, (error) => {
                    if (error === null) {
                        resolve();
                    } else {
                        reject(error);
                    }
                })
            });
        });
    }

    /**
     * Deletes a file off of disk.
     * @param path The path of a file to remove.
     */
    export async function remove(path: string) {
        await new Promise<void>((resolve, reject) => {
            FileSystem.rm(path, { recursive: true, force: true }, (error) => {
                if (error === null) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Copies a file or directory structure recursively from one path to another.
     * @param fromPath The file to copy.
     * @param toPath The destination to paste to.
     */
    export async function copy(fromPath: string, toPath: string) {
        await new Promise<void>(async (resolve, reject) => {
            try {
                await ensureDirectoryExists(Path.dirname(toPath));
                const meta = await getMeta(fromPath);
                if (meta.directory) {
                    const copyTasks: Promise<void>[] = [];
                    const fileList = await listDirectory(fromPath);
                    for (const file of fileList) {
                        copyTasks.push(copy(Path.join(fromPath, file), Path.join(toPath, file)));
                    }
                    await Promise.all(copyTasks);
                    resolve();
                } else {
                    FileSystem.copyFile(fromPath, toPath, (error) => {
                        if (error === null) {
                            resolve();
                        } else {
                            reject(error);
                        }
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Returns a list of all files in a directory.
     * @param path The path to the directory to list.
     * @returns An array of file names in the directory at "path".
     */
    export async function listDirectory(path: string) {
        return await new Promise<string[]>((resolve, reject) => {
            FileSystem.readdir(path, (error, files) => {
                if (error === null) {
                    resolve(files);
                } else {
                    reject(error);
                }
            });
        })
    }

    /**
     * Creates a directory at a given path.
     * @param path The location of the directory to create.
     */
    export async function createDirectory(path: string) {
        await new Promise<void>((resolve, reject) => {
            FileSystem.mkdir(path, { recursive: true }, (error) => {
                if (error === null) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Checks to see if a file or directory exists at "path".
     * @param path The path to the file or directory to check the existence of.
     * @returns True if a file or directory exists at "path", false otherwise.
     */
    export async function exists(path: string) {
        return await new Promise<boolean>((resolve) => {
            FileSystem.access(path, FileSystem.constants.F_OK, (error) => {
                if (error === null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * Gets a list of file paths for all files nested within a directory specified by "path".
     * @param path The path of the directory to get all the nested files of.
     * @returns An array of paths of all nested files within the directory specified by "path".
     * @note The paths returned by this function are relative to "path".
     */
    export async function getNested(path: string): Promise<string[]> {
        return await _getNested(path);
    }

    async function _getNested(path: string, base: string = "."): Promise<string[]> {
        const files = [];
        const fileNames = await listDirectory(path);
        for (const fileName of fileNames) {
            const filePath = Path.join(path, fileName);
            const relativeFilePath = Path.join(base, fileName);
            const meta = await getMeta(filePath);
            if (meta.directory) {
                files.push(...await _getNested(filePath, relativeFilePath));
            } else {
                files.push(relativeFilePath);
            }
        }
        return files;
    }

    /**
     * Gets the meta information for a given file/directory.
     */
    export async function getMeta(path: string): Promise<FileMeta> {
        return new Promise<FileMeta>((resolve, reject) => {
            FileSystem.stat(path, (error, statistics) => {
                if (error === null) {
                    resolve({
                        directory: statistics.isDirectory(),
                        path: Path.resolve(path),
                        size: statistics.size,
                        creation: statistics.birthtime,
                        lastModified: statistics.mtime,
                        lastAccess: statistics.atime
                    });
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Ensures that a directory exists. If it doesn't exist, it will be created.
     * @param path The path to the directory to ensure.
     */
    export async function ensureDirectoryExists(path: string) {
        if (!await exists(path)) {
            await createDirectory(path);
        }
    }

    /**
     * Reads all bytes from a stream, and returns a buffer containing them.
     * @param stream The stream to create a buffer from.
     * @returns A buffer containing all of the bytes from "stream".
     */
    export async function getBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
        const chunks: Buffer[] = [];
        return await new Promise((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            stream.on('error', (error) => reject(error));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        })
    }

}