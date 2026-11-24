---
name: awen-brand
description: Make work that follows the organisation's brand, memories and skills in awen. Use when the user asks for on-brand work, names a brand, a client or a style they saved in awen, or asks to change a saved default.
---

# Work on brand with awen

awen keeps the organisation's brand knowledge as memories and skills. awen's agent reads them itself on every turn.

## Name what to follow

1. Call `list_memories` to see the names of the memories the user can use.
2. Name the memories and skills that apply in the `prompt` of `create_with_awen`, in the user's words, such as "follow the Spring 27 brand memory". Do not copy their contents into the prompt: awen's agent reads the current version itself.
3. Do not take brand rules from files on this machine unless the user asks you to. Upload such a file as a reference instead, as the `awen-create` skill describes.

## Saved defaults

Saved defaults, such as how many images to make, live in awen. To change one, ask awen's agent in a turn. Do not save it in your own memory: the next turn in awen would not see it.
