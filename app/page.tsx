import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { getBlogs } from "../lib/blog";

async function getInitialBlogs() {
  const blogs = getBlogs()
    .sort((a, b) => (parseInt(a.numero) > parseInt(b.numero) ? 1 : -1))
    .sort((a, b) => a.categorie.localeCompare(b.categorie));
  return blogs;
}

const Page = () => {
  const blogs = use(getInitialBlogs());
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
            <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <Image
                fill
                src={blog.coverImage}
                alt={""}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                style={{
                  maxWidth: "100%",
                }}
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-300">{blog.title}</h3>
            <p className="mt-1 text-lg font-medium ">{blog.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
