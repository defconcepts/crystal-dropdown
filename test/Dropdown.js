'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Dropdown from '../src/Dropdown';

describe('Dropdown', function() {
	it('should open dropdown', function(done) {
		var component = new Dropdown().render();
		assert.ok(!component.expanded);
		assert.ok(!dom.hasClass(component.element, 'open'));
		component.open();
		component.once('attrsChanged', function() {
			assert.ok(component.expanded);
			assert.ok(dom.hasClass(component.element, 'open'));
			component.dispose();
			done();
		});
	});

	it('should close dropdown', function(done) {
		var component = new Dropdown({
			expanded: true
		}).render();
		assert.ok(dom.hasClass(component.element, 'open'));
		component.close();
		component.once('attrsChanged', function() {
			assert.ok(!component.expanded);
			assert.ok(!dom.hasClass(component.element, 'open'));
			component.dispose();
			done();
		});
	});

	it('should toggle dropdown', function(done) {
		var component = new Dropdown().render();
		assert.ok(!component.expanded);
		assert.ok(!dom.hasClass(component.element, 'open'));
		component.toggle();
		component.once('attrsChanged', function() {
			assert.ok(component.expanded);
			assert.ok(dom.hasClass(component.element, 'open'));
			component.toggle();
			component.once('attrsChanged', function() {
				assert.ok(!component.expanded);
				assert.ok(!dom.hasClass(component.element, 'open'));
				component.dispose();
				done();
			});
		});
	});

	it('should change dropdown position', function(done) {
		var component = new Dropdown({
			position: 'up'
		}).render();
		assert.ok(dom.hasClass(component.element, 'dropdown'));
		assert.ok(dom.hasClass(component.element, 'dropup'));
		component.position = 'down';
		async.nextTick(function() {
			assert.ok(dom.hasClass(component.element, 'dropdown'));
			assert.ok(!dom.hasClass(component.element, 'dropup'));
			component.position = 'invalid';
			async.nextTick(function() {
				assert.ok(dom.hasClass(component.element, 'dropdown'));
				assert.ok(!dom.hasClass(component.element, 'dropinvalid'));
				component.dispose();
				done();
			});
		});
	});

	it('should close dropdown when click outside', function(done) {
		var component = new Dropdown().render();
		component.open();

		assert.ok(component.isOpen());
		dom.triggerEvent(component.element.firstChild, 'click');
		async.nextTick(function() {
			assert.ok(component.isOpen());
			dom.triggerEvent(document, 'click');
			async.nextTick(function() {
				assert.ok(!component.isOpen());
				component.dispose();
				done();
			});
		});
	});

	it('should decorate', function() {
		var config = {
			element: '#dropdown',
			id: 'dropdown',
			body: 'body',
			header: 'header'
		};

		var markup = ComponentRegistry.Templates.Dropdown.content(config);
		dom.append(document.body, markup.content);
		var markupFromDom = document.getElementById('dropdown').outerHTML;
		var component = new Dropdown(config).decorate();

		assert.strictEqual(component.element.outerHTML, markupFromDom);

		component.dispose();
	});
});
