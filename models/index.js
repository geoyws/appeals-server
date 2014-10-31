var mongoose = require("mongoose");
var schemas = require("../schemas");
var Promise = require("bluebird");

console.log(schemas);

var models = {
  c: {
    model: function () {
      var c = mongoose.model("c", schemas.c.schema());
      Promise.promisifyAll(c);
      Promise.promisifyAll(c.prototype);
      return c;
    }(),
    mc: {
      model: function () {
	var mc = mongoose.model("c.mc", schemas.c.mc.schema());
	Promise.promisifyAll(mc);
	Promise.promisifyAll(mc.prototype);
	return mc;
      }(),
      m: {
	model: function () {
	  var m = mongoose.model("c.mc.m", schemas.c.mc.m.schema());
	  Promise.promisifyAll(m);
	  Promise.promisifyAll(m.prototype);
	  return m;
	}()
      }
    }
  }
};

exports = module.exports = models;

