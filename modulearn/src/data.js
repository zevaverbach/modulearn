const add_indices = objects => objects.map((object, index) => ({...{index}, ...object}))

const _modules = [
    {
      name: 'Chaff',
      start: 0,
      end: 29,
      outcome: 'skip this part',
    },
    {
      name: 'Intro: Tom Goldenberg',
      start: 29,
      end: 116,
      outcome: 'know who Tom Goldenberg is',
    },
    {
      name: 'Intro: QuantumBlack',
      start: 116,
      end: 177,
      outcome: 'know something about QuantumBlack',
    },
    {
      name: 'Intro: Agenda',
      start: 177,
      end: 242,
      outcome: 'know what the agenda is',
    },
    {
      name: 'Intro: Kedro',
      start: 242,
      end: 523,
      outcome: 'know what Kedro is',
    },
    {
      name: 'Intro: kedro-viz',
      start: 523,
      end: 558,
      outcome: 'know what kedro-viz is',
    },
    {
      name: 'Intro: MLFlow',
      start: 558,
      end: 871,
      outcome: 'know what MLFlow is',
    },
    {
      name: 'installing Kedro and prereqs',
      start: 871,
      end: 939,
      outcome: 'have pandas/conda and kedro installed',
    },
    {
      name: 'create a virtual environment',
      start: 939,
      end: 1038,
      outcome: 'have an activated virtual environment for playing with kedro (`kedro info` produces something)',
    },
    {
      name: 'create a kedro project',
      start: 1038,
      end: 1175,
      outcome: 'create a new kedro project',
    },
  ]
export default {
  platform: 'YouTube',
  uid: 'ZPxuohy5SoU',
  prereqs: [
    'I know Python to some extent.',
    'I know data science and ETL to some extent.',
  ],
  outcomes: [
    'I know how to use Kedro in a basic way.',
  ],
  modules: add_indices(_modules)
};
