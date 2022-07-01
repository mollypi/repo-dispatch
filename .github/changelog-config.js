module.exports = {
    types: [
      { types: ['feat', 'feature'], label: '🎉 New Features' },
      { types: ['fix', 'bugfix'], label: '🐛 Bugfixes' },
      { types: ['improvements', 'enhancement'], label: '🔨 Improvements' },
      { types: ['perf'], label: '🏎️ Performance Improvements' },
      { types: ['build', 'ci'], label: '🏗️ Build System' },
      { types: ['refactor'], label: '🪚 Refactors' },
      { types: ['doc', 'docs'], label: '📚 Documentation Changes' },
      { types: ['test', 'tests'], label: '🔍 Tests' },
      { types: ['style'], label: '💅 Code Style Changes' },
      { types: ['chore'], label: '🧹 Chores' },
      { types: ['other'], label: 'Other Changes' },
    ],
  
    excludeTypes: ['other'],
  
    /**
     * If implemented, performs note rendering.
     * @param {ChangelogCommitNote} notes An array of {@link ChangelogCommitNote}
     * @returns A `string` of the rendered notes.
     */
    renderNotes: (notes) => {
      return `\n## BREAKING CHANGES\n${notes
        .map((n) => {
          return `- due to [${n.commit.sha.substring(0, 6)}](${n.commit.url}): ${n.commit.subject}\n\n${n.text}\n\n`;
        })
        .join('')}`;
    },
  
    /**
     * If implemented, performs changelog type section rendering.
     * @param {string} label A label from the {@link ChangelogConfig.types config types}
     * @param {ChangelogCommit[]} commits An array of {@link ChangelogCommit changelog commits} which are responsive to the `label`.
     */
    renderTypeSection: (label, commits) => {
      return `\n## ${label}\n${commits
        .map((c) => {
          return `- ${c.scope ? `**${c.scope}:** ` : ''}${c.subject}`;
        })
        .join('\n')}\n`;
    },
  
    /**
     * If implemented, performs changelog rendering.
     * @param {string} release The tag name for the release. Ex: `v1.0.0`
     * @param {string} changes The formatted changes text from accumulating all {@link ChangelogConfig.renderTypeSection renderTypeSection} calls
     * @returns A `string` of the formatted, final changelog. There is no further processing after this call.
     */
    renderChangelog: (release, changes) => {
      return `# ${release} - ${new Date().toISOString().substring(0, 10)}\n\n` + changes + '\n\n';
    },
  };