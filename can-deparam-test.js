var deparam = require('./can-deparam');
var QUnit = require('steal-qunit');
var stringToAny = require("can-string-to-any");

QUnit.module('can-deparam');

QUnit.test("Basic deparam", function(assert) {
	var data = deparam("a=b");
	assert.equal(data.a, "b");

	var data2 = deparam("a=b&c=d");
	assert.equal(data2.a, "b");
	assert.equal(data2.c, "d");
});

/* commented-out: only support flat-structure to avoid encoded-characters
QUnit.test('Nested deparam', function(assert) {
	var data = deparam('a[b]=1&a[c]=2');
	assert.equal(data.a.b, 1);
	assert.equal(data.a.c, 2);
	data = deparam('a[]=1&a[]=2');
	assert.equal(data.a[0], 1);
	assert.equal(data.a[1], 2);
	data = deparam('a[b][]=1&a[b][]=2');
	assert.equal(data.a.b[0], 1);
	assert.equal(data.a.b[1], 2);
	data = deparam('a[0]=1&a[1]=2');
	assert.equal(data.a[0], 1);
	assert.equal(data.a[1], 2);
});
*/

QUnit.test('Remaining ampersand', function(assert) {
	/* commented-out: only support flat-structure to avoid encoded-characters
	var data = deparam('a[b]=1&a[c]=2&');
	assert.deepEqual(data, {
		a: {
			b: '1',
			c: '2'
		}
	});
	*/

	var data = deparam('a=1&b=2&');
	assert.deepEqual(data, {
		a: '1',
		b: '2'
	});
});

QUnit.test('Invalid encoding', function(assert) {
	var data = deparam('foo=%0g');
	assert.deepEqual(data, {
		foo: '%0g'
	});
});

/* commented-out: only support flat-structure to avoid encoded-characters
QUnit.test("deparam deep", function(assert) {
	assert.deepEqual(deparam("age[or][][lte]=5&age[or][]=null"), {
		age: {
			or: [ {lte: "5"}, "null" ]
		}
	});
});
*/

QUnit.test("takes value deserializer", function(assert) {
	/* commented-out: only support flat-structure to avoid encoded-characters
	assert.deepEqual(deparam("age[or][][lte]=5&age[or][]=null", stringToAny), {
		age: {
			or: [ {lte: 5}, null ]
		}
	});
	*/

	assert.deepEqual(deparam("undefined=undefined&null=null&NaN=NaN&true=true&false=false", stringToAny), {
		"undefined": undefined,
		"null": null,
		"NaN": NaN,
		"true": true,
		"false": false
	});
});

QUnit.test("deparam an array", function(assert) {
	/* commented-out: only support flat-structure to avoid encoded-characters
	var data = deparam("a[0]=1&a[1]=2");
	*/
	var data = deparam("a=1&a=2");
	assert.equal(data.a[0], '1');
	assert.equal(data.a[1], '2');
});

QUnit.test("deparam object with spaces", function(assert) {
	var data = deparam("a+b=c+d&+e+f+=+j+h+");
	assert.equal(data["a b"], "c d");
	assert.equal(data[" e f "], " j h ");
});
