/**
 * Database Configuration
 * Supports both MongoDB and PostgreSQL
 */

const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const logger = require('./logger');

let sequelize = null;

const connectDB = async () => {
  try {
    const dbType = process.env.DB_TYPE || 'mongodb';

    if (dbType === 'mongodb') {
      await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info('MongoDB connected successfully');
    } else if (dbType === 'postgresql') {
      sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: 'postgres',
          logging: process.env.NODE_ENV === 'development' ? console.log : false,
        }
      );

      await sequelize.authenticate();
      logger.info('PostgreSQL connected successfully');
    }
  } catch (error) {
    logger.error('Database connection error:', error);
    throw error;
  }
};

const getSequelize = () => sequelize;

module.exports = {
  connectDB,
  getSequelize,
  mongoose,
};