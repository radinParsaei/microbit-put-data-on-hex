# put data in microbit hex file
### why:
it was a question for me how makecode and micropython IDE can generate hex files for microbit without calling c compiler and requesting any server and I found this link https://github.com/bbcmicrobit/micropython/blob/master/docs/devguide/hexformat.rst for micropython and for makecode it looks like it does some more steps and there is bunch of typescript code in their repo to compile (static) TypeScript to hex (more information can be found in their repo: https://github.com/microsoft/pxt)

so, finally I ended up with making an arduino code that reads our data(program or something else) from last cells in flash memory and then we append that data to hex file and this repo is the materials we need for that

I used [arduino nvm](https://github.com/d00616/arduino-NVM) library to read flash memory and for generating a full dump of microbit's flash memory (the hex file we put data in it) I used [ubittool](https://github.com/carlosperate/ubittool) (read-flash command)
in `arduino-code/` is an `.ino` file that reads memory from end until it finds an empty cell(0xFFFFFFFF) and then prints it into Serial
`putData.js` is the utility that do the replace and put the data in

so if you want to make a runtime for microbit that can used in an editor like what micropython does you can use this repo(actually I guess what micropython is doing is diffrent (generating uicr and stuff like that) but what we have here works)

also if you want to use micropython in your editor (or somthing else) there is a good library for that documented here: https://microbit-foundation.github.io/microbit-fs/
