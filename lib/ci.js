const rp = require('request-promise');

function createBreakageMessage(projectName, branchName, jobUrl) {
  const message = {
    '@context': 'https://schema.org/extensions',
    '@type': 'MessageCard',
    themeColor: '0072C6',
    title: 'CI breakage',
    text: `${projectName} CI job failed on branch ${branchName}!`,
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'Go to job',
        targets: [
          {
            os: 'default',
            uri: jobUrl,
          },
        ],
      },
    ],
  };
  return message;
}

module.exports.notify = async (message, channelUri) => {
  return rp.post({ uri: channelUri, body: message, json:true });
};

module.exports.notifyBreakage = async (projectName, branchName, jobUrl, channelUri) => this.notify(createBreakageMessage(projectName, branchName, jobUrl), channelUri);
