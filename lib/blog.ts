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
  return { ...data, content } as Blog;
};

const getBlog = (name: string) => {
  const blog = getItemInPath(join(BLOG_DIR, name));
  blog.slug = name.replace(/\.md$/, "");
  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const fileName = slug + ".md";
  const blog = getBlog(fileName);
  const timeReading = readingTime(blog.content);
  blog.content = await markdownToHtml(blog.content);
  blog.timeReading = timeReading;
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  const item = [...names.map(getBlog)].sort();
  return item;
};

export { getBlogFileNames, getBlogs, getBlogBySlug };
