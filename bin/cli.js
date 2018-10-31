#!/usr/bin/env node
const program = require('commander');
const ci = require('../lib/ci.js');

program
  .version('1.0.0')
  .usage('[command] [options]')

program
  .command('notify-breakage')
  .description('Post notification to Teams of build failure')
  .option('-p, --project <value>', 'Project name')
  .option('-b, --branch <value>', 'Branch name')
  .option('-l, --location <value>', 'Breakage detail location')
  .option('-cl, --channelLocation <value>', 'URI for channel webhook')
  .action(async (cmd) => {
    try {
      if (!cmd.project) { throw new Error('Project not specified'); }
      if (!cmd.branch) { throw new Error('Branch not specified'); }
      if (!cmd.location) { throw new Error('Breakage detail location not specified'); }
      if (!cmd.channelLocation) { throw new Error('Team channel location not specified'); }

      await ci.notifyBreakage(cmd.project, cmd.branch, cmd.location, cmd.channelLocation);
    } catch (e) {
      console.log('There was a problem posting the message:', e.message);
    }
  });

program.parse(process.argv);

