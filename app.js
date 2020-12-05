document.addEventListener('DOMContentLoaded', () => {
    // const lTetromino = 'firstShape';
    // const zTetromino = 'secondShape';
    // const oTetromino = 'thirdShape';
    // const iTetromino = 'fourthShape';
    // const tTetromino = 'fifthShape';

    // const tetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino];

    // console.log(tetrominoes);

    const grid = document.querySelector('.grid');
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const showDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startButton')

    const width = 10;

    // console.log(squares);

    //Create Tetrominoes Layout with array

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 2, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2]
        [width, width + 2, width * 2, width * 2 + 1]

    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const tTeromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTeromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTeromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTertominoes = [lTetromino, zTetromino, tTeromino, oTeromino, iTeromino];

    let random = Math.floor(Math.random() * theTertominoes.length)

    let currentPosition = 4;
    let currentRotation = 0;
    let current = theTertominoes[random][currentRotation];


    //create draw funciton with random value
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }


    //create undraw function

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make the teremoni move down interactively

    timerId = setInterval(moveDown, 1000);

    //left arrow key to move icon

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }

    }

    document.addEventListener('keyup', control);



    function moveDown() {
        undraw();
        currentPosition += width;
        draw()
        freeze()
    }

    //create freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))


            random = Math.floor(Math.random() * theTertominoes.length);
            current = theTertominoes[random][currentRotation]
            currentPosition = 4;
            draw()

        }
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) {
            currentPosition -= 1
        }
        if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            currentPosition += 1
        }

        draw()
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === (width - 1));

        if (!isAtRightEdge) {
            currentPosition += 1

        }
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw()
    }

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }

        current = theTertominoes[random][currentRotation];
        draw();
    }

})