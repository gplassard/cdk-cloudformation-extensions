import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BaseStack } from '../../src';
import { testTags } from '../tags/Tags';

describe('BaseStack', () => {
  const app = new App();

  it('generate the correct cloudformation', () => {
    const stack = new BaseStack(app, 'FirstProtectedStack', {
      stackName: 'first-stack',
      tags: testTags(),
    });

    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
