const enrichObjects = (platform, uid, objects) => objects.map((object, index) => ({...{index, duration: object.end - object.start, uid, platform}, ...object}))

export const kedro_modules = enrichObjects(
  'YouTube',
  'ZPxuohy5SoU',
  [
    {
      start: 0,
      end: 29,
      outcome: 'skip this part',
    },
    {
      start: 29,
      end: 116,
      outcome: 'know who Tom Goldenberg is',
    },
    {
      start: 116,
      end: 177,
      outcome: 'know something about QuantumBlack',
    },
    {
      start: 177,
      end: 242,
      outcome: 'know what the agenda is',
    },
    {
      start: 242,
      end: 523,
      outcome: 'know what Kedro is',
    },
    {
      start: 523,
      end: 558,
      outcome: 'know what kedro-viz is',
    },
    {
      start: 558,
      end: 871,
      outcome: 'know what MLFlow is',
    },
    {
      start: 871,
      end: 939,
      outcome: 'have pandas/conda and kedro installed',
    },
    {
      start: 939,
      end: 1038,
      outcome: 'have an activated virtual environment for playing with kedro (`kedro info` produces something)',
    },
    {
      start: 1038,
      end: 2932,
      outcome: 'create a new kedro project',
    },
  ]
)
