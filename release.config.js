module.exports = {
    branches: ['main'],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      [
        '@semantic-release/changelog',
        {
          changelogFile: 'CHANGELOG.md',
        },
      ],
      [
        '@semantic-release/npm',
        {
          npmPublish: true,
        },
      ],
      '@semantic-release/github',
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'package.json',
            "README.md",
            "dist/**/*.{js,d.ts}"
          ],
          message:
            // eslint-disable-next-line no-template-curly-in-string
            'chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ],
    verifyConditions: ['@semantic-release/changelog', '@semantic-release/git'],
  };
  