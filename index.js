const fs = require("fs");
const path = require("path");

// fs.writeFile("content.txt", "!This is my content!", (err) => {
//   if (err) throw err;

//   console.log("The file was created!");
// });

const filePath = path.join(process.cwd(), "content.txt");

// fs.readFile(filePath, (err, content) => {
//   if (err) throw err;

//   console.log("!!!!!!!!!!!");
//   console.log(content.toString());
// });

// fs.unlink(filePath, (err) => {
//   if (err) throw err;

//   console.log("File Deleted");
// });

// fs.readdir(process.cwd(), (err, files) => {
//   if (err) throw err;

//   console.log(files);
// });

// fs.mkdir(
//   `${process.cwd()}/myFolder/secondFolder`,
//   {
//     recursive: true,
//   },
//   (err) => {
//     if (err) throw err;

//     console.log("Folder created successfully");
//   }
// );

// //   recursive is not set to true so you can only create a single folder level
// fs.mkdir(`${process.cwd()}/myFolder`, (err) => {
//   if (err) throw err;

//   console.log("Folder created successfully");
// });

// fs.rmdir(
//   `${process.cwd()}/myFolder/secondFolder`,
//   {
//     recursive: true,
//   },
//   (err) => {
//     if (err) throw err;

//     console.log("Folder deleted successfully");
//   }
// );

// fs.rename(
//   `${process.cwd()}/myFolder/secondFolder`,
//   `${process.cwd()}/myFolder/newDirectory`,
//   (err) => {
//     if (err) throw err;

//     console.log("Folder deleted successfully");
//   }
// );

// fs.rename(
//   `${process.cwd()}/content.txt`,
//   `${process.cwd()}/newName.txt`,
//   (err) => {
//     if (err) throw err;

//     console.log("File Renamed Successfully");
//   }
// );

fs.appendFile(filePath, "\n NEW DATA ADDED!", (err) => {
  if (err) throw err;

  console.log("New content added");
});
