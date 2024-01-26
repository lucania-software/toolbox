'use strict';

var FileSystem = require('fs');
var Path = require('path');
var child_process = require('child_process');

exports.File = void 0;
(function (File) {
    async function read(path, encoding = null) {
        return await new Promise((resolve, reject) => {
            FileSystem.readFile(path, encoding, (error, data) => {
                if (error === null) {
                    resolve(data);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    File.read = read;
    /**
     * Writes data to a file on disk.
     * @param path The path of the file to write to.
     * @param data The data to write to the file.
     * @param encoding The encoding to use to write the file.
     */
    async function write(path, data, encoding = "utf8") {
        await new Promise((resolve, reject) => {
            ensureDirectoryExists(Path.dirname(path)).then(() => {
                FileSystem.writeFile(path, data, encoding, (error) => {
                    if (error === null) {
                        resolve();
                    }
                    else {
                        reject(error);
                    }
                });
            });
        });
    }
    File.write = write;
    /**
     * Deletes a file off of disk.
     * @param path The path of a file to remove.
     */
    async function remove(path) {
        await new Promise((resolve, reject) => {
            FileSystem.rm(path, { recursive: true, force: true }, (error) => {
                if (error === null) {
                    resolve();
                }
                else {
                    reject(error);
                }
            });
        });
    }
    File.remove = remove;
    /**
     * Copies a file or directory structure recursively from one path to another.
     * @param fromPath The file to copy.
     * @param toPath The destination to paste to.
     */
    async function copy(fromPath, toPath) {
        await new Promise(async (resolve, reject) => {
            try {
                await ensureDirectoryExists(Path.dirname(toPath));
                const meta = await getMeta(fromPath);
                if (meta.directory) {
                    const copyTasks = [];
                    const fileList = await listDirectory(fromPath);
                    for (const file of fileList) {
                        copyTasks.push(copy(Path.join(fromPath, file), Path.join(toPath, file)));
                    }
                    await Promise.all(copyTasks);
                    resolve();
                }
                else {
                    if (meta.symlink) {
                        FileSystem.readlink(fromPath, (error, symlinkTargetPath) => {
                            if (error === null) {
                                FileSystem.symlink(symlinkTargetPath, toPath, "junction", (error) => {
                                    if (error === null) {
                                        resolve();
                                    }
                                    else {
                                        reject(error);
                                    }
                                });
                            }
                            else {
                                reject(error);
                            }
                        });
                    }
                    else {
                        FileSystem.copyFile(fromPath, toPath, (error) => {
                            if (error === null) {
                                resolve();
                            }
                            else {
                                reject(error);
                            }
                        });
                    }
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    File.copy = copy;
    /**
     * Returns a list of all files in a directory.
     * @param path The path to the directory to list.
     * @returns An array of file names in the directory at "path".
     */
    async function listDirectory(path) {
        return await new Promise((resolve, reject) => {
            FileSystem.readdir(path, (error, files) => {
                if (error === null) {
                    resolve(files);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    File.listDirectory = listDirectory;
    /**
     * Creates a directory at a given path.
     * @param path The location of the directory to create.
     */
    async function createDirectory(path) {
        await new Promise((resolve, reject) => {
            FileSystem.mkdir(path, { recursive: true }, (error) => {
                if (error === null) {
                    resolve();
                }
                else {
                    reject(error);
                }
            });
        });
    }
    File.createDirectory = createDirectory;
    /**
     * Checks to see if a file or directory exists at "path".
     * @param path The path to the file or directory to check the existence of.
     * @returns True if a file or directory exists at "path", false otherwise.
     */
    async function exists(path) {
        return await new Promise((resolve) => {
            FileSystem.access(path, FileSystem.constants.F_OK, (error) => {
                if (error === null) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    File.exists = exists;
    /**
     * Gets a list of file paths for all files nested within a directory specified by "path".
     * @param path The path of the directory to get all the nested files of.
     * @returns An array of paths of all nested files within the directory specified by "path".
     * @note The paths returned by this function are relative to "path".
     */
    async function getNested(path) {
        return await _getNested(path);
    }
    File.getNested = getNested;
    async function _getNested(path, base = ".") {
        const files = [];
        const fileNames = await listDirectory(path);
        for (const fileName of fileNames) {
            const filePath = Path.join(path, fileName);
            const relativeFilePath = Path.join(base, fileName);
            const meta = await getMeta(filePath);
            if (meta.directory) {
                files.push(...await _getNested(filePath, relativeFilePath));
            }
            else {
                files.push(relativeFilePath);
            }
        }
        return files;
    }
    /**
     * Gets the meta information for a given file/directory.
     */
    async function getMeta(path) {
        return new Promise((resolve, reject) => {
            FileSystem.lstat(path, (error, statistics) => {
                if (error === null) {
                    resolve({
                        directory: statistics.isDirectory(),
                        symlink: statistics.isSymbolicLink(),
                        path: Path.resolve(path),
                        size: statistics.size,
                        creation: statistics.birthtime,
                        lastModified: statistics.mtime,
                        lastAccess: statistics.atime
                    });
                }
                else {
                    reject(error);
                }
            });
        });
    }
    File.getMeta = getMeta;
    /**
     * Ensures that a directory exists. If it doesn't exist, it will be created.
     * @param path The path to the directory to ensure.
     */
    async function ensureDirectoryExists(path) {
        if (!await exists(path)) {
            await createDirectory(path);
        }
    }
    File.ensureDirectoryExists = ensureDirectoryExists;
    /**
     * Reads all bytes from a stream, and returns a buffer containing them.
     * @param stream The stream to create a buffer from.
     * @returns A buffer containing all of the bytes from "stream".
     */
    async function getBuffer(stream) {
        const chunks = [];
        return await new Promise((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            stream.on('error', (error) => reject(error));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    }
    File.getBuffer = getBuffer;
})(exports.File || (exports.File = {}));

exports.Command = void 0;
(function (Command) {
    async function execute(command, options = {}) {
        return await new Promise((resolve, reject) => {
            const process = child_process.exec(command, {
                cwd: options.currentWorkingDirectory,
                env: options.environmentVariables,
                encoding: options.encoding,
                shell: options.shell,
                timeout: options.timeout
            }, (error) => {
                if (error !== null) {
                    reject(error);
                }
                else {
                    resolve(process);
                }
            });
        });
    }
    Command.execute = execute;
})(exports.Command || (exports.Command = {}));
