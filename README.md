# cdk-cloudformation-extensions

Based on https://github.com/aws/aws-cdk-rfcs/issues/72#issuecomment-641072125

## Installation

```bash
echo "@gplassard:registry=https://npm.pkg.github.com" > .npmrc
yarn add -D @gplassard/cdk-cloudformation-extensions
```

## Usage

```typescript
// bin/app.ts
import { ApplicationStack } from './lib/ApplicationStack';
import { StackPolicy, StackPoliciesStack } from '@gplassard/cdk-cloudformation-extensions';

const app = new cdk.App();
// create an application stack
const stack = new MyApplicationStack(app, 'ApplicationStack', {
});
// create another stack which will attach stack policies to our applications stacks
new StackPoliciesStack(app, 'StackPolicies', {
    stackPoliciesAssignment: [
        {
            stack: stack,
            policy: {
                Statement: [
                    {
                        Effect: 'Allow',
                        Action: 'Update:*',
                        Principal: '*',
                        Resource: '*',
                    },
                ],
            }
        }
    ]
});
app.synth();
```
