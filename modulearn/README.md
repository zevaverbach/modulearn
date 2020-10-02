[Demo](https://modulearn.vercel.app)

# Purpose
Learning something new is exciting and daunting. It can also be annoying and time-consuming when you already know a significant part of what's being taught.

## Existing Solutions

### Fast-Forwarding
A lot of learning material is broken down into modules, and to an extent the later material builds on the earlier. This makes fast-forwarding/skipping modules a viable solution. You can fast-forward even when things aren't so nicely broken down.

### Keyword Search
Sometimes there's transcripts provided along with recorded learning material. Whether they're tied interactively to the media or not, you can search for the keywords you're most interested in and jump to those spots with relative ease.

### Learning by Doing
A lot of the time the best way to learn is to work on a project that uses the skill you want to learn. When you get stuck, just Google your way out of it or go to the relevant part of the documentation.

## Proposed Solution
Simple navigation across and within learning "modules", enabled by 

1) a plugin linking the content with the navigation
2) JSON for every module/submodule indicating their _prerequisites_ and intended learning _outcomes_

### Creating the JSON Metadata
(see JSON example under "API/Recorded Media" below)

For someone familiar with a unit of learning -- say, a 45-minute tech talk -- they may be able to create the JSON by hand without a lot of trouble.

For large bodies of media, it might be better to try to automate this using transcripts + NLP, perhaps by including existing metadata about the media such as tables of contents, descriptions, etc.

# Business Model
... (see "Things That Could be Built..." below)

## Preexisting Assets
There is a massive and growing body of media which is fodder for annotation and modularization:

1) podcasts
2) conference talks
3) news media
4) MOOCs
5) topical/long-form YouTube
6) docuseries
7) ...

# API

## Recorded Media
Provide JSON file like this:

```
{
  "platform": "YouTube"
  "uid": "askasdl;",
  "prereqs": [
    "I know a programming language to some extent.",
    "I know how to use a terminal to some extent."
  ],
  "outcomes": [
    "I know how to navigate a codebase."
  ],
  "modules": [
    {
      "name": "Find a Good Project",
      "start": 25.32,
      "end": 141.12,
      "outcome": "have a project in mind whose codebase I want to navigate."
    },
    {
      "name": "Clone the Project",
      "start": 141.12,
      "end": 157.65,
      "outcome": "cloned the project."
    },
    ...
  ]
}
```

### Notes
- "start" is in seconds
- "prereqs" and "outcomes" should eventually support module names which are standardized and map to fuller definitions

# UI
A plugin/iframe that lets you mark an outcome as "done", indicating that you already know the topic, so it skips you to the relevant parts. Start with YouTube.

Prereqs: TBD

## Static Media
TBD

# Applications

## Podcasts
Some podcasts provide helpful metadata for navigating to the parts you're interested in. Then there's always the handy fast-forward button. Wouldn't it be nicer if you could 

1) check the boxes of the topics you're interested in and have those queued up?
2) store the "want to listen" items that you don't yet have the requisite knowledge to understand?
3) have a standardized, centralized list of topics you a) are interested in and b) understand?

# Things That Could be Built On Top of It
Searchable video collections to retrieve the submodules you're interested in, and maybe even create a learning roadmap for a given topic.

# Resources
- [YouTube iframe API](https://developers.google.com/youtube/iframe_api_reference#Retrieving_video_information)
- use asciinema for tech talk type things?
  - or [castty](https://github.com/dhobsd/castty) (includes sound)
- [plyr.js](https://github.com/sampotts/plyr#api)
  - supposedly could be used alongside streaming via DASH?
- [streaming](https://github.com/Dash-Industry-Forum/dash.js/wiki)
- https://github.com/vime-js/vime
- https://github.com/zevaverbach/svelte-youtube
