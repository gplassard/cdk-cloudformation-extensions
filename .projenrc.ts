// .projenrc.ts
import { TypescriptLibraryProject } from '@gplassard/projen-extensions';

// opinionated wrapper around projen TypeScriptProject for libraries
const project = new TypescriptLibraryProject({
  name: 'cdk-cloudformation-extensions',
  packageName: '@gplassard/cdk-cloudformation-extensions',
  devDeps: ['aws-cdk-lib', 'constructs'],
  peerDeps: ['aws-cdk-lib', 'constructs'],
});
project.synth();