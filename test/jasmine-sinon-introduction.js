//modified to work with jasmine and jasmine-sinon


describe("A \"once\" function", function() {
	function once(fn) {
		var returnValue, called = false;
		return function () {
			if (!called) {
				called = true;
				returnValue = fn.apply(this, arguments);
			}
			return returnValue;
		};
	}

	it("calls the original function", function () {
		var callback = sinon.spy();
		var proxy = once(callback);

		proxy();

		expect(callback.called).toBeTruthy();
		// jasmin-sinon
		expect(callback).toHaveBeenCalled();
	});

	it("calls the original function only once", function () {
		var callback = sinon.spy();
		var proxy = once(callback);

		proxy();
		proxy();

		expect(callback.calledOnce).toBeTruthy();
		expect(callback.callCount).toBe(1);
	    // ...or:
	    // assert.equals(callback.callCount, 1);
	});

	it("calls original function with right this and args", function () {
		var callback = sinon.spy();
		var proxy = once(callback);
		var obj = {};

		proxy.call(obj, 1, 2, 3);

		expect(callback.calledOn(obj)).toBeTruthy();
		expect(callback.calledWith(1, 2, 3)).toBeTruthy();
	});

	it("returns the return value from the original function", function () {
	    var callback = sinon.stub().returns(42);
	    var proxy = once(callback);

	    expect(proxy()).toEqual(42);
	});

});

describe("Testing Ajax", function() {
	function getTodos(listId, callback) {
	    jQuery.ajax({
	        url: "/todo/" + listId + "/items",
	        success: function (data) {
	            // Node-style CPS: callback(err, data)
	            callback(null, data);
	        }
	    });
	}

	afterAll(function () {
	    // When the test either fails or passes, restore the original
	    // jQuery ajax function (Sinon.JS also provides tools to help
	    // test frameworks automate clean-up like this)
	    jQuery.ajax.restore();
	});

	it("makes a GET request for todo items", function () {
	    sinon.stub(jQuery, "ajax");
	    getTodos(42, sinon.spy());

	    expect(jQuery.ajax).toHaveBeenCalledWithMatch({ url: "/todo/42/items" });
	});

});


describe("Testing Ajax Fake", function() {
	function getTodos(listId, callback) {
	    jQuery.ajax({
	        url: "/todo/" + listId + "/items",
	        success: function (data) {
	            // Node-style CPS: callback(err, data)
	            callback(null, data);
	        }
	    });
	}
	var xhr, requests;

	beforeAll(function () {
	    xhr = sinon.useFakeXMLHttpRequest();
	    requests = [];
	    xhr.onCreate = function (req) { requests.push(req); };
	});

	afterAll(function () {
	    // Like before we must clean up when tampering with globals.
	    xhr.restore();
	});

	it("makes a GET request for todo items", function () {
	    getTodos(42, sinon.spy());

	    expect(requests.length).toEqual(1);
	    expect(requests[0].url).toMatch("/todo/42/items");
	});

});

describe("Testing Ajax Fake Server", function() {
	function getTodos(listId, callback) {
	    jQuery.ajax({
	        url: "/todo/" + listId + "/items",
	        success: function (data) {
	            // Node-style CPS: callback(err, data)
	            callback(null, data);
	        }
	    });
	}
	var server;

	beforeAll(function () { server = sinon.fakeServer.create(); });
	afterAll(function () { server.restore(); });

	it("calls callback with deserialized data", function () {
	    var callback = sinon.spy();
	    getTodos(42, callback);

	    // This is part of the FakeXMLHttpRequest API
	    server.requests[0].respond(
	        200,
	        { "Content-Type": "application/json" },
	        JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
	    );

	    expect(callback).toHaveBeenCalledOnce();
	});

});

describe("Testing Fake Time", function() {
	function throttle(callback) {
	    var timer;
	    return function () {
	        clearTimeout(timer);
	        var args = [].slice.call(arguments);
	        timer = setTimeout(function () {
	            callback.apply(this, args);
	        }, 100);
	    };
	}

	var clock;

	beforeAll(function () { clock = sinon.useFakeTimers(); });
	afterAll(function () { clock.restore(); });

	it("calls callback after 100ms", function () {
	    var callback = sinon.spy();
	    var throttled = throttle(callback);

	    throttled();

	    clock.tick(99);
	    expect(callback).not.toHaveBeenCalled();

	    clock.tick(1);
	    expect(callback).toHaveBeenCalledOnce();

	    // Also:
	    // assert.equals(new Date().getTime(), 100);
	    expect(new Date().getTime()).toEqual(100);
	});

});








