export const theme = {
  plain: {
    color: 'var(--accents-1)',
  },
  styles: [
    {
      types: ['prolog', 'doctype', 'cdata', 'punctuation', 'variable', 'unit'],
      style: {
        color: 'var(--accents-1)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'var(--accents-2)',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: 'var(--sky)',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'constant',
        'property',
        'regex',
        'inserted',
        'deleted',
        'tag',
        'atrule',
        'attr-name',
        'class',
        'class-name',
        'property-access',
        'function',
        'builtin',
      ],
      style: {
        color: 'var(--blue)',
      },
    },
    {
      types: ['method', 'function-variable'],
      style: {
        color: 'var(--pink)',
      },
    },
    {
      types: ['selector'],
      style: {
        color: 'var(--green)',
      },
    },
    {
      types: ['tag', 'keyword', 'operator'],
      style: {
        color: 'var(--red)',
      },
    },
    {
      types: ['method', 'property-access', 'maybe-class-name'],
      style: {
        color: 'var(--violet)',
      },
    },
  ],
};
