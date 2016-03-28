import Ember from 'ember';

const PULLS = [
 { number: 1, status: 'closed' },
 { number: 2, status: 'open'   },
 { number: 3, status: 'closed' },
];

function closed() {
  return new Ember.RSVP.Promise(resolve => resolve(PULLS.filterBy('status', 'closed')));
}

function open() {
  return new Ember.RSVP.Promise(resolve => Ember.run.later(() => resolve(PULLS.filterBy('status', 'open')),1000));
}

export default Ember.Route.extend({
  queryParams: {
    status: {
      refreshModel: true
    }
  },

  model(params) {
    if (params.status === 'closed') return closed();
    return open();
  }
});
