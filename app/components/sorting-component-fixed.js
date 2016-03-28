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

    this._sessionId = 0;
  },

  newSession() {
    this._sessionId++;
    return this._sessionId;
  },

  isCurrentSession(id) {
    return this._sessionId === id;
  },

  actions: {
    open(e) {
      e.preventDefault();
      this.set('isLoading', true);

      const session = this.newSession();

      getOpen().then(open => {
        if (!this.isCurrentSession(session)) { return; }

        this.set('model', open)
      }).finally(() => {
        if (!this.isCurrentSession(session)) { return; }

        this.set('isLoading', false)
      })
    },

    close(e) {
      e.preventDefault();
      this.set('isLoading', true);

      const session = this.newSession();

      getClosed().then(closed => {
        if (!this.isCurrentSession(session)) { return; }

        this.set('model', closed)
      }).finally(() => {
        if (!this.isCurrentSession(session)) { return; }

        this.set('isLoading', false)
      })
    }
  }
});
