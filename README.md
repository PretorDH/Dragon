Dragon
======

Dragon - smart scrolling jQuery plugin for correct scrolling mechanics

<ul>
    <li>
        <h2>Scroll on drag</h2>
        <p>
            Click and drag for scroll content in both direction. 
            On desktop with mouse, like a touch on tablet.
            Accelerated and inertial motion(easing) for all scrollable blocks.
        </p>
    </li>
    <li>
        <h2>Wheel fullfil</h2>
        <p>
            Scroll page with mouse wheel in both direction. 
            Horizontal or vertical scroll available any time. 
            Without modification key.
        </p>
    </li>
    <li>
        <h2>Extended keyboard scrolling</h3>
	 	<p>
			Smoth scrolling with keyboard control keys.
			Suport horizontal and vertical scrolling for blocks in best visual position.
        </p>
    </li>
    <li>
        <h2>Metro style</h2>
        <p>
            No limits to use scroll. 
            Use horizontal scroll in own projects with Metro style. 
            Or use vertical scroll, as well as combine both.
        </p>
    </li>
    <li>
        <h2>One instance</h2>
        <p>
            Only one instance of object DragOn will support Scrolling for all child blocks. 
        </p>
    </li>    
    <li>
        <h2>Customizable scrollbars (beta)</h2>
        <p>
            Plug-in to changing scrollbars style <i>bar-on.js</i>
            Do not created any wrappers for scrolled block.
            Only two auxiliary blocks will created for object BarOn.
            Only one instance of object BarOn will support Scrollbars for all child blocks.

            Bars style fully specified in CSS.
            Worked under model of scroll event.
        </p>
        <p>
            Primary scrollbars change:
            Scrollbar will be located on the border of the visible part of the block. 
            Even if the bottom block is beyond the boundaries of the parent.
        </p>
    </li>
    <li>
        <h2>Smoth pagination plugin (in developing)</h2>
        <p>
            Smoth automatic scroll to anchor in contents. 
            Anchors works without any plugin, but is not smoth.
        </p>
    </li>
    <li>
        <h2>Touch scroll (in developing)</h2>
        <p>
            Use default touch action for scrolling content on tablet. 
            Smart touch scrolling in development.
        </p>
    </li>
</ul>

<br/>
<br/>
<br/>

<h1>DragOn - Let´s fly...<h1>

<h3>How to use...</h3>

<pre>
    &lt;head>
      ...
      &lt;script src="//code.jquery.com/jquery-latest.js"></script> 
      &lt;script src="[path]/drag-on.js"></script> 
      ...
    &lt;/head>
    &lt;body class='dragon'>
        [content] 
    &lt;/body>
</pre>

<p>Add once a class "dragon" to the &lt;body&gt; block or any other blocks. 
All block elements with active scrolling inside root element with a class "dragon", 
will be connected. All content who inserted later into any child block will be connected too.
</p>
<p>Be careful.<br/>Event capturing mousedown,scroll or keydown, between the root and the block 
with scrolling, probably forbid smart scrolling. 
In this case, you can assign multiple nested root blocks.</p>

<pre>
    &lt;script> 
        $( function(){ 
        $( [selector] ).dragOn([options]);
        }); 
    &lt;/script>
</pre>

<h3>Options</h3>
<p>Options is [:object:{['name':'value'],...}] replace default values of DragOn.</p>
<p><b>cursor</b> &mdash; [:text - <i>def</i>: 'all-scroll'] You can setup mouse cursor over scrolable content.</p>
<p><b>exclusion</b> &mdash; [ :object:{['tagName':''],...} - <i>def</i>: {'input':'', 'textarea':'', 'select':'', 'object':''}] 
This is the object in which the field 
names are the names of the tags. These tags will be excluded from processing.
Anchor tag &lt;A&gt; is processed separately.</p>
<p><b>easing</b> &mdash; [:boolean - <i>def</i>: true] Easing of acceleration after end dragging.</p>

<h3>Triggers</h3>
<p> 'DragOn.toggle' - enable/disable functionality of DragOn (include plug-ins). </p> 
<p> 'DragOn.remove' - destroy DragOn object. </p> 
Use:
<pre>
	$( [selector] ).trigger('DragOn.toggle');
</pre>

<h3>Data- flags</h3>
<p> Block with attribute data-overflow="no-dragon" will be bypassed. Event 'mousewheel' will be sent to him.</p> 

Usage:
<pre>
	&lt;body class='dragon'>
        [content] 
		&lt;div data-overflow="no-dragon">
		[content]
		&lt;/div>
        [content] 
	&lt;/body>
</pre>

<h1>BarOn - Let´s show...<h1>

<h3>How to use...</h3>

<pre>
    &lt;head>
        ...
        &lt;script src="//code.jquery.com/jquery-latest.js"></script> 
        &lt;script src="[path]/drag-on.js"></script> 
        &lt;script src="[path]/bar-on.js"></script> 
        ...
    &lt;/head>
    &lt;body class='dragon'>
        [content] 
    &lt;/body>
</pre>

<p>Include the <b>bar-on.js</b> in header and all block with class "dragon" will be with unique scrollbars. 
Scrollbars will show for all block elements with active scrolling inside root element with a class "dragon". 
All content who inserted later into any child block will be connected too.</p>

<h3>Triggers</h3>
<p> 'BarOn.toggle' - enable/disable functionality of BarOn. </p> 
<p> 'BarOn.remove' - destroy BarOn object. </p> 

Use:
<pre>
	$( [selector] ).trigger('BarOn.toggle');
</pre>

<h3>Data- flags</h3>
<p> Block with attribute data-overflow-x="no-baron" will stay default horizontal scrollbar.</p> 
<p> Block with attribute data-overflow-y="no-baron" will stay default vertical scroll bar .</p> 

Usage:
<pre>
	&lt;body class='dragon'>
        [content] 
		&lt;div data-overflow-x="no-baron" data-overflow-y="no-baron">
		[content]
		&lt;/div>
        [content] 
	&lt;/body>
</pre>

<h3>Style example...</h3>
<pre>
.rBarOn,.bBarOn {
	display: block;
	z-index: 3;		
	background-color: red;
	border-radius:2px;
	opacity:.75;
}
.rBarOn {
	width: 4px;
	border-left: 2px white solid;
	margin-right:2px;
}
.bBarOn {
	height: 4px;
	border-top: 2px white solid;
	margin-bottom:2px;
}
.rBarOn:hover {
	width: 12px;
	border-left: 2px white solid;
	border-radius:6px;
}
.bBarOn:hover {
	height: 12px;
	border-top: 2px white solid;
	border-radius:6px;
}
</pre>
