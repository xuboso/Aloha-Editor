/** Aloha Editor | Version 1.0 | github.com/alohaeditor */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name aloha.min.js
// @check_types
// ==/ClosureCompiler==

define([
	'arrays',
	'blocks',
	'boundaries',
	'boundary-markers',
	'browser',
	'caret',
	'content',
	'colors',
	'cursors',
	'dom',
	'dragdrop',
	'predicates',
	'dom-to-xhtml',
	'editing',
	'ephemera',
	'events',
	'functions',
	'html',
	'mouse',
	'pubsub',
	'keys',
	'maps',
	'ranges',
	'stable-range',
	'strings',
	'traversing',
	'typing',
	'undo',
	'editables'
], function Aloha(
	Arrays,
	Blocks,
	Boundaries,
	Boundarymarkers,
	Browser,
	Caret,
	Content,
	Colors,
	Cursors,
	Dom,
	DragDrop,
	Predicates,
	Xhtml,
	Editing,
	Ephemera,
	Events,
	Fn,
	Html,
	Mouse,
	Pubsub,
	Keys,
	Maps,
	Ranges,
	StableRange,
	Strings,
	Traversing,
	Typing,
	Undo,
	Editables
) {
	'use strict';

	var last;

	/*
	setInterval(function () {
		var range = last && Ranges.createFromPoint(last.clientX, last.clientY);
		if (range) {
			console.log(Boundarymarkers.hint(range));
		}
	}, 1000);
	*/

	function setSelection(event) {
		if (event.native) {
			last = event.native;
		}
		if (event.range) {
			Ranges.select(event.range);
		}
	}

	function editor(native, custom) {
		var event = custom || {'native' : native};
		event.editor = editor;
		Events.compose(
			event,
			Keys.handle,
			Mouse.handle,
			DragDrop.handle,
			Blocks.handle,
			Typing.handle,
			setSelection
		);
	}

	editor.editables = {};
	editor.BLOCK_CLASS = 'aloha-block';

	Events.setup(editor, document);

	/**
	 * The Aloha Editor namespace root.
	 *
	 * Also serves as short aloha.aloha.
	 */
	function aloha(elem) {
		var editable = Editables.Editable(elem);
		editable.overrides = [];
		editable.settings = {
			defaultBlockNodeName: 'div'
		};
		Editables.assocIntoEditor(editor, editable);
		elem.setAttribute('contentEditable', 'true');
		Undo.enter(editable.undoContext, {
			meta: {type: 'external'},
			partitionRecords: true
		});
		editor(null, {
			'type'     : 'aloha',
			'editable' : editable
		});
	}

	function mahalo(elem) {
		var editable = Editables.fromElem(editor, elem);
		Editables.close(editable);
		Editables.dissocFromEditor(editor, editable);
		elem.removeAttribute('contentEditable');
		editor(null, {
			'type'     : 'mahalo',
			'editable' : editable
		});
	}

	aloha['aloha'] = aloha;
	aloha['mahalo'] = mahalo;
	aloha['arrays'] = Arrays;
	aloha['blocks'] = Blocks;
	aloha['boundaries'] = Boundaries;
	aloha['boundarymarkers'] = Boundarymarkers;
	aloha['browser'] = Browser;
	aloha['caret'] = Caret;
	aloha['content'] = Content;
	aloha['colors'] = Colors;
	aloha['cursors'] = Cursors;
	aloha['dom'] = Dom;
	aloha['dragdrop'] = DragDrop;
	aloha['predicates'] = Predicates;
	aloha['editing'] = Editing;
	aloha['ephemera'] = Ephemera;
	aloha['events'] = Events;
	aloha['fn'] = Fn;
	aloha['html'] = Html;
	aloha['typing'] = Typing;
	aloha['keys'] = Keys;
	aloha['mouse'] = Mouse;
	aloha['maps'] = Maps;
	aloha['pubsub'] = Pubsub;
	aloha['ranges'] = Ranges;
	aloha['stablerange'] = StableRange;
	aloha['strings'] = Strings;
	aloha['traversing'] = Traversing;
	aloha['xhtml'] = Xhtml;
	aloha['undo'] = Undo;

	window['aloha'] = aloha;

	return aloha;
});
