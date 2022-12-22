import { join } from "path";
import fs from "fs";

const getDirectory = (path: string) => join(process.cwd(), path);
const BLOG_DIR = getDirectory("/content/blogs");
const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getBlogFileNames = () => {
  return getFileNames(BLOG_DIR);
};

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return fileContent;
};
const getBlogs = () => {
  const names = getBlogFileNames();
  const item = names.map((name) => getItemInPath(join(BLOG_DIR, name)));
  return item;
};

export { getBlogFileNames, getBlogs };
