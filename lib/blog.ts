import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "../type/Blog";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

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
  const { data, content } = matter(fileContent);
  const timeReading = readingTime(content);
  return { ...data, content} as Blog;
};

const getBlog = (name: string) => {
  const blog = getItemInPath(join(BLOG_DIR, name));
  blog.slug = name.replace(/\.md$/, "");
  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const fileName = slug + ".md";
  const blog = getBlog(fileName);
  blog.content = await markdownToHtml(blog.content);
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  const item = names.map(getBlog);
  return item;
};

export { getBlogFileNames, getBlogs, getBlogBySlug };
