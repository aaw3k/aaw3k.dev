export type FrontMatter = {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags?: Array<string>;
};

export type Craft = {
  isDark?: boolean;
  slug: string;
  title: string;
  date: string;
  demo?: string;
  preload: string;
  thumbnail: string;
  links?: Array<{ name: string; url: string; icon: string }>;
};
