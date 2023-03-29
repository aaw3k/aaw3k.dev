import { SVGProps } from 'react';

export const GitHubIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M9.385 17.717C5.538 18.86 5.538 15.815 4 15.434M14.77 20v-2.945a2.539 2.539 0 00-.724-1.986C16.462 14.803 19 13.897 19 9.743a4.116 4.116 0 00-1.154-2.854 3.82 3.82 0 00-.07-2.869s-.907-.266-3.007 1.127a10.4 10.4 0 00-5.384 0C7.285 3.754 6.377 4.02 6.377 4.02a3.82 3.82 0 00-.07 2.87 4.116 4.116 0 00-1.153 2.875c0 4.125 2.538 5.03 4.954 5.327a2.56 2.56 0 00-.723 1.963V20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CornerDownLeftIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M10.25 19.25l-3.5-3.5 3.5-3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 15.75h6a4 4 0 004-4v-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CodePenIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M12 4l8 5.2M12 4L4 9.2M12 4v5.2m8 0v5.6m0-5.6l-8 5.6m8 0L12 20m8-5.2l-8-5.6M12 20l-8-5.2m8 5.2v-5.2m-8 0V9.2m0 5.6l8-5.6m-8 0l8 5.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StackBlitzIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        d="M15 4.5l-8.5 9H12l-3 6 8.5-9H12l3-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
