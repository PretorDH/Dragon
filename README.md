Dragon
======

Dragon - smart scrolling jQuery plugin...

Scroll on drag
    Click and drag for scroll content in both direction. 
    If cursor move fast, content scrolled fastest.

Wheel fullfil
    Scroll page with mouse wheel in both direction. 
    Horizontal or vertical scroll available any time. 
    Without modification key.

Metro style
    No limits to use scroll. 
    Use horizontal scroll in own projects with Metro style. 
    Or use vertical scroll, as well as combine both.

Customizable scrollbars (in developing)
    User customisable scroll bars on CSS-based in WebKit 
    and based on JS in all other browsers.

Smoth pagination plugin (in developing)
    Smoth automatic scroll to anchor in contents. 
    Anchors works without any plugin, but is not smoth.

Touch scroll
    Use default touch action for smart scrolling content on tablet.




DragOn - Let´s fly...

Automatically link the latest version
<script src="//dragon.deparadox.com/drag-on.js">
</script>

 
How to use...
    <head>
      ...
      <script src="//code.jquery.com/jquery-latest.js"></script> 
      <script src="//dragon.deparadox.com/drag-on.js"></script> 
      ...
    </head>
    <body>
      <div class='dragon'> 
        [content] 
      </div>
    </body>

Add a class "dragon" only to the root block with the content. Do not 
add the class to <body>. All block elements with active scrolling 
inside root element with a class "dragon", will be connected.

Be careful. Event capturing mousedown, between the root and the block 
with scrolling probably forbid smart scrolling. 
In this case, you can assign multiple nested root blocks.

<script> 
  $( function(){ 
    $( [selector] ).dragOn();
  }); 
</script>
