import { AwsTags } from '../../src';

export function testTags(): AwsTags {
  return {
    app: 'test-app',
    env: 'test',
    repo: 'gplassard/cdk-cloudformation-extensions',
    team: 'dev',
    infraAsCode: 'cdk',
  };
}
