const fs = require('fs');
const escodegen = require('escodegen');
const esprima = require('esprima');
const estraverse = require('estraverse');

//const res = escodegen.generate({
  //type: 'BinaryExpression',
  //operator: '+',
  //left: { type: 'Literal', value: 40 },
  //right: { type: 'Literal', value: 2 }
//});

//console.log(res);

const ast = esprima.parse(fs.readFileSync('./fixture/ava.test.js', 'utf8'));


function createMochaTest() {
  return {
    type: 'Program',
    body: [],
    sourceType: 'script' 
  };
}

function createIt(name, body) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'it',
      },
      arguments: [
        {
          type: 'Literal',
          value: name,
        },
        {
          type: 'ArrowFunctionExpression',
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: body,
          }
        }
      ]
    }
  }
}

function createDescribe(name) {

  const desc = {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'describe'
      },
      arguments: [
        {
          "type": 'Literal',
          "value": name,
        },
        {
          type: 'FunctionExpression',
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: []
          }
        }
      ]
    } 
  };

  return {
    addIt: function(it){
      desc.expression.arguments[1].body.body.push(it);
    },
    build: function() {
      return desc; 
    }
  
  }

}

function createRequireNode(identifier, module) {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: identifier,
        },
        init: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'require'
          },
          arguments: [
            {
              type: "Literal",
              value: module,
            }
          ]
        }
      }
    ],
    kind: "const"
  };
}

const result = createMochaTest();
result.body.push(createRequireNode('mocha', 'mocha'));
result.body.push(createRequireNode('chai', 'chai'));

const describe = createDescribe('can create function');

estraverse.traverse(ast, {
  enter: (node, parent) => {
    if (node.type === 'ExpressionStatement'
       && node.expression.callee.name === 'test') {
      describe.addIt(createIt('should success', node.expression.arguments[1].body.body));
    }
  },
});

result.body.push(describe.build());

const res = escodegen.generate(result, {
  format: {
    indent: {
      style: '  ',
      preserveBlankLines: true,
    },
  }
});

console.log(res);


//{
  //"type": "VariableDeclaration",
  //"declarations": [
    //{
      //"type": "VariableDeclarator",
      //"id": {
        //"type": "Identifier",
        //"name": "ava"
      //},
      //"init": {
        //"type": "CallExpression",
        //"callee": {
          //"type": "Identifier",
          //"name": "require"
        //},
        //"arguments": [
          //{
            //"type": "Literal",
            //"value": "ava",
            //"raw": "'ava'"
          //}
        //]
      //}
    //}
  //],
  //"kind": "const"
//}
