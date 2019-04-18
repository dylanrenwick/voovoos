# Voovoos

Voovoos is a dumb 2d language in which, every other step, the instruction pointer's location and direction is mirrored on both the X and Y axes.

Why did I make this? I have no idea, I thought of the name "Voovoos" and thought it'd be a cool name for an esolang, but wanted to make a truly esoteric language, not just another poor attempt at a golflang.

## What?

Ok so imagine this is your 2D code grid:

```
xc  lv
^<.  c
^^,  ?
```

The Instruction Pointer (IP from here on) starts at the `x`, travelling right.  
On the first tick it will land on the `c`, which pushes 100 to the stack.  
On the second tick, the position and direction are mirrored. This moves the IP to the space to the left of `?` on the last row, moving left.  
It'll move left 1 space, then mirror back up to the space to the right of `c` on the first row.

Rinse and repeat.

Is it practical?  
No! Of course not, that's the point.

## Code atoms

Look at the end of `voovoos.js` to see all the accepted code atoms and what they do. Anything that is not a valid code atom is a no-op  
New atoms are super easy to add if you're at all familiar with basic JS syntax and lambdas. Please, please, **please**, submit PRs to add more atoms, lord knows I won't be adding any more :P
