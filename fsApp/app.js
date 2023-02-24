const fs = require("fs/promises");

(async () => {
  const createFile = async (path) => {
    try {
      // check if file exists
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      // file exists, returns error
      return console.log(`The File path ${path} exists already.`);
    } catch (e) {
      // don't have the file, should create
      const newFileHandle = await fs.open(path, "w");
      console.log("New file created succesfully");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      const f = await fs.unlink(path);
      console.log(f);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("no file at this path to remove");
      } else {
        console.log(err);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      const f = await fs.rename(oldPath, newPath);
      console.log(f);
    } catch (err) {
      if (e.code === "ENOENT") {
        console.log(
          "no file at this path to rename or destination doesn't exist"
        );
      } else {
        console.log(err);
      }
    }
  };

  const addToFile = async (path, content) => {
    try {
      // check if file exists
      const fileHandle = await fs.open(path, "a");

      fileHandle.write(content);
      fileHandle.close();
    } catch (err) {
      console.log(err);
    }
  };

  // Commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // allocate buffer with file size
    const buff = Buffer.alloc(size);
    // loc to start filling buffer
    const offset = 0;
    // how many bytes to read
    const length = buff.byteLength;
    // position to start reading the file from
    const position = 0;

    // read content from beg-end
    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString("utf-8");

    // create a file command:
    // 'create a file <path>'
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file command:
    // 'delete file <path>'
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file command:
    // 'rename the file <path> to <name>'
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      renameFile(oldPath, newPath);
    }

    // add to a file command:
    // 'add to the file <path> this content: <content>'
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }
  });

  // watcher -
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
