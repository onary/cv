module.exports = 
{ 
  "development":
  { 
       "driver":   "mongodb"
     , "url":      "mongodb://localhost/onary"
  }
  , "test":
  { 
       "driver":   "mongodb"
     , "url":      "mongodb://localhost/onary"
  }
  , "production":
  { 
      "driver":   "mongodb"
    , "url":      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
  }
};
