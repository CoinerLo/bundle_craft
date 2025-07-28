import { walk } from 'estree-walker'

// should return transformed ast
export function transformer(ast) {
  return walk(
    ast, {
      enter(node) {
        if (node.type === 'VariableDeclaration') {
          if (node.kind === 'let' || node.kind === 'const') {
            node.kind = 'var';
          }
        }
      },
    },
  );
}
