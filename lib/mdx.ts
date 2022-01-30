import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_PATH = process.cwd();

export const snippetsPath = path.join(ROOT_PATH, 'content/snippets');

const content = {
  snippets: snippetsPath,
};

export const getPostBySlug = (directoryPath: string, fileName: string) => {
  const filePath = path.join(directoryPath, fileName);
  const docSource = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(docSource);

  return {
    frontMatter: {
      ...data,
      slug: fileName.replace('.mdx', ''),
    },
    content,
  };
};

export const getAllPostsMeta = (type: keyof typeof content) => {
  const items = fs
    .readdirSync(content[type])
    .map((item) => getPostBySlug(content[type], item));
  return items;
};
