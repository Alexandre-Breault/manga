import { NextPage } from "next";
import { use } from "react";
import { getBlogFileNames, getBlogs } from "../lib/blog";

async function getInitialBlogs() {
  const blogs = getBlogs();
  return blogs;
}

const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());
  return (
    <div>
      {blogs.map((blog, i) => (
        <div key={i}>
          {blog}
          <div className="h-10" />
        </div>
      ))}
    </div>
  );
};

export default Page;
