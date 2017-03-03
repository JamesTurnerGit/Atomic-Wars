'use babel';
'use strict';

module.exports = {
  config: {
    userName: {
      type: 'string',
      title: 'CodeWars User Name',
      order: 1,
      "default": ''
    },
    CodeWarsAPIkey: {
      type: 'string',
      title: 'Codewars Api-key',
      order: 2,
      "default": ''
    },
    CodeWarsLanguage: {
      type: 'string',
      title: 'Default language',
      order: 3,
      "default": 'ruby',
      enum: [
        {value: "c", description: "c"},
        {value: "clojure" ,description: "clojure"},
        {value: "coffeescript", description: "coffeescript"},
        {value: "cpp", description: "cpp"},
        {value: "crystal", description: "crystal"},
        {value: "csharp", description: "csharp"},
        {value: "dart:", description:"dart"},
        {value: "elixir", description: "elixir"},
        {value: "fsharp", description: "fsharp"},
        {value: "go", description: "go"},
        {value: "haskell", description: "haskell"},
        {value: "java", description: "java"},
        {value: "javascript", description: "javascript"},
        {value: "objc", description: "objc"},
        {value: "ocaml", description: "ocaml"},
        {value: "php", description: "php"},
        {value: "python", description: "python"},
        {value: "ruby", description: "ruby"},
        {value: "rust", description: "rust"},
        {value: "shell", description: "shell"},
        {value: "sql", description: "sql"},
        {value: "swift", description: "swift"},
        {value: "typescript", description: "typescript"}
      ]
    },
    // TODO api doesn't actually work with this option currently
    CodeWarsStrategy: {
      type: 'string',
      order: 4,
      "default": 'default',
      enum: [
        {value: "default", description: "Default: Also referred to as the 'Rank Up' workout. Will select a challenge that is above your current level."},
        {value: "random", description: "Random: Randomly selected code challenges"},
        {value: "reference_workout", description: "Reference workout: Will select code challenges that are tagged as reference."},
        {value: "beta_workout", description: "Beta workout: Will select beta code challenges."},
        {value: "retrain_workout", description: "Retrain workout: Will focus on code challenges that you have already completed."},
        {value: "algorithm_retest", description: "Algorithm retest: Will focus on algorithm code challenges that you have already completed."},
        {value: "kyu_8_workout", description: "8 kyu workout: Will focus on 8 kyu code challenges."},
        {value: "kyu_7_workout", description: "7 kyu workout: Will focus on 7 kyu code challenges."},
        {value: "kyu_6_workout", description: "6 kyu workout: Will focus on 6 kyu code challenges."},
        {value: "kyu_5_workout", description: "5 kyu workout: Will focus on 5 kyu code challenges."},
        {value: "kyu_4_workout", description: "4 kyu workout: Will focus on 4 kyu code challenges."},
        {value: "kyu_3_workout", description: "3 kyu workout: Will focus on 3 kyu code challenges."},
        {value: "kyu_2_workout", description: "2 kyu workout: Will focus on 2 kyu code challenges."},
        {value: "kyu_1_workout", description: "1 kyu workout: Will focus on 1 kyu code challenges."}
      ]
    },
    LocalGitPath:{
      type: 'string',
      title: 'Local Repo Location',
      order: 5,
      "default": atom.project.getPaths()[0]
    },
    gitSync: {
      type: 'boolean',
      title: 'Commit and push to Github on save',
      order: 6,
      "default": true
    },
    RemoteRepoUrl: {
      type: 'string',
      title: 'Remote Repo Url',
      order: 7,
      "default": 'https://github.com/username/codewars.git'
    }
  }
}
