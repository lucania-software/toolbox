/// <reference types="node" />
/// <reference types="node" />
export interface FileMeta {
    path: string;
    size: number;
    directory: boolean;
    creation: Date;
    lastModified: Date;
    lastAccess: Date;
}
export declare namespace File {
    /**
     * Reads a file's contents from disk into a buffer.
     * @param path The path of the file to read from
     */
    function read(path: string): Promise<Buffer>;
    /**
     * Reads a file's contents and decodes them into a string.
     * @param path The path of the file to read from.
     * @param encoding The encoding to use to convert the file's bytes into a string.
     */
    function read(path: string, encoding: BufferEncoding): Promise<string>;
    /**
     * Writes data to a file on disk.
     * @param path The path of the file to write to.
     * @param data The data to write to the file.
     * @param encoding The encoding to use to write the file.
     */
    function write(path: string, data: string | NodeJS.ArrayBufferView, encoding?: BufferEncoding): Promise<void>;
    /**
     * Deletes a file off of disk.
     * @param path The path of a file to remove.
     */
    function remove(path: string): Promise<void>;
    /**
     * Copies a file or directory structure recursively from one path to another.
     * @param fromPath The file to copy.
     * @param toPath The destination to paste to.
     */
    function copy(fromPath: string, toPath: string): Promise<void>;
    /**
     * Returns a list of all files in a directory.
     * @param path The path to the directory to list.
     * @returns An array of file names in the directory at "path".
     */
    function listDirectory(path: string): Promise<string[]>;
    /**
     * Creates a directory at a given path.
     * @param path The location of the directory to create.
     */
    function createDirectory(path: string): Promise<void>;
    /**
     * Checks to see if a file or directory exists at "path".
     * @param path The path to the file or directory to check the existence of.
     * @returns True if a file or directory exists at "path", false otherwise.
     */
    function exists(path: string): Promise<boolean>;
    /**
     * Gets a list of file paths for all files nested within a directory specified by "path".
     * @param path The path of the directory to get all the nested files of.
     * @returns An array of paths of all nested files within the directory specified by "path".
     * @note The paths returned by this function are relative to "path".
     */
    function getNested(path: string): Promise<string[]>;
    /**
     * Gets the meta information for a given file/directory.
     */
    function getMeta(path: string): Promise<FileMeta>;
    /**
     * Ensures that a directory exists. If it doesn't exist, it will be created.
     * @param path The path to the directory to ensure.
     */
    function ensureDirectoryExists(path: string): Promise<void>;
    /**
     * Reads all bytes from a stream, and returns a buffer containing them.
     * @param stream The stream to create a buffer from.
     * @returns A buffer containing all of the bytes from "stream".
     */
    function getBuffer(stream: NodeJS.ReadableStream): Promise<Buffer>;
}
