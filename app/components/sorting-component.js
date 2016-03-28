import Ember from 'ember';
import RSVP from 'rsvp';

const PULLS = [
 { number: 1, status: 'closed' },
 { number: 2, status: 'open'   },
 { number: 3, status: 'closed' },
];

const CLOSED = PULLS.filterBy('status', 'closed');
const OPEN = PULLS.filterBy('status', 'open');

function getClosed() {
  return new RSVP.Promise(resolve => resolve(CLOSED));
}

function getOpen() {
  return new RSVP.Promise(resolve => {
    Ember.run.later(() => resolve(OPEN), 1000);
  });
}

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('model', PULLS);
    this.set('isLoading', false);
  },

  actions: {
    open(e) {
      e.preventDefault();
      this.set('isLoading', true);

      getOpen().then(open => {
        this.set('model', open)
      }).finally(() => this.set('isLoading', false))
    },

    close(e) {
      e.preventDefault();
      this.set('isLoading', true);

      getClosed().then(closed => {
        this.set('model', closed)
      }).finally(() => this.set('isLoading', false))
    }
  }
});
