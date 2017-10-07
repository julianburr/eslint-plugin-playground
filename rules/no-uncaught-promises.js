module.exports = {
  meta: {
    docs: {
      description: 'Ensure promises always have a catch statement',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },

  create (context) {
    return {
      '*': function (node) {
        // console.log('***', node.type);
      },

      ExpressionStatement: function (node) {
        // Promise chains are call expressions
        if (node.expression && node.expression.type === 'CallExpression') {
          // We really just do care about the very last part of the expression
          // (which will be the first callee!) ... if that is a `then`, we "know"
          // we are dealing with a promise chain that doesn't end with a `catch`
          if (
            node.expression.callee &&
            node.expression.callee.property &&
            node.expression.callee.property.name === 'then'
          ) {
            context.report({
              node,
              message: 'Promise chain does not have a catch statement!',
              fix: function (fixer) {
                return fixer.insertTextAfter(
                  // We want to insert the text after the statements last expression
                  // since the statement itself will (potentially) end with a semicolon!
                  node.expression,
                  '.catch(console.error)'
                );
              }
            });
          }
        }
      },

      AwaitExpression: function (node) {
        // If the await expressions argument does not have a direct callee
        // or if that callee is not a catch statement, thow as well
        if (
          !node.argument.callee ||
          node.argument.callee.type !== 'MemberExpression' ||
          !node.argument.callee.property ||
          node.argument.callee.property.name !== 'catch'
        ) {
          context.report({
            node,
            message: 'Await expression does not have a catch statement!',
            fix: function (fixer) {
              return fixer.insertTextAfter(node, '.catch(console.error)');
            }
          });
        }
      },

      'Program:exit': function (node) {
        // console.log('EXIT', node);
      }
    };
  }
};
