const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };

    error.message = err.message;

    console.error(err);

    if (err.code) {
      switch (err.code) {
        case "ECONNREFUSED":
          return res
            .status(500)
            .json({ error: "The database connection was refused." });
        case "ETIMEDOUT":
          return res
            .status(500)
            .json({ error: "The database connection timed out." });
        case "ER_ACCESS_DENIED_ERROR":
          return res
            .status(401)
            .json({ error: "Database authentication error." });
        case "ER_BAD_DB_ERROR":
          return res
            .status(500)
            .json({ error: "The specified database does not exist." });
        case "ER_PARSE_ERROR":
          return res.status(400).json({ error: "SQL query syntax error." });

        default:
          break;
      }
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Internal server error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
