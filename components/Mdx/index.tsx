import { Code } from 'components/Code';
import { Link } from 'components/Link';

export const components = {
  pre: Code,
  a: (props: any) => <Link {...props} underline />,
};
