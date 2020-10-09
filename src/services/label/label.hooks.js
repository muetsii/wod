const { Label } = require('./label.class');

function addConfigurationLabels(context) {
    for (let conf of Label.CONF) {
        context.result[conf] = context.app.get(conf);
    }
}

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [addConfigurationLabels],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
