## Initial States Visual Generator for PIN-2024 project

### Quick start

Go to [`vroumbot.github.io/states-generator`](https://vroumbot.github.io/states-generator/) or run this locally to
quickly generate custom starting States to **test your simulations and strategy** on various
environments.

It should look like this:

![Screenshot of the generator](misc/screenshot.png)

### Output

When you're done, click on Export to JSON. This will download a `state.stat.json file`. Open it and check everything is
alright (and edit some values if needed). See example [here](misc/state.stat.json).

You can now remove the `.json`. You're left with a `.stat` file that you can use directly in your timeline generation
program!

### More details

You can customize some settings, for ex. the bot radius or the canvas size. Other customizations are on the way.

### TODO:

- Create the random explosion times
- Allow for user to choose robot's captureAngle, inital angle and speeds, particle radius, ...
