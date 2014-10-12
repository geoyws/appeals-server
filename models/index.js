var mongoose = require("mongoose");
var schemas = require("../schemas");
var Model = mongoose.model;

var m = { // models
  c: {
    model: function () {
      return Model("c", schemas.c.schema());
    },
    mc: {
      model: function () {
	return Model("c.mc", schemas.c.mc.schema());
      },
      m: {
	model: function () {
	  return Model("c.mc.m", schemas.c.mc.m.schema();
      }
    }
  }
};

m = module.exports;
