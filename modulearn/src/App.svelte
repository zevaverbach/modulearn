<script>
	import { onMount } from 'svelte';
    import Youtube from "@sveltecasts/svelte-youtube";
    import Modules from "./Modules.svelte"
    import { currentModule } from "./stores.js"
    let video, position, interval;

    // TODO: load data from JSON or an API
    // TODO: validate the data: overlaps? gaps? (gaps should be ok).
    // TODO: support segments from multiple videos
    //   - youtube iframes can have a start/end time, for example
    // TODO: (depends on above) enable search

    onMount(() => positionUpdater())

    const positionUpdater = () => {
        interval = setInterval(() => {
            position = video.position()
            const newModule = getModule(position)
            if (newModule !== $currentModule) {
              currentModule.update(() => newModule)
            }
          }, 100)
      }

    const onSelectModule = event => {
      const module = event.detail.module
      if (module.name !== $currentModule) {
        clearInterval(interval)
        currentModule.update(() => module.name)
        video.jumpTo(module.start)
        positionUpdater()
      }
    }

    const getModule = position => {
      for (const module of DATA.modules) {
        if (position > module.start && position < module.end) {
          return module.name
        }
      }
      /* return DATA.modules[0].name */
    }

    const DATA = {
      platform: "YouTube",
      uid: "ZPxuohy5SoU",
      prereqs: [
        "I know Python to some extent.",
        "I know data science and ETL to some extent."
      ],
      outcomes: [
        "I know how to use Kedro in a basic way."
      ],
      modules: [
        {
          name: "Intro: Tom Goldenberg",
          start: 29,
          end: 116,
          outcome: "know who Tom Goldenberg is"
        },
        {
          name: "Intro: QuantumBlack",
          start: 116,
          end: 177,
          outcome: "know something about QuantumBlack"
        },
        {
          name: "Intro: Agenda",
          start: 177,
          end: 242,
          outcome: "know what the agenda is"
        },
        {
          name: "Intro: Kedro",
          start: 242,
          end: 523,
          outcome: "know what Kedro is"
        },
        {
          name: "Intro: kedro-viz",
          start: 523,
          end: 558,
          outcome: "know what kedro-viz is"
        },
        {
          name: "Intro: MLFlow",
          start: 558,
          end: 871,
          outcome: "know what MLFlow is"
        },
        {
          name: "installing Kedro and prereqs",
          start: 871,
          end: 939,
          outcome: "have pandas/conda and kedro installed"
        },
        {
          name: "create a virtual environment",
          start: 939,
          end: 1038,
          outcome: "have an activated virtual environment for playing with kedro (`kedro info` produces something)"
        },
        {
          name: "create a kedro project",
          start: 1038,
          end: 1175,
          outcome: "create a new kedro project"
        },
      ],
    }

</script>

<main>
	<h1>Modulearn</h1>
    <Youtube bind:this={video} videoId={DATA.uid} />
    <Modules on:selectModule={onSelectModule} modules={DATA.modules} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
