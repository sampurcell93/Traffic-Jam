<!Doctype HTML>
        <html lang="en">
                <head>
                        <meta charset="utf-8">
                        <link href="stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
                        <link href="stylesheets/print.css" media="print" rel="stylesheet" type="text/css" />
                        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
                        <script type="text/javascript" src="tjam.min.js"></script>
                        <title>Traffic Jam by Sam Purcell</title>
                        <!--[if IE]>
                        <link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
                        <![endif]-->
                </head>

                <body>
                        <div class="wrapper">

                                <h1>Traffic Jam</h1>

                                <ul class='source'>
                                        <li><a href="sass/screen.scss" title="view sass styling" target="_blank">Sass</a></li>
                                        <li><a href="tjam.js" title="view JS" target="_blank">Js</a></li>
                                </ul>

                                <p>
                                        I was curious to see how the implementation of assignment five would change 
                                        when written in javascript instead of C++.
                                        I didn't use the canvas tag, but I implemented the homework in javascript's 
                                        object oriented style, using jQuery for DOM manipulation.

                                </p>

                        
                                <h2 class='options'>About</h2>

                                <p class='options'> Try some pre made game boards. </p>

                                <ul class='preMade'>
                                        <li data-board='1'>Board 1</li>
                                        <li data-board='2'>Board 2</li>
                                        <li data-board='3'>Board 3</li>
                                        <li data-board='4'>Board 4</li>
                                </ul>

                                <p class='options'> OR: Enter a value for the horizontal position of the first car, where 0 is the bottom left corner of the board.
                                        Enter a value for the vertical position.
                                        Enter the car's orientation, either h or v.
                                        Enter a length, either 2 or 3.
                                </p>

                                <div class='wrapInputs'>
                                        <input type='text' class='carData' placeholder='X' id='horizontalPos'/>
                                        <input type='text' class='carData' placeholder='Y' id='verticalPos'/>
                                        <input type='text' class='carData' placeholder='O' id='orientation'/>
                                        <input type='text' class='carData' placeholder='L' id='length'/>
                                        <span class='addCar btn'>Add Car</span>
                                        <span class='finish btn orange-btn'>Finish</span>
                                </div>

                                <div class="board" id="game">
                                       <!-- <div class='car horizontal l2'></div>
                                        <div class='car vertical l3'></div>
                                        <div class='car horizontal l3'></div>-->

                                        <div class="middleBorder"></div>
                                </div>

                                <hr />

                                <p style='text-align: center'>
                                        Implementation copyright Sam Purcell 20<?php echo Date("y"); ?>
                                </p>

                        </div>
                </body>
        </html>                                                            
