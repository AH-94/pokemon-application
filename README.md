# pokemon-application
An app that allows you to search and like your favourite Pokemon


Getting started:

The app is hosted on Vercel, via this Github repository. To access the application simply visit: https://pokemon-application.vercel.app/

To open this project locally simply clone the repository to your local file system using the Github URL for the project. If you are using VS code you can do this directly from the terminal available within the software.


Project Overview:

This App allows a user to search Pokemon from the Pokeapi API using an asynchronous fetch request. The fetch function pulls the data from the API and constructs a "card" object for each pokemon, which isthen pushed to an array and loaded to the DOM.

I did not use any frameworks for this task, only basic HTML, CSS and Javascript.

There were many challenges throughout the process of building this application. For example, I wish I could have used local storage more effectively, however I just couldn't figure out how to get it to work alongside the fetch request which was constantly pushing new data to local storage. In the end I used Local storage to store the array which contained the updated cards that had been "liked", just so I could at least show my understanding of the tool.

Another challenge for me was comparing two cards, I knew i wanted a popup modal which enabled the user to view a chosen card, but having a system that enabled a user to select two cards and compare them went beyond my current JS knowledge. If I had more time this is a feature I would have liked to implement. Due to the restricted tiemframe I implemented a simple popup modal instead.

Given more time, I might have added a carousel for the cards instead of a grid layout. I have used Owl Carousel in the past and would have liked to utilise again for this project. However due to time constraints I opted for a more simple, but still effective layout.



