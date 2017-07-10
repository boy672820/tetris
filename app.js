( function ( vertical_size, horizontal_size ) {

	'use strict';

	/** Create map */
	var createdMap = ( function () {

		var appContainer = document.getElementById( 'app-container' );

		var map = document.createElement( 'table' ),
			map_inner = '';

		for ( var i = 0; i < horizontal_size; i += 1 ) {
			map_inner += '<tr class="js-map-row">';
			for ( var j = 0; j < vertical_size; j += 1 ) {
				map_inner += '<td class="map__td js-map-item"></td>';
			}
			map_inner += '</tr>';
		}

		map.className = 'map';
		map.innerHTML = map_inner;

		appContainer.appendChild( map );

		return map;

	} )();


	/** Set the data of tetrominoes */
	var tetromino = {
		i: {
			color: 'aqua',
			data: [
				[ 4 ],
				[ 4 ],
				[ 4 ],
				[ 4 ]
			]
		},
		o: {
			color: 'yellow',
			data: [
				[ 4, 5 ],
				[ 4, 5 ]
			]
		},
		z: {
			color: 'red',
			data: [
				[ 4    ],
				[ 4, 5 ],
				[    5 ]
			]
		},
		s: {
			color: 'green',
			data: [
				[    5 ],
				[ 4, 5 ],
				[ 4    ]
			]
		},
		j: {
			color: 'blue',
			data: [
				[ 3       ],
				[ 3, 4, 5 ]
			]
		},
		l: {
			color: 'orange',
			data: [
				[       5 ],
				[ 3, 4, 5 ]
			]
		},
		t: {
			color: 'pink',
			data: [
				[ 3, 4, 5 ],
				[    4    ]
			]
		}
	};


	// Random tetromino selection
	var tetrominoKeys = Object.keys( tetromino );

	var random = Math.floor( Math.random() * Number( tetrominoKeys.length ) ),
		random_key = tetrominoKeys[ random ],
		randomTetromino = tetromino[ random_key ];


	// Activated cell initialization
	var deactivatingCell = function () {
		var actives = createdMap.getElementsByClassName( 'map__td--active' );

		[].forEach.call( actives, function ( active ) {
			active.className = 'map__td';
		} );
	};

	/** Set tetromino to map */
	var row_i = 0;
	var setTetrominoOnMap = function () {
		deactivatingCell();

		var rows = createdMap.getElementsByClassName( 'js-map-row' );

		randomTetromino.data.forEach( function ( v, i ) {
			var row_num = row_i + i;
			if ( row_num >= horizontal_size ) {
				row_i = 0;
				return;
			}

			var row = rows[ row_num ];

			v.forEach( function ( v ) {
				var item = row.getElementsByClassName( 'js-map-item' )[ v ];
				item.className += ' map__td--active map__td--' + randomTetromino.color;
			} );
		} );

		row_i += 1;
	};


	var timer = setInterval( function () {
		setTetrominoOnMap();
	}, 500 );

} )( 10, 20 );
