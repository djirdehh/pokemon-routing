import Vue from 'vue';

const EventBus = new Vue();

window.addEventListener('popstate', () => {
  EventBus.$emit('navigate');
});

const CharizardCard = {
  name: 'charizard-card',
  template: `
    <div class="card card--charizard has-text-weight-bold has-text-white">
      <div class="card-image">
        <div class="card-image-container">
          <img src="../../static/charizard.png"/>
        </div>
      </div>
      <div class="card-content has-text-centered">
        <div class="main">
          <div class="title has-text-white">Charizard</div>
          <div class="hp">hp 78</div>
        </div>
        <div class="stats columns is-mobile">
          <div class="column">🔥<br>
            <span class="tag is-warning">Type</span>
          </div>
          <div class="column center-column">199 lbs<br>
            <span class="tag is-warning">Weight</span>
          </div>
          <div class="column">1.7 m <br>
            <span class="tag is-warning">Height</span>
          </div>
        </div>
      </div>
    </div>
  `
};

const BlastoiseCard = {
  name: 'blastoise-card',
  template: `
    <div class="card card--blastoise has-text-weight-bold has-text-white">
      <div class="card-image">
        <div class="card-image-container">
          <img src="../../static/blastoise.png"/>
        </div>
      </div>
      <div class="card-content has-text-centered">
        <div class="main">
          <div class="title has-text-white">Blastoise</div>
          <div class="hp">hp 79</div>
        </div>
        <div class="stats columns is-mobile">
          <div class="column">💧<br>
            <span class="tag is-light">Type</span>
          </div>
          <div class="column center-column">223 lbs<br>
            <span class="tag is-light">Weight</span>
          </div>
          <div class="column">1.6 m<br>
            <span class="tag is-light">Height</span>
          </div>
        </div>
      </div>
    </div>
  `
};

const VenusaurCard = {
  name: 'venusaur-card',
  template: `
    <div class="card card--venusaur has-text-weight-bold has-text-white">
      <div class="card-image">
        <div class="card-image-container">
          <img src="../../static/venusaur.png"/>
        </div>
      </div>
      <div class="card-content has-text-centered">
        <div class="main">
          <div class="title has-text-white">Venusaur</div>
          <div class="hp hp-venusaur">hp 80</div>
        </div>
        <div class="stats columns is-mobile">
          <div class="column">🍃<br>
            <span class="tag is-danger">Type</span>
          </div>
          <div class="column center-column">220 lbs<br>
            <span class="tag is-danger">Weight</span>
          </div>
          <div class="column">2.0 m<br>
            <span class="tag is-danger">Height</span>
          </div>
        </div>
      </div>
    </div>
  `
};

const routes = [
  {path: '/', component: CharizardCard},
  {path: '/charizard', component: CharizardCard},
  {path: '/blastoise', component: BlastoiseCard},
  {path: '/venusaur', component: VenusaurCard}
];

const View = {
  name: 'router-view',
  template: `<component :is="currentView"></component>`,
  data() {
    return {
      currentView: {}
    }
  },
  created() {
    if (this.getRouteObject() === undefined) {
      this.currentView = {
        template: `
          <h3 class="subtitle has-text-white">
            Not Found :(. Pick a Pokémon from the list below!
          </h3>
        `
      };
    } else {
      this.currentView = this.getRouteObject().component;
    }

    // Event listener for link navigation
    EventBus.$on('navigate', (event) => {
      this.currentView = this.getRouteObject().component;
    });
  },
  methods: {
    getRouteObject() {
      return routes.find(
        route => route.path === window.location.pathname
      );
    }
  }
};

const Link = {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  template: `<a @click="navigate" :href="to">{{ to }}</a>`,
  methods: {
    navigate(evt) {
      evt.preventDefault();
      window.history.pushState(null, null, this.to);
      EventBus.$emit('navigate');
    }
  }
};

const App = {
  name: 'App',
  template: `
    <div class="container">
      <div class="pokemon">
        <router-view></router-view>

        <div class="pokemon-links has-text-centered">
          <router-link to="/charizard"></router-link>
          <router-link to="/blastoise"></router-link>
          <router-link to="/venusaur"></router-link>
        </div>
      </div>
    </div>
  `,
  components: {
    'router-view': View,
    'router-link': Link
  }
};

export default App;
