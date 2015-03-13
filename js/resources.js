game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
//        loads in my tiles
        {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
        {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
//        this adds the player entity
        {name: "player", type: "image", src: "data/img/orcSpear.png"},
//        this adds the tower entity
        {name: "tower", type: "image", src: "data/img/tower_round.svg.png"},
//        adds the creep
        {name: "creep1", type: "image", src: "data/img/brainmonster.png"},
        {name: "title-screen", type: "image", src: "data/img/title.png"},
        {name: "exp-screen", type: "image", src: "data/img/loadpic.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
//        loads in the level
        {name: "level01", type: "tmx", src: "data/map/test3.tmx"},
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
