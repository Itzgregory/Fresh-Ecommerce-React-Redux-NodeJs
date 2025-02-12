const { app } = require('./server');
const getConnections = require('../../config/DB/connection');
const { logger, logerror } = require('../helpers/logger');
const { variables: { PORT } } = require('../../config');

const startServer = async () => {
    try {
        const message = await getConnections();
        logger.info(message);

        app.listen(PORT || 9000, () => {
            logger.info(`Server is listening on port ${PORT}`);
        });

        app.on('error', (err) => {
            logerror.error(`Server error: ${err}`);
            process.exit(1);
        });

    } catch (error) {
        logerror.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
};

startServer();