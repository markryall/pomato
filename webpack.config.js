module.exports = {
  entry : __dirname + "/src/index.js",
  output : {
    path : __dirname + "/public",
    filename : "scripts.js"
  },

  resolve : {
    modulesDirectories : ["node_modules"]
  },

  module : {
    loaders : [
      {test: /\.js$/, loader: "jsx-loader?harmony&stripTypes"}
    ]
  }
};
