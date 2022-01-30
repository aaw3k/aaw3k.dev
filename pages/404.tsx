import type { NextPage } from 'next';
import { Layout } from 'components/Layouts';

const Error: NextPage = () => {
  return <Layout title="404" description="This page cannot be found." />;
};

export default Error;
