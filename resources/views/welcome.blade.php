<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ URL::to('/css/src/style.css') }}">

        <!-- Scripts -->
        <style>
            html, body {
                color: #636b6f;
                height: 100vh;
                margin: 0;
                font-size: 100%;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }

            #home_container {
                position: relative;
                width: 100%;
                height: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #home_overlay--video {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: -1;
                overflow: hidden;
                pointer-events: none;
            }

            #home_overlay--video video {
                position: absolute;
                min-width: 100%;
                min-height: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            #home_overlay--filter {
                position: absolute;
                pointer-events: none;
                z-index: -1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.4);
            }

            #home_overlay--video.wide video {
                width: 100%;
            }

            #home_overlay--video.box video {
                height: 100%;
            }

            #main-content_heading {
                margin: 0;
                color: #fff;
                font-size: 2.5rem;
                font-weight: 400;
            }

            #main-content_start {
                display: flex;
            }

            #main-content_start--left {
                width: 50%;
            }
        </style>
    </head>
    <body>
        <main>
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif

            <section id="bd_wrapper">
                <div id="bd_container">
                    <div id="bd_overlay--video">
                        <video autoplay loop muted>
                            <source src="{{ url('/storage/media/video/rainy_cars.webm') }}" type="video/webm">
                            <source src="{{ url('/storage/media/video/rainy_cars.mp4') }}" type="video/mp4">
                        </video>
                    </div>
                    <div id="bd_overlay--filter"></div>

                    <h1 id="primary_heading"></h1>
                    <div class="primary_init"></div>
                </div>
            </section>

        </main>

        <script src="{{ URL::to('/js/bin/footer.rcw.js') }}"></script>

        <script>
            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            };

            let overlayVideo = document.getElementById('bd_overlay--video');

            window.aspectRatio = {
                aspect: '',

                determineAspect() {
                    let aspect = (window.innerWidth / window.innerHeight > 16/9) ? 'wide' : 'box';

                    if (aspect !== window.aspectRatio.aspect) {
                        window.aspectRatio.aspect = aspect;
                        window.dispatchEvent(new CustomEvent('aspectchange', { detail: aspect }))
                    }
                }
            }

            window.addEventListener('resize', debounce(window.aspectRatio.determineAspect, 100));
            window.addEventListener('aspectchange', function(e){
                let add = e.detail;
                let remove = (e.detail === 'wide') ? 'box' : 'wide';
                overlayVideo.classList.remove(remove);
                overlayVideo.classList.add(add);
            });

            window.aspectRatio.determineAspect();

            let header_type = new rcwTyper('Rain City Web', {parent: '#primary_heading'}, function(e){
                console.log(e.detail)
            });

            header_type.startTyping();
        </script>
    </body>
</html>
