import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, expect, it } from 'vitest';
import { StackPoliciesStack, BaseStack } from '../../src';
import { testTags } from '../tags/Tags';

describe('StackPoliciesStack', () => {
  const app = new App();
  const firstProtectedStack = new BaseStack(app, 'FirstProtectedStack', {
    stackName: 'first-stack',
    tags: testTags(),
  });
  const secondProtectedStack = new BaseStack(app, 'SecondProtectedStack', {
    stackName: 'second-stack',
    tags: testTags(),
  });

  it('generate the correct cloudformation', () => {
    const policiesStack = new StackPoliciesStack(app, 'PolicyStack', {
      stackName: 'policy-stack',
      tags: testTags(),
      stackPoliciesAssignment: [
        {
          stack: firstProtectedStack,
          policy: {
            Statement: [
              {
                Effect: 'Allow',
                Action: 'Update:*',
                Principal: '*',
                Resource: '*',
              },
              {
                Effect: 'Deny',
                Action: 'Update:Delete',
                Principal: '*',
                Resource: '*',
              },
            ],
          },
        },
        {
          stack: secondProtectedStack,
          policy: {
            Statement: [
              {
                Effect: 'Allow',
                Action: 'Update:*',
                Principal: '*',
                Resource: '*',
              },
              {
                Effect: 'Deny',
                Action: 'Update:Replace',
                Principal: '*',
                Resource: '*',
              },
            ],
          },
        },
      ],
    });
    const template = Template.fromStack(policiesStack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
