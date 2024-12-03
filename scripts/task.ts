import chalk from 'chalk';
//import clipboard from 'copy-paste';
import { Option, Command } from 'commander';

import {
  runCommand,
  addBuiltVersion,
  getBuildCommands,
  checkBuiltVerions,
  getSubmitCommands,
  getEASUpdateCommands,
} from './utils';
import AppConfig from '../app.config';

const log = console.log;

export type BuildOptions = {
  local: boolean;
  output: string;
  submit: boolean;
  skipBuildValidation: boolean;
  binaryVersion: string | 'latest';
  platform: 'android' | 'ios' | 'all';
  profile: 'production' | 'preview' | 'debug';
  message: string;
};

const program = new Command();

program
  .addOption(
    new Option('-p, --platform <platform>', 'Platform to build for')
      .choices(['android', 'ios', 'all'])
      .default('all'),
  )
  .addOption(new Option('-l, --local', 'Local build').default(false))
  .addOption(new Option('-o, --output <output>', 'Output folder').default('build'))
  .addOption(new Option('--profile <profile>', 'Build profile').default('production'))
  .addOption(new Option('--submit', 'Submit the build to the store').default(false))
  .addOption(new Option('--binary-version <version>', 'Binary version'))
  .addOption(new Option('--skip-build-validation', 'Skip build validation').default(false))
  .addOption(new Option('-m --message', 'Message for EAS Updates'))
  .helpOption('-h, --help', 'display help for cmd');

program.parse(process.argv);

const options = program.opts<BuildOptions>();

const { commandBuild, dirOutputAndroid, dirOutputIos } = getBuildCommands(options);

const { commandSubmit } = getSubmitCommands(dirOutputAndroid, dirOutputIos, options);

const { cmdEASUpdate } = getEASUpdateCommands(options);

const taskOutputs: string[] = [];

async function main() {
  try {
    if (!options.binaryVersion) {
      if (!options.skipBuildValidation) {
        checkBuiltVerions(taskOutputs);
      }

      if (options.platform === 'all' || options.platform === 'ios') {
        taskOutputs.push(
          chalk.green.bgCyan.bold('[LOG]') + ' Building iOS version: ' + AppConfig.version,
        );
        await runCommand('Build iOS', commandBuild.ios, taskOutputs);
      }

      if (options.platform === 'all' || options.platform === 'android') {
        taskOutputs.push(
          chalk.green.bgCyan.bold('[LOG]') + ' Building Android version: ' + AppConfig.version,
        );
        await runCommand('Build Android', commandBuild.android, taskOutputs);
      }

      addBuiltVersion();
    }

    if (options.submit) {
      if (options.platform === 'all' || options.platform === 'ios') {
        taskOutputs.push(
          chalk.green.bgCyan.bold('[LOG]') + ' Submitting version for iOS: ' + AppConfig.version,
        );
        await runCommand('Submit iOS', commandSubmit.ios, taskOutputs);
      }

      if (options.platform === 'all' || options.platform === 'android') {
        taskOutputs.push(
          chalk.green.bgCyan.bold('[LOG]') +
            ' Submitting version for Android: ' +
            AppConfig.version,
        );
        await runCommand('Submit Android', commandSubmit.android, taskOutputs);
      }

      if (options.message) {
        taskOutputs.push(
          chalk.green.bgCyan.bold('[LOG]') +
            ' Publishing EAS Updates for version: ' +
            AppConfig.version,
        );

        await runCommand('Publish EAS Update', cmdEASUpdate, taskOutputs);
      }

      if (options.platform === 'all' || options.platform === 'ios') {
        taskOutputs.push(
          chalk.green.bgCyan.bold('[LOG]') + ' Cleaning XCode: ' + AppConfig.version,
        );

        const cmdXCodeClean = [
          'rm -rf ~/Library/Developer/Xcode/Archives/*',
          'rm -rf ~/Library/Developer/Xcode/DerivedData/*',
          'rm -rf ~/Library/Developer/CoreSimulator/Caches/*',
          'rm -rf ~/Library/Developer/CoreSimulator/Devices/*',
        ].join(' && ');

        await runCommand('Clean XCode', cmdXCodeClean, taskOutputs);
      }
    }
    console.clear();
    console.log(taskOutputs.join('\n'));
  } catch (error) {
    log(chalk.red.bgRed.bold('[ERROR]') + ' Error building version: ', AppConfig.version);
    console.error(error);
  }
}

main();
