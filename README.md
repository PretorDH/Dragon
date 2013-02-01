Dragon
======

Dragon - smart scrolling jQuery plugin...

<ul>
    <li>
        <h2>Scroll on drag</h2>
        <p>
            Click and drag for scroll content in both direction. 
            If cursor move fast, content scrolled fastest.
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
        <h2>Metro style</h2>
        <p>
            No limits to use scroll. 
            Use horizontal scroll in own projects with Metro style. 
            Or use vertical scroll, as well as combine both.
        </p>
    </li>
    <li>
        <h2>Customizable scrollbars (in developing)</h2>
        <p>
            User customisable scroll bars on CSS-based in WebKit 
            and based on JS in most other browsers.
        </p>
    </li>
    <li>
        <h2>Smoth pagination plugin (in developing)</h2>
            Smoth automatic scroll to anchor in contents. 
            Anchors works without any plugin, but is not smoth.
    </li>
    <li>
        <h2>Touch scroll</h2>
            Use default touch action for scrolling content on tablet. 
            Smart touch scrolling in development.
    </li>
</ul>

<br/>
<br/>
<br/>

<h1>DragOn - Let´s fly...<h1>

<h3>How to use...</h3>


    <head>
      ...
      <script src="//code.jquery.com/jquery-latest.js"></script> 
      <script src="[path]/drag-on.js"></script> 
      ...
    </head>
    <body>
      <div class='dragon'> 
        [content] 
      </div>
    </body>


<p>Add a class "dragon" only to the root block with the content. Do not 
add the class to &lt;body&gt;. All block elements with active scrolling 
inside root element with a class "dragon", will be connected.
</p>
<p>Be careful.<br/>Event capturing mousedown, between the root and the block 
with scrolling, probably forbid smart scrolling. 
In this case, you can assign multiple nested root blocks.</p>


    <script> 
      $( function(){ 
        $( [selector] ).dragOn();
      }); 
    </script>

