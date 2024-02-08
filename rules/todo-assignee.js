// rules/todo-assignee.js

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce 'TODO' and 'FIXME' comments to include an assignee",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [], // no options
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getAllComments();

        comments.forEach((comment) => {
          const value = comment.value.trim();
          if (/^(todo|fixme)/i.test(value) && !/@\w+/i.test(value)) {
            context.report({
              node: comment,
              message: "{{ identifier }} comment without assignee",
              data: {
                identifier: value.split(/\s+/)[0],
              },
            });
          }
        });
      },
    };
  },
};
